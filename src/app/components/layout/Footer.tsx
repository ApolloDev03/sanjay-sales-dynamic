
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type Category } from "@/lib/api";

import {
  CONTACT,
  FOOTER_QUICK_LINKS,
  ROUTES,
  SOCIAL_LINKS,
  type NavItem,
} from "@/app/data/site";

function FooterLinks({ links }: { links: NavItem[] }) {
  return (
    <ul className="ss-footer-links">
      {links.map((link) => (
        <li key={link.title}>
          <Link href={link.href}>
            <i className="bi bi-arrow-right"></i> {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const [footerCategories, setFooterCategories] = useState<Category[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchFooterCategories = async () => {
      try {
        const response = await api.categories();

        if (isMounted && Array.isArray(response.data)) {
          const lastSixCategories = response.data
            .filter(
              (category) =>
                category.name?.trim() &&
                category.slug?.trim()
            )
            .slice(-6);

          setFooterCategories(lastSixCategories);
        }
      } catch (error) {
        console.error("Footer categories API error:", error);
      }
    };

    fetchFooterCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="ss-footer">
      <div className="ss-footer-container">
        <div className="ss-footer-grid">

          {/* BRAND */}
          <div
            className="ss-footer-brand"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <Link href={ROUTES.home} className="ss-footer-logo">
              <img
                src="/assets/images/logo.png"
                alt="Sanjay Sales"
              />
            </Link>{" "}

            <p>
              Trusted supplier of welding, cutting and industrial
              solutions, delivering reliable products, equipment and
              support for professionals across industries.
            </p>{" "}

            <div className="ss-footer-social">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  href={social.href}
                  aria-label={social.label}
                  key={social.label}
                >
                  <i className={social.faIcon}></i>
                </Link>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div
            className="ss-footer-column"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="ss-footer-heading">
              <span></span>{" "}
              <h3>Quick Links</h3>
            </div>{" "}

            <FooterLinks links={FOOTER_QUICK_LINKS} />
          </div>

          {/* PRODUCTS - DYNAMIC LAST 6 CATEGORIES */}
          <div
            className="ss-footer-column"
            data-aos="fade-up"
            data-aos-delay="180"
          >
            <div className="ss-footer-heading">
              <span></span>{" "}
              <h3>Our Products</h3>
            </div>{" "}

            <ul className="ss-footer-links">
              {footerCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${encodeURIComponent(
                      category.slug
                    )}`}
                  >
                    <i className="bi bi-arrow-right"></i>{" "}
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div
            className="ss-footer-column ss-footer-contact"
            data-aos="fade-up"
            data-aos-delay="260"
          >
            <div className="ss-footer-heading">
              <span></span>{" "}
              <h3>Contact Info</h3>
            </div>{" "}

            <div className="ss-footer-contact-list">
              <Link
                href={CONTACT.phoneHref}
                className="ss-footer-contact-item"
              >
                <span className="ss-footer-contact-icon">
                  <i className="fa-solid fa-phone"></i>
                </span>{" "}

                <div>
                  <small>Call Us</small>{" "}
                  <strong>{CONTACT.phone}</strong>
                </div>
              </Link>{" "}

              <Link
                href={CONTACT.emailHref}
                className="ss-footer-contact-item"
              >
                <span className="ss-footer-contact-icon">
                  <i className="fa-solid fa-envelope"></i>
                </span>{" "}

                <div>
                  <small>Email Us</small>{" "}
                  <strong>{CONTACT.email}</strong>
                </div>
              </Link>{" "}

              <div className="ss-footer-contact-item">
                <span className="ss-footer-contact-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </span>{" "}

                <div>
                  <small>Visit Us</small>{" "}
                  <strong>{CONTACT.address}</strong>
                </div>
              </div>
            </div>{" "}

            {/* DOWNLOAD */}
            <Link
              href="/download"
              className="ss-footer-download"
            >
              <i className="fa-solid fa-file-arrow-down"></i>{" "}
              <span>Download Catalogue</span>
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="ss-footer-bottom">
          <p>© 2026 Sanjay Sales. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
