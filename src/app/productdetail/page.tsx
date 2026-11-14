"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import Link from "next/link";

import Breadcrumb from "@/app/components/common/Breadcrumb";
import productBreadcrumb from "../../../public/assets/images/breadcrumb.webp";


// The backend now returns features/applications as HTML strings.
// Ignore markup containing only whitespace, breaks or empty paragraphs.
const hasContent = (value?: string | null) =>
    Boolean(value?.replace(/<[^>]*>/g, "").replace(/&nbsp;|&#160;/gi, " ").trim());

export default function ProductDetailPage() {
    return (
        <Suspense fallback={<div className="container py-5">Loading product...</div>}>
            <ProductDetailRoute />
        </Suspense>
    );
}

function ProductDetailRoute() {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug") || "";

    // Remount the detail component when a related-product link changes the slug.
    // This also resets FAQ state and prevents showing stale product data.
    return <ProductDetailContent key={slug} slug={slug} />;
}

function ProductDetailContent({ slug }: { slug: string }) {
    const { data: detail, loading, error } = useApi(() => slug ? api.productDetail(slug) : Promise.reject(new Error("Product slug missing")), [slug]);
    const product = detail?.product;
    const specifications = (product?.specifications ?? [])
        .map(group => ({
            heading: group.group,
            items: (group.items ?? []).filter(item => hasContent(item.label) && hasContent(item.value)),
        }))
        .filter(group => hasContent(group.heading) && group.items.length > 0);
    const faqs = (product?.faqs ?? [])
        .filter(faq => hasContent(faq.question) && hasContent(faq.answer))
        .map(faq => ({ id: faq.id, question: faq.question, answer: faq.answer }));
    const relatedProducts = (detail?.related_products ?? [])
        .filter(item => item.slug && item.name)
        .map(item => ({ id: item.id, slug: item.slug, name: item.name, image: item.image_url || "" }));
    const hasDescription = hasContent(product?.description);
    const hasFeatures = hasContent(product?.features);
    const hasApplications = hasContent(product?.applications);
    const [openFaq, setOpenFaq] =
        useState<number | null>(1);


    const toggleFaq = (
        id: number
    ) => {

        setOpenFaq(
            openFaq === id
                ? null
                : id
        );

    };


    if (loading && slug) return <div className="container py-5">Loading product...</div>;
    if (!slug) return <div className="container py-5">Product slug missing. Open a product from the products page.</div>;
    if (error || !product) return <div className="container py-5" role="alert">{error || "Product not found"}</div>;

    return (
        <>

            {/* =====================================================
                BREADCRUMB
            ====================================================== */}

            <Breadcrumb
                title="Product Detail"
                image={productBreadcrumb.src}
                items={[
                    {
                        label:
                            "Products",

                        href:
                            "/products",
                    },

                    {
                        label:
                            product.name,
                    },
                ]}
            />


            {/* =====================================================
                PRODUCT DETAIL
            ====================================================== */}

            <section className="product-detail-section">

                <div className="product-detail-container">


                    {/* =================================================
                        PRODUCT INTRO
                    ================================================== */}

                    <div
                        className="product-detail-intro"
                        data-aos="fade-up"
                    >

                        <div className="product-detail-intro-image">

                            {product.image_url && <img
                                src={product.image_url}
                                onError={e => { e.currentTarget.style.display = "none"; }}
                                alt={product.name}
                            />}

                            <span className="product-detail-intro-corner"></span>

                        </div>


                        <div className="product-detail-intro-content">

                            <span className="product-detail-intro-kicker">

                                <span></span>

                                Product Detail

                            </span>


                            {hasContent(product.name) && (
                                <h1>{product.name}</h1>
                            )}


                            {hasContent(product.short_description) ? (
                                <div className="product-editor-content"
                                    dangerouslySetInnerHTML={{ __html: product.short_description! }} />
                            ) : hasContent(product.short_description_text) ? (
                                <p>{product.short_description_text}</p>
                            ) : null}


                        </div>

                    </div>


                    {/* =================================================
                        PRODUCT DESCRIPTION
                    ================================================== */}

                    {(hasDescription || hasFeatures || hasApplications) && <section
                        className="product-open-section"
                        data-aos="fade-up"
                    >

                        {hasDescription && <div className="product-section-heading">

                            <span>
                                Product Information
                            </span>


                            <h2>

                                Product

                                <strong>
                                    Description
                                </strong>

                            </h2>

                        </div>}


                        {hasDescription && <div
                            className="product-editor-content"
                            dangerouslySetInnerHTML={{
                                __html:
                                    product?.description || "",
                            }}
                        />}

                        {(hasFeatures || hasApplications) && (
                            <div className="product-detail-feature-application">
                                {hasFeatures && (
                                    <div className="product-detail-info-column">
                                        <h2>Key <span>Features</span></h2>
                                        <div dangerouslySetInnerHTML={{ __html: product?.features || "" }} />
                                    </div>
                                )}
                                {hasApplications && (
                                    <div className="product-detail-info-column">
                                        <h2>Applications</h2>
                                        <div dangerouslySetInnerHTML={{ __html: product?.applications || "" }} />
                                    </div>
                                )}
                            </div>
                        )}

                    </section>}


                    {/* =================================================
                        TECHNICAL SPECIFICATIONS
                    ================================================== */}

                    {specifications.length > 0 && <section
                        className="product-open-section product-specification-section"
                        data-aos="fade-up"
                    >

                        <div className="product-section-heading">

                            <span>
                                Product Data
                            </span>


                            <h2>

                                Technical

                                <strong>
                                    Specifications
                                </strong>

                            </h2>

                        </div>


                        <div className="product-specification-groups">

                            {
                                specifications.map(
                                    (
                                        group,
                                        groupIndex
                                    ) => (

                                        <div
                                            className="product-specification-group"
                                            key={groupIndex}
                                        >

                                            <div className="product-specification-group-heading">

                                                <span></span>

                                                <h3>
                                                    {group.heading.trim().split(/\s+/).map((word, index) => (
                                                        <span
                                                            key={index}
                                                            className={
                                                                index > 0
                                                                    ? "product-specification-red-word"
                                                                    : ""
                                                            }
                                                        >
                                                            {word}

                                                            {index < group.heading.trim().split(/\s+/).length - 1
                                                                ? "\u00A0"
                                                                : ""}
                                                        </span>
                                                    ))}
                                                </h3>

                                            </div>


                                            <div className="product-specification-list">

                                                {
                                                    group.items.map(
                                                        (
                                                            specification,
                                                            itemIndex
                                                        ) => (

                                                            <div
                                                                className="product-specification-row"
                                                                key={itemIndex}
                                                            >

                                                                <div className="product-specification-label">

                                                                    {
                                                                        specification.label
                                                                    }

                                                                </div>


                                                                <div className="product-specification-value">

                                                                    {
                                                                        specification.value
                                                                    }

                                                                </div>

                                                            </div>

                                                        )
                                                    )
                                                }

                                            </div>

                                        </div>

                                    )
                                )
                            }

                        </div>

                    </section>}


                    {/* =================================================
                        FAQ
                    ================================================== */}

                    {faqs.length > 0 && <section
                        className="product-open-section product-faq-section"
                        data-aos="fade-up"
                    >

                        <div className="product-section-heading">

                            <span>
                                FAQ
                            </span>


                            <h2>

                                Frequently Asked

                                <strong>
                                    Questions
                                </strong>

                            </h2>

                        </div>


                        <div className="product-faq-list">

                            {
                                faqs.map(
                                    (faq) => {

                                        const isOpen =
                                            openFaq === faq.id;


                                        return (

                                            <div
                                                className={`product-faq-item ${isOpen
                                                    ? "active"
                                                    : ""
                                                    }`}
                                                key={faq.id}
                                            >

                                                <button
                                                    type="button"
                                                    className="product-faq-question"
                                                    onClick={() =>
                                                        toggleFaq(
                                                            faq.id
                                                        )
                                                    }
                                                >

                                                    <span className="product-faq-title">

                                                        {
                                                            faq.question
                                                        }

                                                    </span>


                                                    <span className="product-faq-toggle">

                                                        <i
                                                            className={
                                                                isOpen
                                                                    ? "bi bi-dash"
                                                                    : "bi bi-plus"
                                                            }
                                                        ></i>

                                                    </span>

                                                </button>


                                                <div className="product-faq-answer">

                                                    <div>

                                                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />

                                                    </div>

                                                </div>

                                            </div>

                                        );

                                    }
                                )
                            }

                        </div>

                    </section>}


                    {/* =================================================
                        RELATED PRODUCTS
                    ================================================== */}

                    {relatedProducts.length > 0 && <section
                        className="product-open-section product-related-section"
                        data-aos="fade-up"
                    >

                        <div className="product-related-top">

                            <div className="product-section-heading">

                                <span>
                                    More Products
                                </span>


                                <h2>

                                    Related

                                    <strong>
                                        Products
                                    </strong>

                                </h2>

                            </div>


                            <Link
                                href="/products"
                                className="product-related-view-all"
                            >

                                View All Products

                                <i className="bi bi-arrow-right"></i>

                            </Link>

                        </div>


                        <div className="product-related-grid">

                            {
                                relatedProducts.map(
                                    (
                                        relatedProduct
                                    ) => (

                                        <article
                                            className="product-related-card"
                                            key={relatedProduct.id}
                                        >

                                            <Link
                                                href={`/productdetail?slug=${encodeURIComponent(relatedProduct.slug)}`}
                                                className="product-related-image"
                                            >

                                                {relatedProduct.image && <img
                                                    src={relatedProduct.image}
                                                    onError={e => { e.currentTarget.style.display = "none"; }}
                                                    alt={relatedProduct.name}
                                                />}

                                            </Link>


                                            <div className="product-related-content">

                                                <h3>

                                                    <Link href={`/productdetail?slug=${encodeURIComponent(relatedProduct.slug)}`}>

                                                        {
                                                            relatedProduct.name
                                                        }

                                                    </Link>

                                                </h3>


                                                <Link
                                                    href={`/productdetail?slug=${encodeURIComponent(relatedProduct.slug)}`}
                                                    className="product-related-btn"
                                                >

                                                    <span>
                                                        View Detail
                                                    </span>

                                                    <i className="bi bi-arrow-right"></i>

                                                </Link>

                                            </div>

                                        </article>

                                    )
                                )
                            }

                        </div>

                    </section>}


                </div>

            </section>

        </>
    );
}