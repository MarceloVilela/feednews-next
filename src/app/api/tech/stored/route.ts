import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url).searchParams.get("url");
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_TECH_URL}/technews/post/origin?page=1&url=${url}`,
    );
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}
