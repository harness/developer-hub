import type { Context } from '@netlify/functions';

export default async (req: Request, context: Context): Promise<Response> => {
  const header = {
    'Access-Control-Allow-Origin': 'https://www.harness.io',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      status: 200,
      headers: header,
    });
  }

  if (req.method !== 'GET') {
    return new Response('Not Implemented', {
      status: 400,
      headers: header,
    });
  }
  let tokenEnv = process.env.COVEO_API_KEY;
  return new Response(
    JSON.stringify({
      token: tokenEnv,
      id: 'harnessproductionp9tivsqy',
    }),
    {
      status: 200,
      headers: header,
    }
  );
};
