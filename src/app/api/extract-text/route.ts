import { NextRequest, NextResponse } from "next/server";

interface PdfParseResult {
  text: string;
  metadata: Record<string, unknown>;
  numpages: number;
  version: string;
  info: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request
    const { originalUrl } = await req.json();
    if (!originalUrl) {
      return NextResponse.json(
        { error: "No URL provided" }, 
        { status: 400 }
      );
    }

    // Encode URL properly
    const fileUrl = encodeURI(originalUrl);

    // Fetch PDF with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(fileUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF (HTTP ${response.status})`);
    }

    // Verify content type
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/pdf")) {
      throw new Error("URL does not point to a PDF file");
    }

    // Process PDF
    const pdfBuffer = await response.arrayBuffer();
    const { default: PdfParse } = await import('pdf-parse/lib/pdf-parse.js');
    const data = await PdfParse(pdfBuffer) as PdfParseResult;

    return NextResponse.json({
      text: data.text,
      metadata: data.metadata,
      numpages: data.numpages,
      info: data.info
    });

  } catch (error) {
    console.error("PDF processing error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process PDF" },
      { status: 500 }
    );
  }
}