import { NextResponse } from "next/server";
import { getAIResponse } from "@/lib/ai-chat";

export async function POST(req: Request) {
  try {
    const { message } = await req.json(); // Extract message from request
    if (!message) return NextResponse.json({ error: "Message is required" }, { status: 400 });

    // Get AI response
    const aiReply = await getAIResponse(message);

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}