'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Interactive halftone field (inspired by bymonolog.com's footer), drawn with one WebGL shader.
 * Soft blobs drift; hovering pulls a blob toward the cursor, pushes nearby dots aside and
 * morphs them from circles into squares. Dot colour follows the current mode (--fg).
 */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 uRes;      // canvas size, px
uniform float uTime;
uniform vec2 uMouse;    // px, origin bottom-left
uniform float uHover;   // 0..1
uniform vec3 uColor;
uniform float uCell;    // dot cell size, px
uniform float uDpr;

float blob(vec2 p, vec2 c, float k, float s){
  vec2 d = (p - c) * vec2(1.0, 1.9);           // stretched, like flowing ink
  return k / (dot(d, d) + s);
}

float value(vec2 px){
  float a = uRes.x / uRes.y;
  vec2 p = px / uRes.y;
  float t = uTime;
  float f = 0.0;
  float s = max(1.5, a * 0.5);                  // bigger shapes; wider canvases scale up
  f += blob(p, vec2(a * (0.20 + 0.10 * sin(t * 0.31)), 0.50 + 0.22 * sin(t * 0.23 + 1.0)), 0.095 * s, 0.030);
  f += blob(p, vec2(a * (0.55 + 0.16 * sin(t * 0.19 + 2.0)), 0.45 + 0.28 * cos(t * 0.27)), 0.120 * s, 0.040);
  f += blob(p, vec2(a * (0.88 + 0.08 * cos(t * 0.21 + 4.0)), 0.62 + 0.20 * sin(t * 0.33 + 3.0)), 0.060 * s, 0.020);
  vec2 m = uMouse / uRes.y;
  f += uHover * blob(p, m, 0.070, 0.012);       // cursor blob
  return smoothstep(0.7, 2.6, f);
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 id = floor(frag / uCell);
  vec2 ctr = (id + 0.5) * uCell;

  // Dots near the cursor get pushed outward…
  vec2 dm = ctr - uMouse;
  float md = length(dm);
  float near = uHover * exp(-(md * md) / (2.0 * pow(140.0 * uDpr, 2.0)));
  vec2 samplePx = ctr + (dm / max(md, 0.001)) * near * 46.0 * uDpr;

  float v = value(samplePx);
  float r = sqrt(clamp(v, 0.0, 1.0)) * uCell * 0.54;

  // …and turn from circles into squares.
  vec2 q = abs(frag - ctr);
  float d = mix(length(q), max(q.x, q.y), near);
  float alpha = 1.0 - smoothstep(r - uDpr, r, d);
  gl_FragColor = vec4(uColor * alpha, alpha);
}
`;

function cssColor(): [number, number, number] {
  const probe = document.createElement('span');
  probe.style.color = 'var(--fg)';
  document.body.appendChild(probe);
  const m = getComputedStyle(probe).color.match(/[\d.]+/g) ?? ['0', '0', '0'];
  probe.remove();
  return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255];
}

export function HalftoneField({ className, onHoverChange }: { className?: string; onHoverChange?: (hovering: boolean) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl) return; // no WebGL: the area simply stays empty

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u('uRes'), uTime = u('uTime'), uMouse = u('uMouse'), uHover = u('uHover'), uColor = u('uColor'), uCell = u('uCell'), uDpr = u('uDpr');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uCell, (w < 768 ? 7 : 9) * dpr);
      gl.uniform1f(uDpr, dpr);
    };
    const setColor = () => gl.uniform3fv(uColor, cssColor());
    resize(); setColor();

    // Pointer state, smoothed
    const target = { x: w * 0.5 * dpr, y: h * 0.5 * dpr, hover: 0 };
    const cur = { ...target };
    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) * dpr;
      target.y = (r.bottom - e.clientY) * dpr; // flip Y for GL
    };
    const enter = (e: PointerEvent) => { toLocal(e); target.hover = 1; onHoverChange?.(true); };
    const move = (e: PointerEvent) => { toLocal(e); target.hover = 1; };
    const leave = () => { target.hover = 0; onHoverChange?.(false); };
    canvas.addEventListener('pointerenter', enter);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerdown', move);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('pointercancel', leave);

    let raf = 0, visible = false, last = performance.now(), time = 0, frame = 0;
    const draw = (now: number) => {
      if (++frame % 20 === 0) setColor(); // follow colour changes (e.g. Brutalist section tones)
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      cur.hover += (target.hover - cur.hover) * 0.06;
      time += dt * (1 + cur.hover * 1.6); // stirs faster while hovered
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.uniform1f(uHover, cur.hover);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !prefersReducedMotion()) raf = requestAnimationFrame(draw);
    };
    const start = () => { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(draw); };

    // Only animate while on screen
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else cancelAnimationFrame(raf); });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { resize(); if (!visible) draw(performance.now()); });
    ro.observe(canvas);
    // Re-read the dot colour when the mode changes
    const mo = new MutationObserver(() => { setColor(); if (!visible) draw(performance.now()); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    draw(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect(); mo.disconnect();
      canvas.removeEventListener('pointerenter', enter);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerdown', move);
      canvas.removeEventListener('pointerleave', leave);
      canvas.removeEventListener('pointercancel', leave);
      // Note: don't force-lose the context here — React dev re-mounts reuse this canvas.
    };
  }, [onHoverChange]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
