import { NextResponse } from "next/server";
import { UpdateCredits } from "@/lib/actions";

export async function POST(request: Request) {
  const { credits } = await request.json();
  const response = await UpdateCredits(credits);
  return NextResponse.json(response);
}
