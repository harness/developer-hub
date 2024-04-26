import type { HandlerEvent, HandlerContext, Handler } from "@netlify/functions";
import cookie from "cookie";
interface Body {
  account_id: string;
  token: string;
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== "POST") {
    return {
      body: JSON.stringify({ message: "Not Implemented" }),
      statusCode: 501,
    };
  }
  if (!event.body) {
    return {
      body: JSON.stringify({ message: "Missing required fields" }),
      statusCode: 400,
    };
  }

  try {
    let body: Body = JSON.parse(event.body);

    if (!body.account_id || !body.token) {
      return {
        body: JSON.stringify({ message: "Missing required fields" }),
        statusCode: 400,
      };
    }

    console.log(body);
    const hour = 3600000;
    const twoWeeks = 14 * 24 * hour;

    const Cookie1 = cookie.serialize("account_id", body.account_id, {
      // secure: true,
      httpOnly: true,
      path: "/",
      maxAge: twoWeeks,
      sameSite: "none",
      // domain: "http://localhost:50837/",
    });
    const Cookie2 = cookie.serialize("token", body.token, {
      // secure: true,
      httpOnly: true,
      path: "/",
      maxAge: twoWeeks,
      sameSite: "none",
      // domain: "http://localhost:50837/",
    });
    return {
      body: JSON.stringify({ message: "Sucess" }),
      multiValueHeaders: {
        "Set-Cookie": [Cookie1, Cookie2],
      },
      statusCode: 200,
    };
  } catch (error) {
    return {
      body: JSON.stringify({ message: "Invalid JSON format" }),
      statusCode: 400,
    };
  }
};
