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

export function formatDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const now = new Date();

  const month = months[now.getMonth()];
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${month} ${day}, ${formattedHours}:${formattedMinutes}${ampm}`;
}

export const getXChatbotKeyCookie = () => {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const xChatbotKeyCookie = cookies.find((cookie) =>
    cookie.startsWith("x_chatbot_key=")
  );
  const accountIdCookie = cookies.find((cookie) =>
    cookie.startsWith("account_id=")
  );
  const nameCookie = cookies.find((cookie) => cookie.startsWith("name="));

  if (xChatbotKeyCookie && accountIdCookie) {
    const [, token] = xChatbotKeyCookie.split("=");
    const [, id] = accountIdCookie.split("=");
    const [, name] = nameCookie.split("=");

    return { token, id, name };
  }
  return null;
};

export function deleteCookie(name: string) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
