"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { BootLoader } from "@/components/BootLoader";
import { Nav } from "@/components/Nav";
import { ScrollAssist } from "@/components/ScrollAssist";
import { Hero } from "@/components/sections/Hero";
import { Log } from "@/components/sections/Log";
import { Trajectory } from "@/components/sections/Trajectory";
import { Missions } from "@/components/sections/Missions";
import { Reserve } from "@/components/sections/Reserve";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <BootLoader />
      <SmoothScroll>
        <div className="grain" aria-hidden />
        <Nav />
        <ScrollAssist />
        <main id="main" tabIndex={-1}>
          <Hero />
          <Log />
          <Trajectory />
          <Missions />
          <Reserve />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
