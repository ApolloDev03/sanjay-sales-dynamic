"use client";

import { useEffect } from "react";

/* Loads Bootstrap's JS bundle (modals, dropdowns, collapse, tooltips…) in the browser only */
export default function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}
