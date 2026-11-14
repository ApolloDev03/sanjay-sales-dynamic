import type { Metadata, Viewport } from "next";

/* ---------------------------------------------------------
   CSS ORDER = same order as the original index.html
   (keep it, later files override earlier ones)
--------------------------------------------------------- */
import "./styles/bootstrap.scss";
import "./styles/style.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "swiper/css/bundle";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "aos/dist/aos.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AosInit from "./components/common/AosInit";
import BootstrapClient from "./components/common/BootstrapClient";
import FloatingContactBar from "./components/common/FloatingContactLauncher";

export const metadata: Metadata = {
  title: "Sanjay Sales",
  icons: {
    icon: "/assets/images/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingContactBar />
        <AosInit />
        <BootstrapClient />
      </body>
    </html>
  );
}
