import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { originalUrl } = body;
    const fileUrl = encodeURI(originalUrl);

    // Fetch the PDF
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`Failed to fetch PDF (${response.status})`);
    
    // Verify content type
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/pdf")) {
      throw new Error("URL does not point to a PDF file");
    }

    // Get the buffer
    const pdfBuffer = await response.arrayBuffer();

    // Isolate the pdf-parse import
    const parsePdf = async (buffer: ArrayBuffer) => {
      // Use dynamic import with explicit path
      const { default: PdfParse } = await import('pdf-parse/lib/pdf-parse.js');
      return PdfParse(buffer);
    };

    // Process the PDF
    const { text, metadata, numpages } = await parsePdf(pdfBuffer);
    
    return NextResponse.json({ text, metadata, numpages });

  } catch (error) {
    console.error("PDF processing error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process PDF" },
      { status: 500 }
    );
  }
}