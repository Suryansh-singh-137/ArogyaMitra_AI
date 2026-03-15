import { NextRequest, NextResponse } from "next/server";
import { analyzeReport } from "@/lib/ai";
import type { Language } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mediaType, language } = (await req.json()) as {
      imageBase64: string;
      mediaType: string;
      language: Language;
    };

    if (!imageBase64 || !mediaType) {
      return NextResponse.json({ error: "Image required" }, { status: 400 });
    }

    // Claude Sonnet via OpenRouter supports vision natively
    const explanation = await analyzeReport(imageBase64, mediaType, language);
    return NextResponse.json({ explanation });
  } catch (err) {
    console.error("Report analysis error:", err);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
