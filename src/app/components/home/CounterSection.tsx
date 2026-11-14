
"use client";

import { useEffect, useState } from "react";
import { api, type HomeStat } from "@/lib/api";
import { COUNTERS } from "@/app/data/site";
import Odometer from "./Odometer";

const DELAYS = [100, 180, 260, 340];

const COUNTER_ICONS: Record<string, string> = {
  "Years Experience": "fa-solid fa-calendar-check",
  "Products Supplied": "fa-solid fa-boxes-stacked",
  "Satisfied Clients": "fa-solid fa-users",
  "Trusted Brands": "fa-solid fa-handshake",
};

export default function CounterSection() {
  const [counters, setCounters] = useState<HomeStat[]>([]);

  useEffect(() => {
    let active = true;

    const fetchCounters = async () => {
      try {
        const response = await api.home();

        if (active) {
          setCounters(
            Array.isArray(response.data?.stats)
              ? response.data.stats
              : []
          );
        }
      } catch (error) {
        console.error("Error fetching counters:", error);
      }
    };

    fetchCounters();

    return () => {
      active = false;
    };
  }, []);

  if (counters.length === 0) return null;

  return (
    <section
      className="ss-counter-section"
      data-aos="fade-up"
      data-aos-duration="900"
    >
      {/* BACKGROUND IMAGE */}
      <div className="ss-counter-bg"></div>{" "}

      {/* OVERLAY */}
      <div className="ss-counter-overlay"></div>{" "}

      {/* DECORATIVE RED LIGHT */}
      <div className="ss-counter-energy"></div>{" "}

      <div className="ss-counter-container">
        {/* LEFT INTRO */}
        <div
          className="ss-counter-intro"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <span className="ss-counter-kicker">
            <i className="fa-solid fa-chart-line"></i>{" "}
            Built Through Experience
          </span>{" "}

          <h2>
            Numbers That <span>Define Us.</span>
          </h2>
        </div>

        {/* COUNTERS */}
        <div className="ss-counter-grid">
          {counters.map((counter, index) => (
            <div
              className="ss-counter-item"
              data-aos="fade-up"
              data-aos-delay={DELAYS[index] ?? 100}
              key={counter.label}
            >
              <div className="ss-counter-icon">
                <i
                  className={
                    COUNTER_ICONS[counter.label] ||
                    COUNTERS.find(
                      (item) => item.label === counter.label
                    )?.icon ||
                    "fa-solid fa-chart-line"
                  }
                ></i>
              </div>{" "}

              <div className="ss-counter-info">
                <Odometer value={Number(counter.value) || 0} />{" "}

                {counter.suffix && (
                  <span className="ss-counter-plus">
                    {counter.suffix}
                  </span>
                )}{" "}

                <span className="ss-counter-label">
                  {counter.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
