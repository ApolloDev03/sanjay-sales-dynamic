"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_SLIDES } from "@/app/data/site";

const AUTO_SLIDE_DELAY = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Keep the original website hero content and images static.
  const slides = HERO_SLIDES;
  const total = slides.length;

  const startAutoSlide = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((index) => (index + 1) % total);
    }, AUTO_SLIDE_DELAY);
  }, [total]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoSlide]);

  const goTo = (index: number) => {
    setCurrent(index);
    startAutoSlide();
  };

  const next = () => goTo((current + 1) % total);
  const prev = () => goTo((current - 1 + total) % total);

  return (
    <section className="ss-hero">
      <div className="ss-hero-slider">
        {slides.map((slide, index) => {
          /* first slide uses <h1>, the rest <h2> (same as the HTML design) */
          const Heading = index === 0 ? "h1" : "h2";

          return (
            <div
              key={slide.image}
              className={index === current ? "ss-hero-slide active" : "ss-hero-slide"}
            >
              <img src={slide.image} alt={slide.alt} className="ss-hero-image" />{" "}
              <div className="ss-hero-overlay"></div>{" "}
              <div className="ss-hero-container">
                <div className="ss-hero-content">
                  <span className="ss-hero-kicker">
                    <i className={slide.kickerIcon}></i> {slide.kicker}
                  </span>{" "}
                  <Heading>
                    {slide.titleStart} <span>{slide.titleHighlight}</span> {slide.titleEnd}
                  </Heading>{" "}
                  <p>{slide.text}</p>{" "}
                  <Link href={slide.buttonHref} className="ss-hero-btn">
                    <span>{slide.buttonText}</span> <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* SLIDER CONTROLS */}
        <div className="ss-hero-controls">
          <button className="ss-hero-arrow ss-hero-prev" onClick={prev} aria-label="Previous slide">
            <i className="bi bi-arrow-left"></i>
          </button>{" "}
          <div className="ss-hero-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                className={index === current ? "ss-hero-dot active" : "ss-hero-dot"}
                data-slide={index}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>{" "}
          <button className="ss-hero-arrow ss-hero-next" onClick={next} aria-label="Next slide">
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
