// app/api/video/route.ts (App Router)
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

  return NextResponse.redirect(url); // Redirects to YouTube embed
}
