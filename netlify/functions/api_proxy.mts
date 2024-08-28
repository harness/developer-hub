import type { Context } from "@netlify/functions";
interface Body {
  query: string;
  token?: string;
  parse: string;
}
const jq = require("node-jq");
export default async (req: Request, context: Context) => {
  // context.cookies.set({
  //   name: "account_id",
  //   value: "JPCeP2ujSwqNcwD7WhYeBw",
  //   domain: "localhost",
  //   path: "/",
  //   httpOnly: false,
  //   secure: true,
  //   sameSite: "None",
  // });
  // context.cookies.set({
  //   name: "x_chatbot_key",
  //   value:
  //     "pat.h",
  //   domain: "localhost",
  //   path: "/",
  //   httpOnly: false,
  //   secure: true,
  //   sameSite: "None",
  // });
  // context.cookies.set({
  //   name: "name",
  //   value: "Rohan-Maharjan",
  //   domain: "localhost",
  //   path: "/",
  //   httpOnly: false,
  //   secure: true,
  //   sameSite: "None",
  // });

  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: {
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
  if (!body.query || !body.parse) {
    return new Response(JSON.stringify({ error: "Please send all fields" }), {
      status: 400,
    });
  }
  try {
    const response = await fetch(body.query, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": body.token,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response Text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const jqResponse = await jq.run(body.parse, responseData, {
      input: "json",
      output: "json",
    });

    return new Response(JSON.stringify(jqResponse), {
      status: 200,
      headers: {
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
