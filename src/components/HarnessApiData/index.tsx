import React, { useEffect, useState } from "react";
import { getXChatbotKeyCookie } from "../Chatbot/helpers";

interface IHarnessApiData {
  query: string;
  accountIdentifier?: boolean;
  token?: boolean;
  fallback: string;
  parse?: string;
}
const HarnessApiData: React.FC<IHarnessApiData> = ({
  query,
  fallback,
  accountIdentifier,
  token,
  parse,
}) => {
  const cookie = getXChatbotKeyCookie();
  const [response, setResponse] = useState("");
  useEffect(() => {
    async function FetchData() {
      try {
        const response = await fetch("https://developer.harness.io/api/api_proxy", {
          method: "POST",
          body: JSON.stringify({
            ...(query.includes("app.harness.io")
              ? {
                  token: token ? cookie.token : null,
                  query:
                    query +
                    `?${
                      accountIdentifier ? `accountIdentifier=${cookie.id}` : ""
                    }`,
                }
              : { query }),
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
     

        const parsedData = parse
          ? parse.split(".").reduce((o, i) => o?.[i], data)
          : data;

    

        setResponse(parsedData);
      } catch (error) {
        console.log(error);
        setResponse(fallback);
      }
    }
    FetchData();
  }, [query, fallback, accountIdentifier, token, parse]);

  return <>{response}</>;
};

export default HarnessApiData;
