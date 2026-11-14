"use client";
import { api } from "@/lib/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./contact-validation.module.css";

import Breadcrumb from "@/app/components/common/Breadcrumb";
import contact from "../../../public/assets/images/breadcrumb.webp";
import contactMain from "../../../public/assets/images/contact-main.webp";

type InquiryField = "name" | "phone" | "email" | "message";
type FormErrors = Partial<Record<InquiryField, string>>;
const FIELD_NAMES: InquiryField[] = ["name", "phone", "email", "message"];

function validateInquiry(values: Record<InquiryField, string>): FormErrors {
    const errors: FormErrors = {};
    if (!values.name) errors.name = "Please enter your full name.";
    else if (values.name.length < 2) errors.name = "Name must be at least 2 characters.";
    else if (!/^[\p{L}][\p{L}\p{M}\s.'-]*$/u.test(values.name)) errors.name = "Please enter a valid name.";

    const phoneDigits = values.phone.replace(/[^\d]/g, "");
    const mobile = phoneDigits.length === 12 && phoneDigits.startsWith("91")
        ? phoneDigits.slice(2) : phoneDigits;
    if (!values.phone) errors.phone = "Please enter your mobile number.";
    else if (!/^[6-9]\d{9}$/.test(mobile)) errors.phone = "Enter a valid 10-digit Indian mobile number.";

    if (!values.email) errors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Please enter a valid email address.";

    if (!values.message) errors.message = "Please enter your message.";
    else if (values.message.length < 10) errors.message = "Message must be at least 10 characters.";
    return errors;
}

export default function ContactPage() {
    const router = useRouter();
    const [submitState, setSubmitState] = useState<"idle" | "sending" | "error">("idle");
    const [submitMessage, setSubmitMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
    useEffect(() => {
        if (!submitMessage) return;
        const timer = window.setTimeout(() => setSubmitMessage(""), 5000);
        return () => window.clearTimeout(timer);
    }, [submitMessage]);

    const clearFieldError = (field: InquiryField) => {
        setFieldErrors(previous => ({ ...previous, [field]: undefined }));
        if (submitMessage) setSubmitMessage("");
    };

    const handleInquiry = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitState === "sending") return;
        const fields = new FormData(event.currentTarget);
        const values: Record<InquiryField, string> = {
            name: String(fields.get("name") || "").trim(),
            phone: String(fields.get("phone") || "").trim(),
            email: String(fields.get("email") || "").trim(),
            message: String(fields.get("message") || "").trim(),
        };
        const errors = validateInquiry(values);
        setFieldErrors(errors);
        if (Object.keys(errors).length) {
            setSubmitState("error");
            setSubmitMessage("Please correct the highlighted fields and try again.");
            const firstInvalid = FIELD_NAMES.find(field => errors[field]);
            if (firstInvalid) {
                (event.currentTarget.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
            }
            return;
        }
        setSubmitState("sending");
        setSubmitMessage("");
        try {
            await api.inquiry(values);
            // Redirect only after the API returns success: true.
            router.push("/thank-you");
        } catch (err) {
            const response = axios.isAxiosError(err) ? err.response?.data : undefined;
            const serverErrors: FormErrors = {};
            if (response && typeof response === "object" && "errors" in response) {
                const backendFields = response.errors as Record<string, unknown> | undefined;
                FIELD_NAMES.forEach(field => {
                    const issue = backendFields?.[field];
                    if (Array.isArray(issue) && issue.length > 0) serverErrors[field] = String(issue[0]);
                    else if (typeof issue === "string") serverErrors[field] = issue;
                });
            }
            setFieldErrors(serverErrors);
            const message = typeof response?.message === "string" ? response.message :
                axios.isAxiosError(err) && !err.response
                    ? "Unable to connect. Check your internet connection and try again."
                    : err instanceof Error ? err.message : "Unable to submit inquiry. Please try again.";
            setSubmitState("error");
            setSubmitMessage(message);
        }
    };
    return (
        <>
            {submitMessage && (
                <div className={`ss-inquiry-toast ${"is-error"}`}
                     role={submitState === "error" ? "alert" : "status"} aria-live="polite">
                    <span aria-hidden="true"><i className={"bi bi-exclamation-triangle-fill"}></i></span>
                    <span>{submitMessage}</span>
                    <button type="button" aria-label="Close notification" onClick={() => setSubmitMessage("")}>×</button>
                </div>
            )}
            {/* =====================================================
                BREADCRUMB
            ====================================================== */}
            <Breadcrumb
                title="Contact Us"
                image={contact.src}
                items={[
                    {
                        label: "Contact Us",
                    },
                ]}
            />


            {/* =====================================================
                CONTACT INQUIRY SECTION
            ====================================================== */}
            <section className="contact-inquiry-section">

                <div className="contact-page-container">

                    <div className="contact-inquiry-grid">


                        {/* =================================================
                            LEFT VISUAL
                        ================================================== */}
                        <div
                            className="contact-visual"
                            data-aos="fade-right"
                            data-aos-duration="900"
                        >

                            <div className="contact-visual-inner">

                                <img
                                    src={contactMain.src}
                                    alt="Sanjay Sales"
                                    className="contact-visual-image"
                                />


                                <div className="contact-visual-overlay"></div>


                                {/* RED EDGE */}
                                <span className="contact-visual-edge"></span>


                                {/* CONTENT OVER IMAGE */}
                                <div className="contact-visual-content">

                                    <span className="contact-visual-kicker">
                                        Let's Connect
                                    </span>

                                    <h2>
                                        We're Here
                                        <span>
                                            To Help You.
                                        </span>
                                    </h2>

                                    <p>
                                        Whether you have a product inquiry,
                                        need technical support or want to
                                        discuss a custom solution, our team
                                        is always ready to assist you.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            RIGHT FORM
                        ================================================== */}
                        <div
                            className="contact-form-panel"
                            data-aos="fade-left"
                            data-aos-duration="900"
                        >

                            {/* TOP DECORATION */}
                            <span className="contact-form-top-line"></span>


                            <div className="contact-form-heading">

                                <span className="contact-page-kicker">
                                    <i className="fa-solid fa-paper-plane"></i>

                                    Send Us A Message
                                </span>


                                <h2>
                                    Inquire
                                    <span>
                                        Now
                                    </span>
                                </h2>


                                <p>
                                    Fill out the form and our team will
                                    get back to you as soon as possible.
                                </p>

                            </div>


                            <form className="contact-form" onSubmit={handleInquiry} noValidate>


                                {/* NAME */}
                                <div className="contact-form-field">

                                    <span className="contact-form-icon">
                                        <i className="fa-solid fa-user"></i>
                                    </span>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        required
                                        aria-invalid={Boolean(fieldErrors.name)}
                                        aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                                        onChange={() => clearFieldError("name")}
                                    />

                                    <span className="contact-required">
                                        *
                                    </span>

                                </div>
                                {fieldErrors.name && (
                                    <span id="contact-name-error" className={styles.fieldError} role="alert">{fieldErrors.name}</span>
                                )}


                                {/* MOBILE */}
                                <div className="contact-form-field">

                                    <span className="contact-form-icon">
                                        <i className="fa-solid fa-phone"></i>
                                    </span>

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Mobile Number"
                                        maxLength={10}
                                        required
                                        aria-invalid={Boolean(fieldErrors.phone)}
                                        aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
                                        onChange={() => clearFieldError("phone")}
                                    />

                                    <span className="contact-required">
                                        *
                                    </span>

                                </div>
                                {fieldErrors.phone && (
                                    <span id="contact-phone-error" className={styles.fieldError} role="alert">{fieldErrors.phone}</span>
                                )}


                                {/* EMAIL */}
                                <div className="contact-form-field">

                                    <span className="contact-form-icon">
                                        <i className="fa-solid fa-envelope"></i>
                                    </span>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        required
                                        aria-invalid={Boolean(fieldErrors.email)}
                                        aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                                        onChange={() => clearFieldError("email")}
                                    />

                                    <span className="contact-required">
                                        *
                                    </span>

                                </div>
                                {fieldErrors.email && (
                                    <span id="contact-email-error" className={styles.fieldError} role="alert">{fieldErrors.email}</span>
                                )}


                                {/* MESSAGE */}
                                <div className="contact-form-field contact-form-message">

                                    <span className="contact-form-icon">
                                        <i className="fa-solid fa-message"></i>
                                    </span>

                                    <textarea
                                        name="message"
                                        rows={6}
                                        placeholder="Your Message"
                                        required
                                        aria-invalid={Boolean(fieldErrors.message)}
                                        aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                                        onChange={() => clearFieldError("message")}
                                    ></textarea>

                                    <span className="contact-required">
                                        *
                                    </span>

                                </div>
                                {fieldErrors.message && (
                                    <span id="contact-message-error" className={styles.fieldError} role="alert">{fieldErrors.message}</span>
                                )}


                                {/* SUBMIT */}
                                <button
                                    type="submit"
                                    className="contact-submit-btn"
                                    disabled={submitState === "sending"}
                                >

                                    <span>
                                        {submitState === "sending" ? "Submitting..." : "Submit Inquiry"}
                                    </span>

                                    <i className="bi bi-arrow-right"></i>

                                </button>


                            </form>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CONTACT INFORMATION
            ====================================================== */}
            <section className="contact-info-section">

                <div className="contact-page-container">


                    {/* HEADER */}
                    <div
                        className="contact-section-heading"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >

                        <span className="contact-page-kicker">

                            <i className="fa-solid fa-headset"></i>

                            Get In Touch

                        </span>


                        <h2>
                            Our Contact
                            <span>
                                Information
                            </span>
                        </h2>


                        <p>
                            We are here to assist you with product inquiries,
                            technical support and business collaborations.
                            Feel free to reach out through the details below.
                        </p>

                    </div>


                    {/* CARDS */}
                    <div className="contact-info-grid">


                        {/* ADDRESS */}
                        <div
                            className="contact-info-card"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <span className="contact-info-border"></span>
                            <span className="contact-info-top-line"></span>

                            <div className="contact-info-icon">

                                <i className="fa-solid fa-location-dot"></i>

                            </div>


                            <div className="contact-info-card-content">

                                <h3>
                                    Our Address
                                </h3>

                                <p>
                                    10, Mangal Estate, Nr, Chakudia Mahadev Temple, Rakhial, Ahmedabad - 380023.
                                </p>

                            </div>

                        </div>


                        {/* PHONE */}
                        <div
                            className="contact-info-card"
                            data-aos="fade-up"
                            data-aos-delay="180"
                        >
                            <span className="contact-info-border"></span>
                            <span className="contact-info-top-line"></span>
                            <div className="contact-info-icon">

                                <i className="fa-solid fa-phone"></i>

                            </div>


                            <div className="contact-info-card-content">

                                <h3>
                                    Call Us
                                </h3>

                                <a href="tel:+919825047028">
                                    +91 98250 47028
                                </a>

                                <a href="tel:+919374991103">
                                    +91 93749 91103
                                </a>

                            </div>

                        </div>


                        {/* EMAIL */}
                        <div
                            className="contact-info-card"
                            data-aos="fade-up"
                            data-aos-delay="260"
                        >
                            <span className="contact-info-border"></span>
                            <span className="contact-info-top-line"></span>
                            <div className="contact-info-icon">

                                <i className="fa-solid fa-envelope"></i>

                            </div>


                            <div className="contact-info-card-content">

                                <h3>
                                    Email Us
                                </h3>

                                <a href="mailto:san_shah120@yahoo.com">
                                    san_shah120@yahoo.com
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                LOCATION / MAP
            ====================================================== */}
            <section className="contact-location-section">

                <div className="contact-page-container">


                    {/* HEADING */}
                    <div
                        className="contact-location-heading"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >

                        <div>

                            <span className="contact-page-kicker">

                                <i className="fa-solid fa-location-crosshairs"></i>

                                Find Us

                            </span>


                            <h2>
                                Our
                                <span>
                                    Location
                                </span>
                            </h2>

                        </div>


                        <p>
                            Visit our office for product demonstrations,
                            technical discussions or any other assistance.
                            We look forward to welcoming you.
                        </p>

                    </div>


                    {/* MAP */}
                    <div
                        className="contact-map"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1371.019076657402!2d72.62329280576046!3d23.017584129043698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87000d11db21%3A0xc9dd6aeffb99f78c!2sSANJAY%20SALES!5e0!3m2!1sen!2sin!4v1793179690050!5m2!1sen!2sin"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Sanjay Sales Location"
                        ></iframe>
                    </div>
                </div>
            </section>
        </>
    );
}