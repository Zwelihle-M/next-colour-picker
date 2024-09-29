"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Navigationbar from "@/components/navigationbar";
import Hero from "@/components/hero";
import ParallaxSection from "@/components/parallax-section";
import UserGuide from "@/components/guide";
import Canvas from "@/components/canvas";


export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return (
    <div>
      <Navigationbar />
      <main>

        <Hero />
        <ParallaxSection/>
        <UserGuide/>
        <Canvas/>
      </main>
    </div>
  );
}
