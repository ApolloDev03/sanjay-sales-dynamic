import Breadcrumb from "@/app/components/common/Breadcrumb";
import AboutSection from "@/app/components/home/AboutSection";
import Link from "next/link";
import { ROUTES } from "@/app/data/site";

import aboutBreadcrumb from "../../../public/assets/images/breadcrumb.webp";


export default function AboutPage() {
    return (
        <>

            {/* =====================================================
                BREADCRUMB
            ====================================================== */}

            <Breadcrumb
                title="About Us"
                image={aboutBreadcrumb.src}
                items={[
                    {
                        label: "About Us",
                    },
                ]}
            />


            {/* =====================================================
                EXISTING HOME ABOUT SECTION
            ====================================================== */}

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
                        <p data-aos="fade-up" data-aos-delay="240" data-aos-duration="800">
                            Our company is engaged in Distribution of Welding Related Products to the Industries as Steel Fabrication, Ship Yards, Penstock, Pipe Fabrication, Foundries, Refineries, Chemical, Steel Plants, and Power Plants etc. Our company offers a wide Range of Products to the above industries in Welding and cutting.
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
                        {/* <Link
                            href={ROUTES.about}
                            className="ss-about-btn"
                            data-aos="fade-up"
                            data-aos-delay="450"
                            data-aos-duration="700"
                        >
                            <span>Read More</span> <i className="bi bi-arrow-right"></i>
                        </Link> */}
                    </div>
                </div>
            </section>

            {/* =====================================================
                OUR JOURNEY
            ====================================================== */}
            <section className="ss-about-journey">

                <div className="ss-about-container">

                    {/* HEADING */}

                    <div
                        className="ss-about-journey-heading"
                        data-aos="fade-up"
                        data-aos-duration="700"
                    >

                        <span className="ss-about-kicker">

                            <span className="ss-about-kicker-line"></span>

                            OUR JOURNEY

                            <span className="ss-about-kicker-line"></span>

                        </span>


                        <h2>
                            Growing With Industry.
                            <span> Since 1981.</span>
                        </h2>


                        <p>
                            From a focused industrial trading business
                            to a trusted welding and cutting solution provider,
                            Sanjay Sales has continuously evolved with changing
                            technologies, customer needs and industry standards.
                        </p>

                    </div>


                    {/* TIMELINE */}

                    <div className="ss-about-journey-timeline">

                        <span className="ss-about-journey-main-line"></span>


                        {/* ITEM 1 */}

                        <div
                            className="ss-about-journey-step"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >

                            <div className="ss-about-journey-marker">

                                <span></span>

                            </div>


                            <div className="ss-about-journey-card">

                                <div className="ss-about-journey-card-top">

                                    <span className="ss-about-journey-year">
                                        1981
                                    </span>

                                </div>


                                <h3>
                                    The Beginning
                                </h3>


                                <span className="ss-about-journey-small-line"></span>


                                <p>
                                    Sanjay Sales began its journey with a
                                    commitment to supply reliable welding
                                    products and industrial solutions.
                                </p>

                            </div>

                        </div>


                        {/* ITEM 2 */}

                        <div
                            className="ss-about-journey-step"
                            data-aos="fade-up"
                            data-aos-delay="180"
                        >

                            <div className="ss-about-journey-marker">

                                <span></span>

                            </div>


                            <div className="ss-about-journey-card">

                                <div className="ss-about-journey-card-top">

                                    <span className="ss-about-journey-year">
                                        Growth
                                    </span>

                                </div>


                                <h3>
                                    Expanding Reach
                                </h3>


                                <span className="ss-about-journey-small-line"></span>


                                <p>
                                    With growing customer trust, the company
                                    expanded its distribution network and
                                    product range across Gujarat.
                                </p>

                            </div>

                        </div>


                        {/* ITEM 3 */}

                        <div
                            className="ss-about-journey-step"
                            data-aos="fade-up"
                            data-aos-delay="260"
                        >

                            <div className="ss-about-journey-marker">

                                <span></span>

                            </div>


                            <div className="ss-about-journey-card">

                                <div className="ss-about-journey-card-top">

                                    <span className="ss-about-journey-year">
                                        Today
                                    </span>

                                </div>

                                <h3>
                                    Industrial Solution Provider
                                </h3>


                                <span className="ss-about-journey-small-line"></span>


                                <p>
                                    Today, Sanjay Sales offers welding,
                                    cutting, consumables, accessories and
                                    modern industrial equipment backed by
                                    dependable service.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                VISION & MISSION
            ====================================================== */}
            <section className="ss-about-vision">

                <div className="ss-about-container">


                    {/* HEADING */}

                    <div
                        className="ss-about-vision-heading"
                        data-aos="fade-up"
                    >

                        <span className="ss-about-kicker">

                            <span className="ss-about-kicker-line"></span>

                            OUR VISION & MISSION

                            <span className="ss-about-kicker-line"></span>

                        </span>


                        <h2>
                            A Clear Vision.
                            <span> A Stronger Tomorrow.</span>
                        </h2>


                        <p>
                            Guided by a strong vision and customer-focused mission,
                            we continue to deliver reliable welding and cutting
                            solutions while building long-term partnerships.
                        </p>

                    </div>



                    {/* CARDS */}

                    <div className="ss-about-vision-grid">


                        {/* VISION */}

                        <div
                            className="ss-about-vision-card"
                            data-aos="fade-right"
                            data-aos-duration="800"
                        >

                            <span className="ss-about-vision-cut"></span>


                            <div className="ss-about-vision-icon">

                                <i className="fa-solid fa-eye"></i>

                            </div>


                            <div className="ss-about-vision-content">

                                <span className="ss-about-vision-label">
                                    OUR VISION
                                </span>


                                <h3>
                                    Building A Stronger
                                    <span> Industrial Future.</span>
                                </h3>


                                <span className="ss-about-vision-line"></span>


                                <p>
                                    To become a preferred industrial solution
                                    partner by delivering advanced, reliable
                                    and performance-driven welding and cutting
                                    technologies.
                                </p>

                            </div>


                            <span className="ss-about-vision-watermark">
                                VISION
                            </span>

                        </div>



                        {/* MISSION */}

                        <div
                            className="ss-about-vision-card"
                            data-aos="fade-left"
                            data-aos-duration="800"
                        >

                            <span className="ss-about-vision-cut"></span>


                            <div className="ss-about-vision-icon">

                                <i className="fa-solid fa-bullseye"></i>

                            </div>


                            <div className="ss-about-vision-content">

                                <span className="ss-about-vision-label">
                                    OUR MISSION
                                </span>


                                <h3>
                                    Reliable Products.
                                    <span> Lasting Partnerships.</span>
                                </h3>


                                <span className="ss-about-vision-line"></span>


                                <p>
                                    Our mission is to understand customer
                                    requirements, offer dependable products
                                    and maintain long-term relationships
                                    through service, trust and technical support.
                                </p>

                            </div>


                            <span className="ss-about-vision-watermark">
                                MISSION
                            </span>

                        </div>


                    </div>

                </div>

            </section>


            {/* =====================================================
    WHY SANJAY SALES
====================================================== */}

            <section className="ss-about-why">

                <div className="ss-about-container">

                    {/* =================================================
            HEADING
        ================================================== */}

                    <div
                        className="ss-about-why-heading"
                        data-aos="fade-up"
                        data-aos-duration="700"
                    >

                        <span className="ss-about-why-kicker">

                            <span className="ss-about-why-kicker-line"></span>

                            <i className="fa-solid fa-gears"></i>

                            WHY SANJAY SALES

                            <span className="ss-about-why-kicker-line"></span>

                        </span>


                        <h2>
                            Experience You Can Trust.
                            <span> Solutions That Perform.</span>
                        </h2>


                        <p>
                            Driven by experience, trusted products and a strong
                            distribution network, we deliver reliable welding
                            and cutting solutions for every industry.
                        </p>


                        <span className="ss-about-why-heading-line"></span>

                    </div>


                    {/* =================================================
            BENEFIT FLOW
        ================================================== */}

                    <div className="ss-about-why-flow">

                        <div className="ss-about-why-wave" aria-hidden="true">

                            <svg
                                viewBox="0 0 1200 170"
                                preserveAspectRatio="none"
                            >

                                {/* SOFT GLOW LINE */}

                                <path
                                    className="ss-about-why-wave-glow"
                                    d="
                M 0 76
                C 105 20, 205 20, 300 75
                C 405 135, 505 135, 600 82
                C 700 28, 805 28, 900 72
                C 1000 118, 1100 118, 1200 68
            "
                                />


                                {/* MAIN RED WAVE */}

                                <path
                                    className="ss-about-why-wave-main"
                                    d="
                M 0 76
                C 105 20, 205 20, 300 75
                C 405 135, 505 135, 600 82
                C 700 28, 805 28, 900 72
                C 1000 118, 1100 118, 1200 68
            "
                                />


                                {/* DOTTED SECONDARY WAVE */}

                                <path
                                    className="ss-about-why-wave-dotted"
                                    d="
                M 0 88
                C 110 40, 210 42, 305 87
                C 405 135, 505 139, 602 94
                C 705 45, 810 45, 905 84
                C 1005 126, 1105 127, 1200 82
            "
                                />

                            </svg>

                        </div>


                        {/* ITEM 1 */}

                        <div
                            className="ss-about-why-point"
                            data-aos="fade-up"
                            data-aos-delay="80"
                        >

                            <div className="ss-about-why-icon">

                                <i className="fa-solid fa-industry"></i>

                            </div>


                            <span className="ss-about-why-drop-line"></span>


                            <h3>
                                Industry Experience
                            </h3>


                            <span className="ss-about-why-small-line"></span>


                            <p>
                                More than four decades of experience
                                in welding, cutting and industrial
                                product distribution.
                            </p>

                        </div>


                        {/* ITEM 2 */}

                        <div
                            className="ss-about-why-point"
                            data-aos="fade-up"
                            data-aos-delay="150"
                        >

                            <div className="ss-about-why-icon">

                                <i className="fa-solid fa-shield-halved"></i>

                            </div>


                            <span className="ss-about-why-drop-line"></span>


                            <h3>
                                Trusted Products
                            </h3>


                            <span className="ss-about-why-small-line"></span>


                            <p>
                                Quality-focused products sourced from
                                reliable manufacturers and technology
                                partners.
                            </p>

                        </div>


                        {/* ITEM 3 */}

                        <div
                            className="ss-about-why-point"
                            data-aos="fade-up"
                            data-aos-delay="220"
                        >

                            <div className="ss-about-why-icon">

                                <i className="fa-solid fa-share-nodes"></i>

                            </div>


                            <span className="ss-about-why-drop-line"></span>


                            <h3>
                                Strong Distribution
                            </h3>


                            <span className="ss-about-why-small-line"></span>


                            <p>
                                Established presence and strong distribution
                                capabilities across Gujarat.
                            </p>

                        </div>


                        {/* ITEM 4 */}

                        <div
                            className="ss-about-why-point"
                            data-aos="fade-up"
                            data-aos-delay="290"
                        >

                            <div className="ss-about-why-icon">

                                <i className="fa-regular fa-user"></i>

                            </div>


                            <span className="ss-about-why-drop-line"></span>


                            <h3>
                                Customer Support
                            </h3>


                            <span className="ss-about-why-small-line"></span>


                            <p>
                                Practical guidance and dependable support
                                for industrial customers and applications.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


        </>
    );
}