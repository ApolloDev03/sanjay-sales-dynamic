
"use client";

import { useEffect, useRef } from "react";

type PdfPreviewProps = {
  pdf: string;
};

export default function PdfPreview({
  pdf,
}: PdfPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    let renderTask: {
      promise: Promise<void>;
      cancel: () => void;
    } | null = null;

    let loadingTask: {
      destroy: () => Promise<void>;
    } | null = null;

    const renderPdf = async () => {
      try {
        if (!pdf || !canvasRef.current) return;

        const pdfjsLib = await import("pdfjs-dist");

        if (cancelled) return;

        // Load PDF.js worker locally
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "/pdf.worker.min.mjs?v=5.4.624";

        const task = pdfjsLib.getDocument({
          url: pdf,
          withCredentials: false,
          disableRange: true,
          disableStream: true,
        });

        loadingTask = task;

        const pdfDocument = await task.promise;

        if (cancelled) return;

        // Render first PDF page
        const page = await pdfDocument.getPage(1);

        if (cancelled) return;

        const canvas = canvasRef.current;

        if (!canvas) return;

        const context = canvas.getContext("2d");

        if (!context) return;

        const viewport = page.getViewport({
          scale: 1.5,
        });

        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);

        renderTask = page.render({
          canvas,
          canvasContext: context,
          viewport,
        });

        await renderTask.promise;

        if (cancelled) return;

        console.log("PDF preview loaded:", pdf);

      } catch (error: unknown) {
        if (
          error instanceof Error &&
          error.name === "RenderingCancelledException"
        ) {
          return;
        }

        if (!cancelled) {
          console.error("PDF Preview Error:", error);
        }
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
      renderTask?.cancel();
      if (loadingTask) {
        void loadingTask.destroy();
      }
    };
  }, [pdf]);

  return (
    <canvas
      ref={canvasRef}
      className="ss-catalogue-pdf-preview"
    />
  );
}
