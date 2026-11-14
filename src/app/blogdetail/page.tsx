"use client";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

import Breadcrumb from "@/app/components/common/Breadcrumb";
import blogBreadcrumb from "../../../public/assets/images/breadcrumb.webp";


/* =========================================================
   TEMP BLOG DATA
   LATER THIS WILL COME FROM API / DATABASE
========================================================= */

const blog = {
    title:
        "The Future of Welding Technology in Modern Manufacturing",

    date:
        "28 Oct 2024",

    image:
        "/assets/images/gallery/gallery-1.webp",

    content: `
        <p>
            Welding technology continues to evolve rapidly as industries
            demand greater accuracy, productivity and reliability.
            Modern manufacturing environments now depend on advanced
            equipment that can provide consistent performance while
            improving efficiency.
        </p>

        <p>
            From modern inverter-based welding systems to automated
            cutting solutions, technology is transforming the way
            fabrication work is performed across industrial sectors.
        </p>

        <h2>
            Modern Technology in Industrial Welding
        </h2>

        <p>
            Modern welding equipment offers better control,
            greater energy efficiency and improved precision
            compared with conventional systems.
        </p>

        <h3>
            Key Advantages
        </h3>

        <ul>
            <li>
                
                Improved control helps produce accurate and
                consistent welding results.
                
            </li>

            <li>
            
                Faster operations and better control help
                improve overall production efficiency.
            </li>

            <li>
                

                Modern inverter-based systems consume energy
                more efficiently.
            </li>

            <li>
                
                Better equipment controls contribute to
                safer working environments.
            </li>
        </ul>

        <img
            src="/assets/images/gallery/gallery-7.webp"
            alt="Industrial welding technology"
        />

        <h2>
            Automation and the Future
        </h2>

        <p>
            Automation is becoming increasingly important in modern
            manufacturing. Automated welding and cutting systems
            help improve production speed while maintaining
            repeatable quality.
        </p>

        <p>
            As technology continues to evolve, industries will
            increasingly depend on smarter equipment and efficient
            production systems.
        </p>

        <h2>
            Choosing the Right Equipment
        </h2>

        <p>
            Selecting the right welding or cutting equipment depends
            on application, material, production requirements and
            expected performance.
        </p>

        <blockquote>
            Reliable industrial equipment helps improve productivity,
            safety and consistency across professional applications.
        </blockquote>

        <p>
            Reliable equipment can significantly improve long-term
            productivity and manufacturing quality.
        </p>
    `,
};


/* =========================================================
   RELATED BLOGS
========================================================= */

const relatedBlogs = [
    {
        id: 1,

        title:
            "A Complete Guide to Precision Cutting for Industrial Applications",

        date:
            "22 Oct 2024",

        image:
            "/assets/images/gallery/gallery-2.webp",

        href:
            "/blogdetail",
    },

    {
        id: 2,

        title:
            "How to Improve Workshop Productivity and Workflow",

        date:
            "15 Oct 2024",

        image:
            "/assets/images/gallery/gallery-5.webp",

        href:
            "/blogdetail",
    },

    {
        id: 3,

        title:
            "Essential Safety Tips for Working with Industrial Tools",

        date:
            "08 Oct 2024",

        image:
            "/assets/images/gallery/gallery-3.webp",

        href:
            "/blogdetail",
    },
];


function BlogDetailContent({ slug }: { slug: string }) {
    const {data: detail, loading, error} = useApi(() => api.blogDetail(slug || ""), [slug]);
    const blog = detail?.blog ? {title:detail.blog.title,image:detail.blog.image_url || "/assets/images/favicon.png",date:detail.blog.published_date || "",content:detail.blog.content || ""} : {title:"",image:"",date:"",content:""};
    const relatedBlogs = (detail?.recent_posts || []).map(b => ({id:b.id,title:b.title,image:b.image_url || "/assets/images/favicon.png",date:b.published_date || "",href:`/blogdetail?slug=${encodeURIComponent(b.slug)}`}));
    if (loading) return <div className="container py-5">Loading blog...</div>;
    if (!slug) return <div className="container py-5">Blog slug missing. Open a blog from the blog page.</div>;
    if (error || !detail?.blog) return <div className="container py-5" role="alert">{error || "Blog not found"}</div>;


    return (
        <>

            {/* =====================================================
                BREADCRUMB
            ====================================================== */}

            <Breadcrumb
                title="Blog Detail"
                image={blogBreadcrumb.src}
                items={[
                    {
                        label: "Blog",
                        href: "/blog",
                    },

                    {
                        label:
                            blog.title,
                    },
                ]}
            />


            {/* =====================================================
                BLOG ARTICLE SECTION
            ====================================================== */}

            <section className="blog-article-section">

                <div className="blog-article-container">


                    {/* =================================================
                        LEFT CURRENT BLOG
                    ================================================== */}

                    <article
                        className="blog-article-main"
                        data-aos="fade-right"
                        data-aos-duration="850"
                    >


                        {/* =============================================
                            MAIN IMAGE
                        ============================================== */}

                        <div className="blog-article-main-image">

                            <img
                                src={blog.image}
                                alt={blog.title}
                            />

                            <span className="blog-article-image-overlay"></span>

                            <span className="blog-article-image-accent"></span>

                        </div>


                        {/* =============================================
                            SCROLLABLE ARTICLE CONTENT
                        ============================================== */}

                        <div className="blog-article-scroll">


                            {/* META */}

                            <div className="blog-article-meta">

                                <span>

                                    <i className="fa-regular fa-calendar"></i>

                                    {blog.date}

                                </span>

                            </div>


                            {/* TITLE */}

                            <h1 className="blog-article-title">

                                {blog.title}

                            </h1>


                            {/* =============================================
                                COMPLETE EDITOR CONTENT
                            ============================================== */}

                            <div
                                className="blog-editor-content"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        blog.content,
                                }}
                            />


                        </div>

                    </article>



                    {/* =================================================
                        RIGHT SIDEBAR
                    ================================================== */}

                    <aside
                        className="blog-article-sidebar"
                        data-aos="fade-left"
                        data-aos-duration="850"
                    >

                        <div className="blog-related-box">


                            {/* =============================================
                                HEADING
                            ============================================== */}

                            <div className="blog-related-heading">

                                <span>

                                    <i className="fa-regular fa-newspaper"></i>

                                    More Insights

                                </span>


                                <h2>

                                    Related

                                    <strong>
                                        Blogs
                                    </strong>

                                </h2>

                            </div>



                            {/* =============================================
                                RELATED BLOGS
                            ============================================== */}

                            <div className="blog-related-list">

                                {relatedBlogs.map(
                                    (relatedBlog) => (

                                        <Link
                                            href={
                                                relatedBlog.href
                                            }
                                            className="blog-related-card"
                                            key={
                                                relatedBlog.id
                                            }
                                        >


                                            {/* IMAGE */}

                                            <div className="blog-related-image">

                                                <img
                                                    src={
                                                        relatedBlog.image
                                                    }
                                                    alt={
                                                        relatedBlog.title
                                                    }
                                                />

                                                <span className="blog-related-image-overlay"></span>

                                            </div>


                                            {/* CONTENT */}

                                            <div className="blog-related-content">

                                                <div className="blog-related-date">

                                                    <i className="fa-regular fa-calendar"></i>

                                                    {
                                                        relatedBlog.date
                                                    }

                                                </div>


                                                <h3>

                                                    {
                                                        relatedBlog.title
                                                    }

                                                </h3>


                                                <span className="blog-related-arrow">

                                                    <i className="bi bi-arrow-up-right"></i>

                                                </span>

                                            </div>


                                        </Link>

                                    )
                                )}

                            </div>



                            {/* =============================================
                                VIEW ALL
                            ============================================== */}

                            <Link
                                href="/blog"
                                className="blog-related-all"
                            >

                                <span>
                                    View All Blogs
                                </span>

                                <i className="bi bi-arrow-right"></i>

                            </Link>


                        </div>

                    </aside>


                </div>

            </section>

        </>
    );
}

function BlogDetailRoute() {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug") || "";

    // A new key remounts the content and refetches when the URL slug changes.
    return <BlogDetailContent key={slug} slug={slug} />;
}

export default function BlogDetailPage() {
    return (
        <Suspense fallback={<div className="container py-5">Loading blog...</div>}>
            <BlogDetailRoute />
        </Suspense>
    );
}