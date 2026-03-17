import { NextRequest, NextResponse } from "next/server";
import { callOpenRouterFirstAid } from "@/lib/ai";
import type { Language } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { emergency?: string; language?: Language };
    const emergency = body.emergency?.trim();
    const language = body.language || "hi";
    if (!emergency) {
      return NextResponse.json({ error: "Emergency required" }, { status: 400 });
    }
    const steps = await callOpenRouterFirstAid({ emergency, language });
    return NextResponse.json({ steps });
  } catch (err) {
    console.error("First aid error:", err);
    return NextResponse.json({ error: "First aid failed" }, { status: 500 });
  }
}

