/**
 * Extracts plain text from a PDF File object directly in the browser.
 * This turns a 2MB binary PDF upload into a ~2KB text payload,
 * making upload virtually instantaneous even on slow mobile/choked internet connections.
 */
export async function extractPdfText(file) {
  if (typeof window === "undefined") return null;

  try {
    // Dynamically load pdfjs in the browser only
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf");

    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version || "3.11.174"}/pdf.worker.min.js`;
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
    const doc = await loadingTask.promise;

    let fullText = "";
    const maxPages = Math.min(doc.numPages, 10);

    for (let i = 1; i <= maxPages; i++) {
      const page = await doc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      fullText += pageText + "\n";
    }

    const cleaned = fullText.trim();
    if (cleaned.length > 30) {
      return cleaned;
    }
    return null;
  } catch (err) {
    console.warn("⚠️ Client-side PDF text extraction skipped, falling back to server extraction:", err);
    return null;
  }
}
