import Link from "next/link";
import { ROUTES } from "@/app/data/site";

export default function AboutSection() {
  return (
    <section className="ss-about">
      <div className="ss-about-container">
        {/* =====================================================
            LEFT VISUAL
        ====================================================== */}
        <div className="ss-about-visual" data-aos="fade-right" data-aos-duration="1000">
          <div className="ss-about-image-wrap">
            {/* BACK DECORATIVE PANEL */}
            <div className="ss-about-back-panel"></div>{" "}
            {/* MAIN IMAGE */}
            <div className="ss-about-main-image">
              <img
                src="/assets/images/about-main.jpg"
                alt="Sanjay Sales Industrial Welding and Cutting Solutions"
              />{" "}
              <div className="ss-about-image-overlay"></div>
            </div>{" "}
            {/* SMALL SECONDARY IMAGE */}
            <div className="ss-about-small-image" data-aos="zoom-in" data-aos-delay="250">
              <img src="/assets/images/about-small.jpg" alt="Industrial Cutting Technology" />
            </div>{" "}
            {/* SINCE BADGE */}
            <div className="ss-about-since" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="700">
              <span className="since-small">SINCE</span> <strong>1981</strong>
            </div>{" "}
            {/* VERTICAL TEXT */}
            <div className="ss-about-vertical-text">
              <span>WELDING</span> <i></i> <span>CUTTING</span> <i></i> <span>INDUSTRIAL</span>
            </div>{" "}
            {/* TRUST CARD */}
            <div className="ss-about-float-card" data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
              <div className="ss-about-float-icon">
                <i className="fa-solid fa-industry"></i>
              </div>{" "}
              <div>
                <span>Trusted Industrial</span> <strong>Solution Provider</strong>
              </div>
            </div>{" "}
            {/* DECORATIVE CORNERS */}
            <span className="ss-about-corner corner-one"></span>{" "}
            <span className="ss-about-corner corner-two"></span>
          </div>
        </div>

        {/* =====================================================
            RIGHT CONTENT
        ====================================================== */}
        <div className="ss-about-content">
          <span className="ss-about-kicker" data-aos="fade-up" data-aos-duration="700">
            <i className="fa-solid fa-gears"></i> ABOUT SANJAY SALES
          </span>{" "}
          <h2 data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
            Built On Experience. <span>Driven By Trust.</span>
          </h2>{" "}
          <p data-aos="fade-up" data-aos-delay="180" data-aos-duration="800">
            SANJAY SALES is a leading solution provider for all types of welding and cutting
            related products. Established in 1981, Sanjay Sales has emerged as a trusted name in
            the distribution, export and import of superior quality welding consumables,
            IGBT-type inverter-based modern technology equipment, welding accessories and
            consumables.
          </p>{" "}
          <p data-aos="fade-up" data-aos-delay="240" data-aos-duration="800">
            Sanjay Sales is a rapidly growing company with a strong distribution network for
            top-quality welding equipment. We operate on the philosophy of client satisfaction and
            long-term partnership, offering reliable products and services while building a solid
            reputation across Gujarat.
          </p>{" "}
          {/* TRUST STRIP */}
          <div className="ss-about-points">
            <div className="ss-about-point" data-aos="fade-up" data-aos-delay="300" data-aos-duration="700">
              <span className="point-number">40+</span>{" "}
              <span className="point-text">Years of Industry Experience</span>
            </div>{" "}
            <div className="ss-about-point" data-aos="fade-up" data-aos-delay="380" data-aos-duration="700">
              <span className="point-number">Gujarat</span>{" "}
              <span className="point-text">Strong Distribution Presence</span>
            </div>
          </div>{" "}
          <Link
            href={ROUTES.about}
            className="ss-about-btn"
            data-aos="fade-up"
            data-aos-delay="450"
            data-aos-duration="700"
          >
            <span>Read More</span> <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
