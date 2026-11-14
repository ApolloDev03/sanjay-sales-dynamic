import Link from "next/link";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import breadcrumb from "../../../public/assets/images/breadcrumb.webp";
import styles from "./thank-you.module.css";

export default function ThankYouPage() {
  return (
    <>
      <Breadcrumb title="Thank You" image={breadcrumb.src} items={[{ label: "Thank You" }]} />
      <section className={styles.section}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.topLine} aria-hidden="true" />
            <div className={styles.checkRing} aria-hidden="true">
              <i className="fa-solid fa-check" />
            </div>
            <div className={styles.kicker}>
              <i className="fa-solid fa-paper-plane" aria-hidden="true" /> Inquiry Received
            </div>
            <h1 className={styles.title}>Thank <span>You!</span></h1>
            <div className={styles.redLine} aria-hidden="true" />
            <p className={styles.lead}>Your inquiry has been submitted successfully.</p>
            <p className={styles.copy}>
              Thank you for contacting Sanjay Sales. Our team will review your message and get back to you as soon as possible.
            </p>
            <div className={styles.actions}>
              <Link href="/" className={styles.primary}>
                <i className="fa-solid fa-house" aria-hidden="true" /> Back to Home
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
              {/* <Link href="/products" className={styles.secondary}>
                Explore Products <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link> */}
            </div>
            <div className={styles.footerNote}>
              <i className="fa-solid fa-headset" aria-hidden="true" /> Need help? Call us at
              <a href="tel:+919825047028">+91 98250 47028</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}