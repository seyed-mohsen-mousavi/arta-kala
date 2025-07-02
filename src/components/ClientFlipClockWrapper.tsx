"use client";

import dynamic from "next/dynamic";

const FlipClock = dynamic(() => import("@/components/CountdownTimer"), {
  ssr: false,
});

export default FlipClock;
