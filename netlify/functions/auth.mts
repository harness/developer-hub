import type { Context } from "@netlify/functions";
import cookie from "cookie";
interface Body {
  token: string;
  account_id: string;
  return_to: string;
}

export default async (req: Request, context: Context) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Not Implemented", {
      status: 400,
    });
  }
  const body: Body = await req.json();
  console.log(body);
  if (!body.account_id || !body.token || !body.return_to) {
    return new Response(JSON.stringify("Missing required fields "), {
      status: 400,
    });
  }
  console.log({
    account_id: body.account_id,
    token: body.token,
    return_to: body.return_to,
  });

  context.cookies.set({
    name: "account",
    value: body.account_id,
    domain: "http://localhost:8888/",
    sameSite: "None",
    maxAge: 3600000 * 24 * 14,
    httpOnly: true,
    path: "/",
  });
  context.cookies.set({
    name: "token",
    value: body.token,
    domain: "http://localhost:8888/",
    sameSite: "None",
    maxAge: 3600000 * 24 * 14,
    httpOnly: true,
    path: "/",
  });
  return new Response("Success !", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
    },
  });
};
