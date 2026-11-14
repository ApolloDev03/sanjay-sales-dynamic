"use client";

import Link from "next/link";

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbProps = {
    title: string;
    image: string;
    items: BreadcrumbItem[];
};

export default function Breadcrumb({
    title,
    image,
    items,
}: BreadcrumbProps) {
    return (
        <section
            className="ss-breadcrumb"
            style={{
                backgroundImage: `url(${image})`,
            }}
        >
            {/* DARK OVERLAY */}
            <div className="ss-breadcrumb-overlay"></div>

            {/* DECORATIVE SHAPES */}
            <span className="ss-breadcrumb-shape-one"></span>
            <span className="ss-breadcrumb-shape-two"></span>

            <div className="ss-breadcrumb-container">

                <div className="ss-breadcrumb-content">

                    {/* SMALL LABEL */}
                    <span className="ss-breadcrumb-kicker">
                        <i className="fa-solid fa-gears"></i>
                        Sanjay Sales
                    </span>

                    {/* PAGE TITLE */}
                    <h1>
                        {title}
                    </h1>

                    {/* BREADCRUMB NAVIGATION */}
                    <nav
                        className="ss-breadcrumb-nav"
                        aria-label="breadcrumb"
                    >
                        <Link
                            href="/"
                            className="ss-breadcrumb-home"
                        >
                            <i className="fa-solid fa-house"></i>
                            <span>Home</span>
                        </Link>

                        {items.map((item, index) => {
                            const isLast =
                                index === items.length - 1;

                            return (
                                <div
                                    className="ss-breadcrumb-item"
                                    key={`${item.label}-${index}`}
                                >
                                    <span className="ss-breadcrumb-separator">
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </span>

                                    {item.href && !isLast ? (
                                        <Link href={item.href}>
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="active">
                                            {item.label}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                </div>

            </div>

        </section>
    );
}