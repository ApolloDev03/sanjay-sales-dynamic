"use client";

import { useEffect, useRef } from "react";

/* height (px) of one digit row — must match .ss-odometer-digit span in CSS */
const DIGIT_HEIGHT = 49;
/* how many 0-9 rounds before the final digit (mechanical feel) */
const ROUNDS = 3;

interface OdometerProps {
  value: number;
}

export default function Odometer({ value }: OdometerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const formatted = value.toLocaleString("en-IN");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const animate = () => {
      if (element.dataset.animated === "true") return;
      element.dataset.animated = "true";

      const digits = element.querySelectorAll<HTMLSpanElement>(".ss-odometer-digit-inner");

      digits.forEach((digit, index) => {
        const finalPosition = (digit.children.length - 1) * DIGIT_HEIGHT;
        /* each digit slightly different duration = rolling effect */
        const duration = 1500 + index * 180;

        digit.style.transition = `transform ${duration}ms cubic-bezier(.16,.84,.30,1)`;

        timers.push(
          setTimeout(() => {
            digit.style.transform = `translateY(-${finalPosition}px)`;
          }, 120 + index * 90)
        );
      });
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className="ss-odometer" data-value={value} data-built="true">
      {formatted.split("").map((character, i) =>
        character === "," ? (
          <span className="ss-odometer-comma" key={i}>
            ,
          </span>
        ) : (
          <span className="ss-odometer-digit" key={i}>
            <span className="ss-odometer-digit-inner">
              {Array.from({ length: ROUNDS * 10 }, (_, n) => (
                <span key={n}>{n % 10}</span>
              ))}
              <span>{character}</span>
            </span>
          </span>
        )
      )}
    </div>
  );
}
