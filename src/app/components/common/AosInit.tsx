"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

/* Initialise AOS (scroll animations) once, refresh on every route change */
export default function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [pathname]);

  return null;
}
