"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";

import Link from "next/link";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import blogBreadcrumb from "../../../public/assets/images/breadcrumb.webp";


type BlogItem = {
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
    slug: string;
};


const blogs: BlogItem[] = [
    {
        id: 1,
        title: "The Future of Welding Technology in Modern Manufacturing",
        description:
            "Discover how advanced welding technologies are shaping the future of manufacturing and improving productivity across industries.",
        date: "28 Oct 2024",
        image: "/assets/images/gallery/gallery-1.webp",
        slug: "future-of-welding-technology",
    },
    {
        id: 2,
        title: "A Complete Guide to Precision Cutting for Industrial Applications",
        description:
            "Learn about different cutting methods, their applications and how they help achieve higher accuracy and efficiency in fabrication.",
        date: "22 Oct 2024",
        image: "/assets/images/gallery/gallery-2.webp",
        slug: "precision-cutting-industrial-applications",
    },
    {
        id: 3,
        title: "How to Improve Workshop Productivity and Workflow",
        description:
            "Explore practical tips and best practices to streamline your workshop operations and get the most out of your resources.",
        date: "15 Oct 2024",
        image: "/assets/images/gallery/gallery-5.webp",
        slug: "improve-workshop-productivity",
    },
    {
        id: 4,
        title: "Essential Safety Tips for Working with Industrial Tools",
        description:
            "Safety comes first. Here are important guidelines to ensure a safer and more efficient working environment in your workshop.",
        date: "08 Oct 2024",
        image: "/assets/images/gallery/gallery-3.webp",
        slug: "industrial-tool-safety-tips",
    },
    {
        id: 5,
        title: "Choosing the Right Material for Your Industrial Needs",
        description:
            "Understand the different types of materials, their properties and how to select the right one for your specific application.",
        date: "01 Oct 2024",
        image: "/assets/images/gallery/gallery-4.webp",
        slug: "choosing-right-industrial-material",
    },
    {
        id: 6,
        title: "Maintenance Tips to Extend the Life of Your Equipment",
        description:
            "Regular maintenance can improve performance, reduce downtime and extend the lifespan of your industrial equipment.",
        date: "24 Sep 2024",
        image: "/assets/images/gallery/gallery-6.webp",
        slug: "industrial-equipment-maintenance-tips",
    },

    /* PAGE 2 */

    {
        id: 7,
        title: "How Modern Cutting Systems Improve Production Accuracy",
        description:
            "Discover how modern cutting systems can improve production accuracy, reduce waste and increase overall efficiency.",
        date: "18 Sep 2024",
        image: "/assets/images/gallery/gallery-7.webp",
        slug: "modern-cutting-systems-production",
    },
    {
        id: 8,
        title: "Common Welding Problems and How to Avoid Them",
        description:
            "Understand some of the most common welding problems and practical ways to achieve better and more consistent results.",
        date: "10 Sep 2024",
        image: "/assets/images/gallery/gallery-8.webp",
        slug: "common-welding-problems",
    },
    {
        id: 9,
        title: "Why Quality Industrial Equipment Matters",
        description:
            "Reliable equipment plays an important role in safety, performance and long-term productivity across industrial applications.",
        date: "02 Sep 2024",
        image: "/assets/images/gallery/gallery-5.webp",
        slug: "quality-industrial-equipment",
    },
];


const BLOGS_PER_PAGE = 6;


export default function BlogPage() {

    const [currentPage, setCurrentPage] =
        useState(1);


    const { data: apiBlogs, meta, loading, error } = useApi(() => api.blogs({page:currentPage,per_page:BLOGS_PER_PAGE}), [currentPage]);
    const liveBlogs = (apiBlogs || []).map(b => ({id:b.id,title:b.title,slug:b.slug,description:b.excerpt || "",date:b.published_date || "",image:b.image_url || "/assets/images/favicon.png"}));
    const totalPages =
        meta?.last_page || 1;


    const startIndex =
        (currentPage - 1)
        * BLOGS_PER_PAGE;


    const currentBlogs = liveBlogs;


    const changePage = (
        page: number
    ) => {

        if (
            page < 1
            ||
            page > totalPages
        ) {
            return;
        }


        setCurrentPage(page);


        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    return (
        <>

            {/* =====================================================
                BREADCRUMB
            ====================================================== */}

            <Breadcrumb
                title="Blog"
                image={
                    blogBreadcrumb.src
                }
                items={[
                    {
                        label: "Blog",
                    },
                ]}
            />


            {/* =====================================================
                BLOG SECTION
            ====================================================== */}

            <section className="blog-page-section">

                <div className="blog-page-container">


                    {/* =================================================
                        HEADING
                    ================================================== */}

                    <div
                        className="blog-page-heading"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >

                        <span className="blog-page-kicker">

                            <i className="fa-regular fa-newspaper"></i>

                            Our Blog

                        </span>


                        <h2>

                            Latest

                            <span>
                                Insights
                            </span>

                        </h2>


                        <p>
                            Stay updated with our latest news,
                            industry insights and expert articles
                            on welding, cutting and industrial solutions.
                        </p>

                    </div>



                    {/* =================================================
                        BLOG GRID
                    ================================================== */}

                    <div className="blog-grid">
                        {loading && <p>Loading blogs...</p>}
                        {error && <p role="alert">{error}</p>}

                        {
                            currentBlogs.map(
                                (
                                    blog,
                                    index
                                ) => (

                                    <article
                                        className="blog-card"
                                        key={
                                            blog.id
                                        }
                                        data-aos="fade-up"
                                        data-aos-delay={
                                            (index % 3)
                                            * 80
                                        }
                                        data-aos-duration="750"
                                    >


                                        {/* =====================================
                                            IMAGE
                                        ====================================== */}

                                        <Link
                                            href={`/blogdetail?slug=${encodeURIComponent(blog.slug)}`}
                                            className="blog-card-image"
                                        >

                                            <img
                                                src={
                                                    blog.image
                                                }
                                                alt={
                                                    blog.title
                                                }
                                            />


                                            <span className="blog-card-image-overlay"></span>


                                            <span className="blog-image-corner"></span>

                                        </Link>



                                        {/* =====================================
                                            CONTENT
                                        ====================================== */}

                                        <div className="blog-card-content">


                                            {/* DATE */}

                                            <div className="blog-card-date">

                                                <i className="fa-regular fa-calendar"></i>

                                                <span>
                                                    {
                                                        blog.date
                                                    }
                                                </span>

                                            </div>



                                            {/* TITLE */}

                                            <h3>

                                                <Link
                                                    href={`/blogdetail?slug=${encodeURIComponent(blog.slug)}`}
                                                >
                                                    {
                                                        blog.title
                                                    }
                                                </Link>

                                            </h3>



                                            {/* DESCRIPTION */}

                                            <p>
                                                {
                                                    blog.description
                                                }
                                            </p>



                                            {/* BOTTOM */}

                                            <div className="blog-card-bottom">


                                                <Link
                                                    href={`/blogdetail?slug=${encodeURIComponent(blog.slug)}`}
                                                    className="blog-read-more"
                                                >

                                                    <span>
                                                        Read More
                                                    </span>

                                                    <i className="bi bi-arrow-right"></i>

                                                </Link>


                                                <span className="blog-card-decoration"></span>


                                            </div>


                                        </div>


                                    </article>

                                )
                            )
                        }

                    </div>



                    {/* =================================================
                        PAGINATION
                    ================================================== */}

                    {
                        totalPages > 1
                        && (

                            <div className="blog-pagination">


                                {/* PREVIOUS */}

                                <button

                                    type="button"

                                    className="blog-pagination-arrow"

                                    disabled={
                                        currentPage
                                        === 1
                                    }

                                    onClick={() =>
                                        changePage(
                                            currentPage
                                            - 1
                                        )
                                    }

                                    aria-label="Previous Page"

                                >

                                    <i className="bi bi-arrow-left"></i>

                                </button>



                                {/* PAGE NUMBERS */}

                                {
                                    Array.from(
                                        {
                                            length:
                                                totalPages,
                                        },
                                        (
                                            _,
                                            index
                                        ) => {

                                            const page =
                                                index
                                                + 1;


                                            return (

                                                <button

                                                    type="button"

                                                    key={
                                                        page
                                                    }

                                                    className={
                                                        `blog-pagination-number ${
                                                            currentPage
                                                            === page
                                                                ? "active"
                                                                : ""
                                                        }`
                                                    }

                                                    onClick={() =>
                                                        changePage(
                                                            page
                                                        )
                                                    }

                                                >

                                                    {
                                                        page
                                                    }

                                                </button>

                                            );

                                        }
                                    )
                                }



                                {/* NEXT */}

                                <button

                                    type="button"

                                    className="blog-pagination-arrow"

                                    disabled={
                                        currentPage
                                        === totalPages
                                    }

                                    onClick={() =>
                                        changePage(
                                            currentPage
                                            + 1
                                        )
                                    }

                                    aria-label="Next Page"

                                >

                                    <i className="bi bi-arrow-right"></i>

                                </button>


                            </div>

                        )
                    }


                </div>

            </section>

        </>
    );
}