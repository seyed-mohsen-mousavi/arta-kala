"use client"
import dynamic from "next/dynamic";

const FlipClock = dynamic(() => import("./CountdownTimer"), {
  ssr: false,
});

export default FlipClock;
