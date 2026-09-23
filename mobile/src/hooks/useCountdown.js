import { useState, useEffect } from 'react';

/**
 * Live Countdown Hook
 * Computes remaining time from ISO deadline timestamp and ticks every second.
 */
export function useCountdown(targetDate) {
  const calculateTimeLeft = () => {
    if (!targetDate) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        formatted: '00d : 00h : 00m : 00s',
        isExpired: true,
      };
    }

    const difference = new Date(targetDate).getTime() - Date.now();

    if (difference <= 0) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        formatted: '00d : 00h : 00m : 00s',
        isExpired: true,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    const pad = (n) => String(n).padStart(2, '0');

    const formatted = `${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;

    return {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
      formatted,
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
