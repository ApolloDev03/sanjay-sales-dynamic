"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";

import Breadcrumb from "@/app/components/common/Breadcrumb";
import galleryBreadcrumb from "../../../public/assets/images/breadcrumb.webp";
// import gallery1 from '/assets/images/gallery/gallery-1.webp'


type GalleryImage = {
    src: string;
    alt: string;
    title: string;
};


type GalleryVideo = {
    title: string;
    youtubeUrl: string;
};


const galleryImages: GalleryImage[] = [
    {
        src: "/assets/images/gallery/gallery-1.webp",
        alt: "Sanjay Sales Industrial Facility",
        title: "Industrial Facility",
    },
    {
        src: "/assets/images/gallery/gallery-2.webp",
        alt: "Industrial Cutting Process",
        title: "Industrial Cutting Process",
    },
    {
        src: "/assets/images/gallery/gallery-3.webp",
        alt: "Industrial Machine Setup",
        title: "Machine Setup",
    },
    {
        src: "/assets/images/gallery/gallery-4.webp",
        alt: "Industrial Components",
        title: "Industrial Components",
    },
    {
        src: "/assets/images/gallery/gallery-5.webp",
        alt: "Industrial Workshop",
        title: "Industrial Workshop",
    },
    {
        src: "/assets/images/gallery/gallery-6.webp",
        alt: "Metal Products",
        title: "Metal Products",
    },
    {
        src: "/assets/images/gallery/gallery-7.webp",
        alt: "Welding Machines",
        title: "Welding Machines",
    },
    {
        src: "/assets/images/gallery/gallery-8.webp",
        alt: "Industrial Equipment",
        title: "Industrial Equipment",
    },
    {
        src: "/assets/images/gallery/gallery-1.webp",
        alt: "Industrial Products",
        title: "Industrial Products",
    },
];


const galleryVideos: GalleryVideo[] = [

    {
        title: "Company Overview",
        youtubeUrl:
            "https://www.youtube.com/embed/xVaYt6u-XNc?si=P3JSvtz_SWJ3OAfV",
    },

    {
        title: "Manufacturing Process",
        youtubeUrl:
            "https://www.youtube.com/embed/xVaYt6u-XNc?si=P3JSvtz_SWJ3OAfV",
    },

    {
        title: "Product Showcase",
        youtubeUrl:
            "https://www.youtube.com/embed/xVaYt6u-XNc?si=P3JSvtz_SWJ3OAfV",
    },

];


export default function GalleryPage() {
    const {data: photos, loading: photosLoading, error: photosError} = useApi(() => api.gallery(), []);
    const {data: videos, loading: videosLoading, error: videosError} = useApi(() => api.videos(), []);
    const galleryImages = (photos || []).map(i => ({src:i.image_url,alt:i.title,title:i.title}));
    const galleryVideos = (videos || []).map(v => ({title:v.title,youtubeUrl:v.embed_url || v.youtube_url}));

    const [activeTab, setActiveTab] =
        useState<"photo" | "video">("photo");


    const [activeImage, setActiveImage] =
        useState<number | null>(null);



    /* =========================================================
       OPEN IMAGE
    ========================================================= */

    const openImage = (index: number) => {

        setActiveImage(index);

    };



    /* =========================================================
       CLOSE IMAGE
    ========================================================= */

    const closeImage = () => {

        setActiveImage(null);

    };



    /* =========================================================
       NEXT IMAGE
    ========================================================= */

    const showNextImage = () => {

        if (activeImage === null) {
            return;
        }


        setActiveImage(
            (activeImage + 1)
            % galleryImages.length
        );

    };



    /* =========================================================
       PREVIOUS IMAGE
    ========================================================= */

    const showPreviousImage = () => {

        if (activeImage === null) {
            return;
        }


        setActiveImage(
            (
                activeImage
                - 1
                + galleryImages.length
            )
            % galleryImages.length
        );

    };



    /* =========================================================
       KEYBOARD CONTROLS
    ========================================================= */

    useEffect(() => {

        const handleKeyDown = (
            event: KeyboardEvent
        ) => {

            if (activeImage === null) {
                return;
            }


            if (event.key === "Escape") {

                closeImage();

            }


            if (event.key === "ArrowRight") {

                showNextImage();

            }


            if (event.key === "ArrowLeft") {

                showPreviousImage();

            }

        };


        document.addEventListener(
            "keydown",
            handleKeyDown
        );


        return () => {

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [activeImage]);



    /* =========================================================
       BODY SCROLL LOCK
    ========================================================= */

    useEffect(() => {

        if (activeImage !== null) {

            document.body.style.overflow =
                "hidden";

        } else {

            document.body.style.overflow =
                "";

        }


        return () => {

            document.body.style.overflow =
                "";

        };

    }, [activeImage]);



    return (

        <>

            {/* =====================================================
                BREADCRUMB
            ====================================================== */}

            <Breadcrumb

                title="Gallery"

                image={
                    galleryBreadcrumb.src
                }

                items={[
                    {
                        label: "Gallery",
                    },
                ]}

            />



            {/* =====================================================
                GALLERY SECTION
            ====================================================== */}

            <section className="gallery-page-section">


                <div className="gallery-page-container">


                    {/* =================================================
                        HEADING
                    ================================================== */}

                    <div
                        className="gallery-page-heading"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >

                        <span className="gallery-page-kicker">

                            <i className="fa-solid fa-images"></i>

                            Our Media

                        </span>


                        <h2>

                            Gal

                            <span>
                                lery
                            </span>

                        </h2>


                        <p>

                            Explore our photo and video gallery to get
                            a closer look at our infrastructure,
                            products, events and milestones.

                        </p>

                    </div>



                    {/* =================================================
                        TABS
                    ================================================== */}

                    <div
                        className="gallery-tabs"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="800"
                    >


                        {/* PHOTO TAB */}

                        <button

                            type="button"

                            className={
                                `gallery-tab ${activeTab === "photo"
                                    ? "active"
                                    : ""
                                }`
                            }

                            onClick={() =>
                                setActiveTab("photo")
                            }

                        >

                            <i className="fa-solid fa-image"></i>

                            <span>
                                Photo Gallery
                            </span>

                        </button>



                        {/* VIDEO TAB */}

                        <button

                            type="button"

                            className={
                                `gallery-tab ${activeTab === "video"
                                    ? "active"
                                    : ""
                                }`
                            }

                            onClick={() =>
                                setActiveTab("video")
                            }
                        >
                            <i className="fa-solid fa-circle-play"></i>
                            <span>
                                Video Gallery
                            </span>
                        </button>
                    </div>

                    {/* =================================================
                        PHOTO GALLERY
                    ================================================== */}

                    {
                        activeTab === "photo" && (

                            <div className="gallery-photo-grid">

                                {
                                    galleryImages.map(
                                        (
                                            image,
                                            index
                                        ) => (

                                            <div
                                                className="gallery-photo-item"
                                                key={`${image.src}-${index}`}
                                                data-aos="fade-up"
                                                data-aos-delay={
                                                    (index % 3) * 70
                                                }
                                                data-aos-duration="700"
                                            >

                                                <button
                                                    type="button"
                                                    className="gallery-photo-card"
                                                    onClick={() =>
                                                        openImage(index)
                                                    }
                                                >

                                                    <img
                                                        src={image.src}
                                                        alt={image.alt}
                                                    />

                                                    <span className="gallery-photo-overlay"></span>

                                                    <span className="gallery-photo-corner"></span>

                                                    <span className="gallery-photo-icon">

                                                        <i className="fa-solid fa-expand"></i>

                                                    </span>

                                                </button>


                                                <div className="gallery-photo-content">

                                                    <h3>
                                                        {image.title}
                                                    </h3>

                                                    <span></span>

                                                </div>

                                            </div>

                                        )
                                    )
                                }

                            </div>

                        )
                    }

                    {/* =================================================
                        VIDEO GALLERY
                        DIRECT YOUTUBE VIDEO
                        NO POPUP
                    ================================================== */}

                    {
                        activeTab === "video"
                        && (

                            <div className="gallery-video-grid">


                                {
                                    galleryVideos.map(
                                        (
                                            video,
                                            index
                                        ) => (

                                            <div

                                                className="gallery-video-card"

                                                key={
                                                    video.title
                                                }

                                                data-aos="fade-up"

                                                data-aos-delay={
                                                    index * 90
                                                }

                                                data-aos-duration="750"

                                            >


                                                <div className="gallery-video-frame-card">


                                                    <iframe

                                                        src={
                                                            video.youtubeUrl
                                                        }

                                                        title={
                                                            video.title
                                                        }

                                                        loading="lazy"

                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

                                                        referrerPolicy="strict-origin-when-cross-origin"

                                                        allowFullScreen

                                                    ></iframe>


                                                </div>



                                                <div className="gallery-video-content">


                                                    <h3>

                                                        {
                                                            video.title
                                                        }

                                                    </h3>


                                                    <span></span>


                                                </div>


                                            </div>

                                        )
                                    )
                                }


                            </div>

                        )
                    }


                </div>


            </section>



            {/* =====================================================
                PHOTO LIGHTBOX ONLY
            ====================================================== */}

            {
                activeImage !== null
                && (

                    <div

                        className="gallery-lightbox"

                        onClick={
                            closeImage
                        }

                    >


                        <div

                            className="gallery-lightbox-panel"

                            onClick={(
                                event
                            ) => {

                                event.stopPropagation();

                            }}

                        >


                            {/* =========================================
                                COUNT
                            ========================================== */}

                            <span className="gallery-lightbox-count">


                                {
                                    String(
                                        activeImage
                                        + 1
                                    )
                                        .padStart(
                                            2,
                                            "0"
                                        )
                                }


                                <span>
                                    /
                                </span>


                                {
                                    String(
                                        galleryImages.length
                                    )
                                        .padStart(
                                            2,
                                            "0"
                                        )
                                }


                            </span>



                            {/* =========================================
                                CLOSE
                            ========================================== */}

                            <button

                                type="button"

                                className="gallery-lightbox-close"

                                onClick={
                                    closeImage
                                }

                                aria-label="Close Gallery"

                            >

                                <i className="fa-solid fa-xmark"></i>

                            </button>



                            {/* =========================================
                                MAIN IMAGE
                            ========================================== */}

                            <div className="gallery-lightbox-image">


                                <img

                                    src={
                                        galleryImages[
                                            activeImage
                                        ].src
                                    }

                                    alt={
                                        galleryImages[
                                            activeImage
                                        ].alt
                                    }

                                />



                                {/* PREVIOUS */}

                                <button

                                    type="button"

                                    className="gallery-lightbox-arrow gallery-lightbox-prev"

                                    onClick={
                                        showPreviousImage
                                    }

                                    aria-label="Previous Image"

                                >

                                    <i className="bi bi-arrow-left"></i>

                                </button>



                                {/* NEXT */}

                                <button

                                    type="button"

                                    className="gallery-lightbox-arrow gallery-lightbox-next"

                                    onClick={
                                        showNextImage
                                    }

                                    aria-label="Next Image"

                                >

                                    <i className="bi bi-arrow-right"></i>

                                </button>


                            </div>



                            {/* =========================================
                                THUMBNAILS
                            ========================================== */}

                            <div className="gallery-lightbox-thumbnails">


                                {
                                    galleryImages.map(
                                        (
                                            image,
                                            index
                                        ) => (

                                            <button

                                                type="button"

                                                key={`thumb-${image.src}-${index}`}

                                                className={
                                                    `gallery-lightbox-thumb ${index
                                                        === activeImage
                                                        ? "active"
                                                        : ""
                                                    }`
                                                }

                                                onClick={() =>
                                                    setActiveImage(
                                                        index
                                                    )
                                                }

                                                aria-label={
                                                    `Open image ${index + 1
                                                    }`
                                                }

                                            >


                                                <img

                                                    src={
                                                        image.src
                                                    }

                                                    alt=""

                                                />


                                            </button>

                                        )
                                    )
                                }


                            </div>


                        </div>


                    </div>

                )
            }

        </>

    );

}