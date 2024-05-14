import type { Context } from "@netlify/functions";

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
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "http://localhost:3001",
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

  if (!body.account_id || !body.token || !body.return_to) {
    return new Response(JSON.stringify("Missing required fields "), {
      status: 400,
    });
  }

  console.log(context.site.url);

  context.cookies.set({
    name: "token",
    value: body.token,
    domain: "developer.harness.io",
    path: "/",
    httpOnly: true,
    secure: true,
  });
  context.cookies.set({
    name: "account_id",
    value: body.account_id,
    domain: "developer.harness.io",
    path: "/",
    httpOnly: true,
    secure: true,
  });

  return new Response(JSON.stringify("Success !"), {
    status: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "http://localhost:3001",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
    },
  });
};
