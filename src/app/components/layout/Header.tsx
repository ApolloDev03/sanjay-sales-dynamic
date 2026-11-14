"use client";

import Link from "next/link";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  CONTACT,
  NAV_AFTER_PRODUCTS,
  NAV_BEFORE_PRODUCTS,
  ROUTES,
  SOCIAL_LINKS,
} from "@/app/data/site";

/* Collapse header after 120px, expand again only near the top.
   Two points prevent the topbar height change from toggling the state. */
const SCROLL_HIDE_POINT = 120;
const SCROLL_SHOW_POINT = 20;
const MOBILE_BREAKPOINT = 991;

const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

export default function Header() {
  const pathname = usePathname();
  const { data: menuCategories, loading: categoriesLoading, error: categoriesError } = useApi(() => api.categories(), []);

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const productMenuRef = useRef<HTMLLIElement>(null);

  /* =========================================================
     STICKY HEADER SCROLL
  ========================================================= */
  useEffect(() => {
    let scrolled = false;
    let ticking = false;

    const update = () => {
      const y =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      if (!scrolled && y >= SCROLL_HIDE_POINT) {
        scrolled = true;
        setIsScrolled(true);
      } else if (scrolled && y <= SCROLL_SHOW_POINT) {
        scrolled = false;
        setIsScrolled(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* =========================================================
     CLICK OUTSIDE (mobile product dropdown) + RESIZE
  ========================================================= */
  useEffect(() => {
    const onDocumentClick = (event: globalThis.MouseEvent) => {
      if (
        isMobile() &&
        productMenuRef.current &&
        !productMenuRef.current.contains(event.target as Node)
      ) {
        setProductsOpen(false);
      }
    };

    const onResize = () => {
      if (!isMobile()) {
        setProductsOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", onDocumentClick);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* =========================================================
     HANDLERS
  ========================================================= */

  /* Mobile / tablet: "Our Products" toggles the dropdown instead of navigating */
  const handleProductToggle = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isMobile()) return;
    event.preventDefault();
    event.stopPropagation();
    setProductsOpen((open) => !open);
  };

  /* Category card / View all: close dropdown + hamburger on mobile */
  const handleMegaLinkClick = () => {
    if (!isMobile()) return;
    setProductsOpen(false);
    setMenuOpen(false);
  };

  /* Other nav links */
  const handleNavLinkClick = () => {
    setProductsOpen(false);
    if (isMobile()) setMenuOpen(false);
  };

  /* Hamburger: closing it also closes the product dropdown */
  const handleMenuToggle = (checked: boolean) => {
    setMenuOpen(checked);
    if (!checked) setProductsOpen(false);
  };

  // const linkClass = (href: string) =>
  //   href !== "#" && pathname === href ? "ss-menu-link active" : "ss-menu-link";

  const isActiveLink = (href: string) => {
  if (!href || href === "#") return false;

  // Home should only be active on the homepage
  if (href === ROUTES.home) {
    return pathname === "/";
  }

  // Our Products active on listing and detail pages
  if (href === ROUTES.products) {
    return (
      pathname === "/products" ||
      pathname.startsWith("/products/") ||
      pathname === "/productdetail" ||
      pathname.startsWith("/productdetail/")
    );
  }

  // Blog active on listing and detail pages
  if (href === ROUTES.blog) {
    return (
      pathname === "/blog" ||
      pathname.startsWith("/blog/") ||
      pathname === "/blogdetail" ||
      pathname.startsWith("/blogdetail/")
    );
  }

  // Other page routes
  return pathname === href || pathname.startsWith(`${href}/`);
};

const linkClass = (href: string) =>
  isActiveLink(href)
    ? "ss-menu-link active"
    : "ss-menu-link";

  const renderNavItem = (item: { title: string; href: string }) => (
    <li className="ss-menu-item" key={item.title}>
      <Link href={item.href} className={linkClass(item.href)} onClick={handleNavLinkClick}>
        <span className="nav-title">{item.title}</span>
      </Link>
    </li>
  );

  return (
    <header className={isScrolled ? "ss-header header-scrolled" : "ss-header"}>
      {/* ======================================
          TOP BAR
      ======================================= */}
      <div className="ss-topbar">
        <div className="ss-topbar-inner">
          {/* LEFT */}
          <div className="topbar-contact">
            <a href={CONTACT.phoneHref} className="topbar-item">
              <span className="topbar-icon">
                <i className="bi bi-telephone-fill"></i>
              </span>{" "}
              <span>{CONTACT.phone}</span>
            </a>{" "}
            <span className="topbar-divider"></span>{" "}
            <a href={CONTACT.emailHref} className="topbar-item">
              <span className="topbar-icon">
                <i className="bi bi-envelope-fill"></i>
              </span>{" "}
              <span>{CONTACT.email}</span>
            </a>
          </div>

          {/* RIGHT */}
          <div className="topbar-social">
            <span className="follow-title">Follow Us</span>{" "}
            {SOCIAL_LINKS.map((social) => (
              <a href={social.href} aria-label={social.label} key={social.label}>
                <i className={social.biIcon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================
          MAIN HEADER
      ======================================= */}
      <div className="ss-main-header">
        <div className="ss-header-inner">
          {/* LOGO */}
          <Link href={ROUTES.home} className="ss-logo">
            <img src="/assets/images/logo.png" alt="Sanjay Sales" />
          </Link>{" "}
          {/* MOBILE CHECKBOX */}
          <input
            type="checkbox"
            id="menu-toggle"
            className="menu-checkbox"
            checked={menuOpen}
            onChange={(e) => handleMenuToggle(e.target.checked)}
          />{" "}
          {/* NAV */}
          <nav className="ss-navigation">
            <ul className="ss-menu">
              {NAV_BEFORE_PRODUCTS.map(renderNavItem)}

              {/* PRODUCTS */}
              <li
                ref={productMenuRef}
                className={productsOpen ? "ss-menu-item has-mega-menu mobile-open" : "ss-menu-item has-mega-menu"}
              >
                <Link
                  href={ROUTES.products}
                  className={`${linkClass(ROUTES.products)} product-menu-toggle`}
                  onClick={handleProductToggle}
                >
                  <span className="nav-title">Our Products</span>{" "}
                  <span className="nav-chevron"></span>
                </Link>{" "}
                {/* PRODUCT MEGA MENU */}
                <div className="products-mega-menu">
                  {/* TOP */}
                  <div className="mega-topbar">
                    <div className="mega-heading">
                      <span className="mega-label">PRODUCT CATEGORIES</span>{" "}
                      <h3>Explore Our Products</h3>
                    </div>{" "}
                    <Link href={ROUTES.products} className="mega-view-all" onClick={handleMegaLinkClick}>
                      View All Products <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>

                  {/* CATEGORY GRID */}
                  <div className="mega-product-grid">
                    {categoriesLoading && <p>Loading categories...</p>}
                    {categoriesError && <p role="alert">Unable to load categories: {categoriesError}</p>}
                    {menuCategories?.map((category) => (
                      <Link
                        href={`/products?category=${encodeURIComponent(category.slug)}`}
                        className="mega-category-card"
                        key={category.id}
                        onClick={handleMegaLinkClick}
                      >
                        <div className="mega-category-image">
                          {category.image_url && <img src={category.image_url} alt={category.name} onError={e => { e.currentTarget.style.display = "none"; }} />}
                        </div>
                        <div className="mega-category-content">
                          <h4>{category.name}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {NAV_AFTER_PRODUCTS.map(renderNavItem)}
            </ul>
          </nav>{" "}
          {/* MOBILE BUTTON */}
          <label htmlFor="menu-toggle" className="mobile-menu-btn">
            <span></span> <span></span> <span></span>
          </label>
        </div>
      </div>
    </header>
  );
}
