// import type { Context } from "@netlify/functions";
// import cookie from "cookie";
// interface Body {
//   token: string;
//   account_id: string;
//   return_to: string;
// }
// export default async (req: Request, context: Context) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", {
//       status: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "POST,OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type,Authorization",
//       },
//     });
//   }

//   if (req.method !== "POST") {
//     return new Response("Not Implemented", {
//       status: 400,
//     });
//   }
//   const body: Body = await req.json();
//   console.log(body);
//   if (!body.account_id || !body.token || !body.return_to) {
//     return new Response(JSON.stringify("Missing required fields "), {
//       status: 400,
//     });
//   }

//   console.log({
//     account_id: body.account_id,
//     token: body.token,
//     return_to: body.return_to,
//     recieved: "recieber",
//   });

//   const hour = 3600000;
//   const twoWeeks = 14 * 24 * hour;

//   const Cookie1 = cookie.serialize("account_id", body.account_id, {
//     // secure: true,
//     httpOnly: true,
//     path: "/",
//     maxAge: twoWeeks,
//     sameSite: "none",
//     // domain: "http://localhost:50837/",
//   });
//   const Cookie2 = cookie.serialize("token", body.token, {
//     // secure: true,
//     httpOnly: true,
//     path: "/",
//     maxAge: twoWeeks,
//     sameSite: "none",
//     // domain: "http://localhost:50837/",
//   });

//   return new Response(JSON.stringify("Success !"), {
//     status: 200,

//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "POST,OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type,Authorization",
//       "Set-Cookie": Cookie1,

//       //   "Set-Cookie": Cookie2,
//     },
//   });
// };
