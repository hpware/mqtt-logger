import sql from "@/components/pg";
import { NextRequest } from "next/server";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};
export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const limit = parseInt(params.get("limit") ?? "100");
  const offset = parseInt(params.get("offset") ?? "0");
  const topic = params.get("topic") || "";
  if (isNaN(limit) || isNaN(offset)) {
    return new Response("Params incorrect.", {
      status: 400,
    });
  }
  const decodedTopic = decodeURIComponent(topic)
    .replaceAll(/%2F/gi, "/")
    .replaceAll(/%20/g, " ");
  if (!/^[a-zA-Z0-9\/\-_#+]+$/.test(decodedTopic)) {
    return new Response("Params incorrect.", {
      status: 400,
    });
  }
  try {
    const requestSQL = await sql`
      SELECT * FROM mqtt_data
      WHERE topic = ${decodedTopic}
      ORDER BY created_at DESC
      LIMIT ${String(limit)}
      OFFSET ${String(offset)}`;
    return new Response(JSON.stringify(requestSQL), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response("500 Server side error", { status: 500 });
  }
};
