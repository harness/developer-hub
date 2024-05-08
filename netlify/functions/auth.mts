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

  return new Response(JSON.stringify("Success !"), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
    },
  });
};
