"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import { CLIENT_LOGOS } from "@/app/data/site";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";

export default function ClientsSlider() {
  const {data: clients} = useApi(() => api.clients(), []);
  const logos = (clients || []).map(c => ({image:c.image_url,name:c.name}));
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!swiperRef.current || logos.length === 0) return;

    const swiper = new Swiper(swiperRef.current, {
      modules: [Autoplay],
      slidesPerView: 2,
      spaceBetween: 14,
      speed: 800,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 2200,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        550: { slidesPerView: 3, spaceBetween: 15 },
        768: { slidesPerView: 4, spaceBetween: 16 },
        1100: { slidesPerView: 5, spaceBetween: 18 },
        1350: { slidesPerView: 6, spaceBetween: 18 },
      },
    });

    return () => swiper.destroy(true, true);
  }, [logos.length]);

  return (
    <section className="ss-clients-section">
      <div className="ss-clients-container">
        {/* SECTION HEADER */}
        <div className="ss-clients-header" data-aos="fade-up" data-aos-duration="800">
          <span className="ss-clients-kicker">
            <i className="fa-solid fa-handshake"></i> Our Clients
          </span>{" "}
          <h2>
            Trusted By <span>Industry Leaders.</span>
          </h2>
        </div>

        {/* CLIENT LOGO SWIPER */}
        <div
          ref={swiperRef}
          className="swiper ss-clients-swiper"
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="900"
        >
          <div className="swiper-wrapper">
            {logos.map((logo, index) => (
              <div className="swiper-slide" key={`${logo.name}-${index}`}>
                <div className="ss-client-card">
                  <img src={logo.image} alt={logo.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
