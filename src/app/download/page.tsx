
"use client";

import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";

import Breadcrumb from "@/app/components/common/Breadcrumb";
import catalogueBreadcrumb from "../../../public/assets/images/breadcrumb.webp";
import PdfPreview from "@/app/components/common/PdfPreview";

export default function CataloguePage() {

    const { data, loading, error } = useApi(
        () => api.catalogues(),
        []
    );

    // Get only PDF URL and title from API
    const catalogues = (data ?? [])
        .filter(
            (item) =>
                item.file_url &&
                item.file_type?.toLowerCase() === "pdf"
        )
        .map((item) => ({
            id: item.id,
            title: item.title,
            pdf: item.file_url,
        }));

    return (
        <>
            <Breadcrumb
                title="Download Catalogue"
                image={catalogueBreadcrumb.src}
                items={[
                    {
                        label: "Download Catalogue",
                    },
                ]}
            />

            <section className="ss-catalogue">

                <div className="ss-catalogue-container">

                    <div className="ss-catalogue-heading">

                        <span className="ss-catalogue-kicker">
                            <span className="ss-catalogue-kicker-line"></span>

                            <i className="fa-solid fa-book-open"></i>

                            DOWNLOAD CATALOGUE

                            <span className="ss-catalogue-kicker-line"></span>
                        </span>

                        <h1>
                            Explore Our
                            <span> Product Catalogue</span>
                        </h1>

                        <p>
                            Explore detailed product information and
                            discover the right welding, cutting and
                            industrial solutions for your requirements.
                        </p>

                        <span className="ss-catalogue-heading-line"></span>

                    </div>

                    <div className="ss-catalogue-grid">

                        {loading && (
                            <p>Loading catalogues...</p>
                        )}

                        {error && (
                            <p role="alert">{error}</p>
                        )}

                        {!loading &&
                            !error &&
                            catalogues.length === 0 && (
                                <p>No catalogues available.</p>
                            )}

                        {!loading &&
                            !error &&
                            catalogues.map((catalogue) => (

                                <a
                                    key={catalogue.id}
                                    href={catalogue.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ss-catalogue-card"
                                >

                                    <div className="ss-catalogue-image">

                                        {/* First page PDF preview */}
                                        <PdfPreview
                                            pdf={catalogue.pdf}
                                        />

                                        <span className="ss-catalogue-pdf-icon">
                                            <i className="fa-regular fa-file-pdf"></i>
                                        </span>

                                    </div>

                                    <div className="ss-catalogue-content">

                                        <h2>
                                            {catalogue.title}
                                        </h2>

                                        <span className="ss-catalogue-title-line"></span>

                                    </div>

                                </a>
                            ))}

                    </div>

                </div>

            </section>
        </>
    );
}
