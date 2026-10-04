'use client';

/**
 * Single place where GSAP plugins are registered.
 * Always import gsap / ScrollTrigger / SplitText / useGSAP from here.
 */
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  /** The page-transition curve (matches --ease-page in globals.css). */
  CustomEase.create('page', '0.625, 0.05, 0, 1');
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
