"use client";

import React, { useState, useEffect } from "react";
import "@/styles/flip.css";
import { Spinner } from "@heroui/react";

interface AnimatedCardProps {
  animation: string;
  digit: string | number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ animation, digit }) => {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

interface StaticCardProps {
  position: "upperCard" | "lowerCard";
  digit: string | number;
}

const StaticCard: React.FC<StaticCardProps> = ({ position, digit }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

interface FlipUnitContainerProps {
  digit: number;
  shuffle: boolean;
  unit: "hours" | "minutes" | "seconds";
}

const FlipUnitContainer: React.FC<FlipUnitContainerProps> = ({
  digit,
  shuffle,
  unit,
}) => {
  let currentDigit = digit;
  let previousDigit = digit - 1;

  if (unit !== "hours") {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  const formatDigit = (d: number) => (d < 10 ? `0${d}` : `${d}`);

  const digit1 = shuffle
    ? formatDigit(previousDigit)
    : formatDigit(currentDigit);
  const digit2 = !shuffle
    ? formatDigit(previousDigit)
    : formatDigit(currentDigit);

  const animation1 = shuffle ? "fold" : "unfold";
  const animation2 = !shuffle ? "fold" : "unfold";

  return (
    <div className={"flipUnitContainer"}>
      <StaticCard position={"upperCard"} digit={formatDigit(currentDigit)} />
      <StaticCard position={"lowerCard"} digit={formatDigit(previousDigit)} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const FlipClock: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [hoursShuffle, setHoursShuffle] = useState(true);
  const [minutesShuffle, setMinutesShuffle] = useState(true);
  const [secondsShuffle, setSecondsShuffle] = useState(true);

  useEffect(() => {
    const timerID = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();

      if (newTimeLeft.hours !== timeLeft.hours) {
        setHoursShuffle((prev) => !prev);
      }
      if (newTimeLeft.minutes !== timeLeft.minutes) {
        setMinutesShuffle((prev) => !prev);
      }
      if (newTimeLeft.seconds !== timeLeft.seconds) {
        setSecondsShuffle((prev) => !prev);
      }

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timerID);
  }, [timeLeft, targetDate]);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center size-full">
        <Spinner color="danger" size="lg" />
      </div>
    ); // یا یه لودر
  }

  return (
    <div className="space-y-3 flex flex-col items-center justify-center size-full">
      <div className="flex flex-col items-center gap-2">
        <div className={"flipClock"}>
          <FlipUnitContainer
            unit={"seconds"}
            digit={timeLeft.seconds}
            shuffle={secondsShuffle}
          />
          <FlipUnitContainer
            unit={"minutes"}
            digit={timeLeft.minutes}
            shuffle={minutesShuffle}
          />
          <FlipUnitContainer
            unit={"hours"}
            digit={timeLeft.hours}
            shuffle={hoursShuffle}
          />
        </div>
        <div className="w-full mx-auto bg-red-600 text-white flex items-center justify-between px-2">
          <span>ثانیه</span>
          <span className="pr-2">دقیقه</span>
          <span>ساعت</span>
        </div>
      </div>
    </div>
  );
};

export default FlipClock;
