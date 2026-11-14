"use client";

import { useState } from "react";

export default function FloatingContactLauncher() {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`ss-contact-launcher ${open ? "is-open" : ""}`}
        >

            {/* WHATSAPP */}

            <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="ss-contact-action ss-contact-whatsapp"
                aria-label="Chat on WhatsApp"
            >
                <span className="ss-contact-action-text">
                    WhatsApp
                </span>

                <span className="ss-contact-action-icon">
                    <i className="fa-brands fa-whatsapp"></i>
                </span>
            </a>


            {/* CALL */}

            <a
                href="tel:+919876543210"
                className="ss-contact-action ss-contact-call"
                aria-label="Call Us"
            >
                <span className="ss-contact-action-text">
                    Call Us
                </span>

                <span className="ss-contact-action-icon">
                    <i className="fa-solid fa-phone"></i>
                </span>
            </a>


            {/* EMAIL */}

            <a
                href="mailto:info@sanjaysales.com"
                className="ss-contact-action ss-contact-email"
                aria-label="Email Us"
            >
                <span className="ss-contact-action-text">
                    Email Us
                </span>

                <span className="ss-contact-action-icon">
                    <i className="fa-regular fa-envelope"></i>
                </span>
            </a>


            {/* MAIN TRIGGER */}

            <button
                type="button"
                className="ss-contact-trigger"
                onClick={() => setOpen(!open)}
                aria-label="Contact options"
                aria-expanded={open}
            >
                <span className="ss-contact-trigger-rings"></span>

                <span className="ss-contact-trigger-icon">
                    {open ? (
                        <i className="fa-solid fa-xmark"></i>
                    ) : (
                        <i className="fa-solid fa-headset"></i>
                    )}
                </span>

                <span className="ss-contact-trigger-label">
                    Contact
                </span>
            </button>

        </div>
    );
}