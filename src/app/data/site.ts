/* =========================================================
   SITE DATA
   All repeated content of the home page lives here so the
   inner pages can reuse it (menu, footer, product lists…).
========================================================= */

export interface NavItem {
  title: string;
  href: string;
}

export interface ProductCategory {
  title: string;
  image: string;
  href: string;
}

export interface HeroSlide {
  image: string;
  alt: string;
  kickerIcon: string;
  kicker: string;
  /* heading is split in 3 parts: before / highlighted <span> / after */
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  text: string;
  buttonText: string;
  buttonHref: string;
}

export interface CounterItem {
  icon: string;
  value: number;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /* bootstrap-icons class (top bar) */
  biIcon: string;
  /* font-awesome class (footer) */
  faIcon: string;
}

export const CONTACT = {
  phone: "+91 93749 91103",
  phoneHref: "tel:+919374991103",
  email: "san_shah120@yahoo.com",
  emailHref: "mailto:san_shah120@yahoo.com",
  address:
    "10, Mangal Estate, Nr, Chakudia Mahadev Temple, Rakhial, Ahmedabad - 380023.",
  catalogue: "/assets/pdf/sanjay-sales-catalogue.pdf",
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook", href: "#", biIcon: "bi bi-facebook", faIcon: "fa-brands fa-facebook-f" },
  { label: "Instagram", href: "#", biIcon: "bi bi-instagram", faIcon: "fa-brands fa-instagram" },
  { label: "LinkedIn", href: "#", biIcon: "bi bi-linkedin", faIcon: "fa-brands fa-linkedin-in" },
  { label: "YouTube", href: "#", biIcon: "bi bi-youtube", faIcon: "fa-brands fa-youtube" },
];

/* ---------------------------------------------------------
   ROUTES
   Change these when the inner pages are created.
--------------------------------------------------------- */
export const ROUTES = {
  home: "/",
  about: "/about",
  products: "/products",
  gallery: "/gallery",
  blog: "/blog",
  contact: "/contact",
};

/* Main menu items (Products is rendered separately with the mega menu) */
export const NAV_BEFORE_PRODUCTS: NavItem[] = [
  { title: "Home", href: ROUTES.home },
  { title: "About Us", href: ROUTES.about },
];

export const NAV_AFTER_PRODUCTS: NavItem[] = [
  { title: "Gallery", href: ROUTES.gallery },
  { title: "Blog", href: ROUTES.blog },
  { title: "Contact Us", href: ROUTES.contact },
];

const IMG = "/assets/images/categories";

/* Categories shown in the header mega menu */
export const MEGA_MENU_CATEGORIES: ProductCategory[] = [
  { title: "Welding Machines", image: `${IMG}/welding-machine.jpg`, href: "/products" },
  { title: "CNC Cutting Machines", image: `${IMG}/cnc-cutting-machine.jpg`, href: "#" },
  { title: "Plasma Cutting", image: `${IMG}/plasma-cutting.jpg`, href: "#" },
  { title: "Power Tools", image: `${IMG}/power-tools.jpg`, href: "#" },
  { title: "Hand Tools", image: `${IMG}/hand-tools.jpg`, href: "#" },
  { title: "Safety PPE", image: `${IMG}/safety-ppe.png`, href: "#" },
  { title: "Hand Gloves", image: `${IMG}/hand-gloves.jpg`, href: "#" },
  { title: "Cut-off Wheels", image: `${IMG}/cut-off-wheel.jpg`, href: "#" },
  { title: "Grinding Wheels", image: `${IMG}/grinding-wheels.jpeg`, href: "#" },
  { title: "Measuring Tools", image: `${IMG}/measuring-instrument-tools.jpg`, href: "#" },
  { title: "Plain Wheel", image: `${IMG}/plain-wheels.jpg`, href: "#" },
  { title: "Pulling & Lifting Materials", image: `${IMG}/lifting-material.jpg`, href: "#" },
  { title: "Welding Electrodes", image: `${IMG}/welding-electrodes.jpg`, href: "#" },
  { title: "Accessories", image: `${IMG}/accessories.jpg`, href: "#" },
];

/* Categories shown in the home page category slider */
export const HOME_CATEGORIES: ProductCategory[] = [
  { title: "Welding Machines", image: `${IMG}/welding-machine.jpg`, href: "/products" },
  { title: "CNC Cutting Machines", image: `${IMG}/cnc-cutting-machine.jpg`, href: "#" },
  { title: "Plasma Cutting", image: `${IMG}/plasma-cutting.jpg`, href: "#" },
  { title: "Power Tools", image: `${IMG}/power-tools.jpg`, href: "#" },
  { title: "Hand Tools", image: `${IMG}/hand-tools.jpg`, href: "#" },
  { title: "Safety PPE", image: `${IMG}/safety-ppe.png`, href: "#" },
  { title: "Hand Gloves", image: `${IMG}/hand-gloves.jpg`, href: "#" },
  { title: "Cut-off Wheels", image: `${IMG}/cut-off-wheel.jpg`, href: "#" },
  { title: "Grinding Wheels", image: `${IMG}/grinding-wheels.jpeg`, href: "#" },
  { title: "Measuring Tools", image: `${IMG}/measuring-instrument-tools.jpg`, href: "#" },
  { title: "Welding Electrodes", image: `${IMG}/welding-electrodes.jpg`, href: "#" },
  { title: "Accessories", image: `${IMG}/accessories.jpg`, href: "#" },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/assets/images/hero-1.jpg",
    alt: "Industrial Welding Solutions",
    kickerIcon: "fa-solid fa-gears",
    kicker: "WELDING • CUTTING • INDUSTRIAL SOLUTIONS",
    titleStart: "Powering",
    titleHighlight: "Industrial",
    titleEnd: "Performance.",
    text: "Reliable welding and cutting solutions built for professionals who demand precision, strength and consistent performance.",
    buttonText: "Explore Products",
    buttonHref: "#",
  },
  {
    image: "/assets/images/hero-2.jpg",
    alt: "Advanced Welding Machines",
    kickerIcon: "fa-solid fa-screwdriver-wrench",
    kicker: "COMPLETE INDUSTRIAL SOLUTIONS",
    titleStart: "Everything",
    titleHighlight: "Your Workshop",
    titleEnd: "Needs.",
    text: "From cutting systems and power tools to safety products, measuring tools and industrial accessories — explore solutions built for professional work environments.",
    buttonText: "Explore Product Range",
    buttonHref: ROUTES.products,
  },
  {
    image: "/assets/images/hero-3.jpg",
    alt: "CNC Cutting Solutions",
    kickerIcon: "fa-solid fa-industry",
    kicker: "CNC • PLASMA • CUTTING TECHNOLOGY",
    titleStart: "Cut Smarter.",
    titleHighlight: "Work Faster.",
    titleEnd: "Build Better.",
    text: "Modern cutting technologies for accurate, efficient and dependable industrial production.",
    buttonText: "View Cutting Range",
    buttonHref: ROUTES.products,
  },
];

export const COUNTERS: CounterItem[] = [
  { icon: "fa-solid fa-calendar-check", value: 40, label: "Years Experience" },
  { icon: "fa-solid fa-boxes-stacked", value: 5000, label: "Products Supplied" },
  { icon: "fa-solid fa-users", value: 1000, label: "Satisfied Clients" },
  { icon: "fa-solid fa-handshake", value: 25, label: "Trusted Brands" },
];

export const CLIENT_LOGOS: string[] = Array.from(
  { length: 8 },
  (_, i) => `/assets/images/clients/logo-${i + 1}.jpg`
);

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { title: "Home", href: ROUTES.home },
  { title: "About Us", href: "/about" },
  // { title: "Our Products", href: "#" },
  { title: "Gallery", href: "/gallery" },
  { title: "Blog", href: "/blog" },
  { title: "Contact Us", href: "/contact" },
];

export const FOOTER_PRODUCT_LINKS: NavItem[] = [
  { title: "Welding Machines", href: "#" },
  { title: "CNC Cutting Machines", href: "#" },
  { title: "Plasma Cutting", href: "#" },
  { title: "Power Tools", href: "#" },
  { title: "Safety PPE", href: "#" },
  { title: "Accessories", href: "#" },
];
