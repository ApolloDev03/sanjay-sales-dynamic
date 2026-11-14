"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";

export default function CategorySlider() {
  const {data: apiCategories} = useApi(() => api.categories(), []);
  const categories = (apiCategories || []).map(c => ({title:c.name,image:c.image_url || "",href:`/products?category=${encodeURIComponent(c.slug)}`}));
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!swiperRef.current || categories.length === 0) return;

    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 750,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: nextRef.current,
        prevEl: prevRef.current,
      },
      pagination: {
        el: paginationRef.current,
        clickable: true,
      },
      breakpoints: {
        650: { slidesPerView: 2, spaceBetween: 16 },
        992: { slidesPerView: 3, spaceBetween: 18 },
        1200: { slidesPerView: 4, spaceBetween: 20 },
      },
    });

    return () => swiper.destroy(true, true);
  }, [categories.length]);

  return (
    <section className="ss-category-section">
      <div className="ss-category-container">
        {/* SECTION HEADER */}
        <div className="ss-category-header" data-aos="fade-up" data-aos-duration="800">
          <span className="ss-section-kicker">
            <i className="fa-solid fa-boxes-stacked"></i> Our Products &amp; Brands
          </span>{" "}
          <h2>
            Industrial Solutions <span>For Every Job.</span>
          </h2>{" "}
          <p>
            Explore our complete range of welding, cutting, safety and industrial products built
            for professional applications. Reliable solutions, trusted brands and dependable
            performance for every workshop and industry.
          </p>
        </div>

        {/* SWIPER */}
        <div
          ref={swiperRef}
          className="swiper ss-category-swiper"
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="900"
        >
          <div className="swiper-wrapper">
            {categories.map((category, index) => (
              <div className="swiper-slide" key={category.title}>
                <a href={category.href} className="ss-category-card">
                  <div className="ss-category-number">{String(index + 1).padStart(2, "0")}</div>{" "}
                  <div className="ss-category-image">
                    {category.image && <img src={category.image} alt={category.title} onError={e => { e.currentTarget.style.display = "none"; }} />}
                  </div>{" "}
                  <div className="ss-category-content">
                    <h3>{category.title}</h3>{" "}
                    <span className="ss-category-arrow">
                      <i className="bi bi-arrow-up-right"></i>
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* BOTTOM CONTROLS */}
          <div className="ss-category-controls">
            <button ref={prevRef} className="ss-category-prev" aria-label="Previous category">
              <i className="bi bi-arrow-left"></i>
            </button>{" "}
            <div ref={paginationRef} className="ss-category-pagination"></div>{" "}
            <button ref={nextRef} className="ss-category-next" aria-label="Next category">
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
