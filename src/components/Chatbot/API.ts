export async function QueryChatbotAPI(
  query: string,
  id: string,
  token: string
) {
  const res = await fetch("https://developer.harness.io/api/chatbot_proxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token,
    },
    body: JSON.stringify({
      query: query,
      account_id: id,
    }),
  });

  const data = await res.json();

  if (!data.data) {
    return "Something went wrong!";
  }

  return data.data.response;
}
