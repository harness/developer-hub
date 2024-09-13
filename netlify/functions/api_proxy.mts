import type { Context } from "@netlify/functions";
import jq from "jq-web";

interface Body {
  query: string;
  token?: string;
  parse: string;
}
export default async (req: Request, context: Context): Promise<Response> => {
  // context.cookies.set({
  //   name: "account_id",
  //   value: "JPw",
  //   domain: "localhost",
  //   path: "/",
  //   httpOnly: false,
  //   secure: true,
  //   sameSite: "None",
  // });
  // context.cookies.set({
  //   name: "x_chatbot_key",
  //   value:
  //     "pat.",
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
  const header = {
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: header,
    });
  }

  if (req.method !== "POST") {
    return new Response("Not Implemented", {
      status: 400,
      headers: header,
    });
  }

  const body: Body = await req.json();
  if (!body.query || !body.parse) {
    return new Response(JSON.stringify({ error: "Please send all fields" }), {
      status: 400,
      headers: header,
    });
  }

  try {
    const response = await fetch(body.query, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": body.token || "",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response Text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    const jqResponse = jq.json(responseData, body.parse);
    return new Response(JSON.stringify(jqResponse), {
      status: 200,
      headers: header,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: header,
      }
    );
  }
};
