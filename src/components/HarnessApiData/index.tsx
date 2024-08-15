import React, { useEffect, useState } from "react";
import { getXChatbotKeyCookie } from "../Chatbot/helpers";
import BrowserOnly from "@docusaurus/BrowserOnly";

interface IHarnessApiData {
  query: string;
  accountIdentifier?: boolean;
  token?: boolean;
  fallback: string;
  parse?: string;
  listPosition?: number;
}
const HarnessApiData: React.FC<IHarnessApiData> = ({
  query,
  fallback,
  accountIdentifier,
  token,
  parse,
  listPosition = -1,
}) => {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const cookie = getXChatbotKeyCookie();
        const [response, setResponse] = useState("");
        useEffect(() => {
          async function FetchData() {
            try {
              const response = await fetch(
                "http://localhost:8888/api/api_proxy",
                {
                  method: "POST",
                  body: JSON.stringify({
                    ...(query.includes("app.harness.io")
                      ? {
                          token: token ? cookie.token : null,
                          query:
                            query +
                            `?${
                              accountIdentifier
                                ? `accountIdentifier=${cookie.id}`
                                : ""
                            }`,
                        }
                      : { query }),
                  }),
                }
              );
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();

              // Handle arrays and get specific item based on listPosition
              let parsedData = data;
              if (Array.isArray(parsedData)) {
                if (listPosition === -1) {
                  parsedData = parsedData[parsedData.length - 1]; // Last item
                } else if (listPosition < parsedData.length) {
                  parsedData = parsedData[listPosition];
                } else {
                  parsedData = fallback; // If listPosition is out of bounds
                }
              }

              setResponse(parsedData);
            } catch (error) {
              console.log(error);
              setResponse(fallback);
            }
          }
          FetchData();
        }, [query, fallback, accountIdentifier, token, parse]);

        return <>{response}</>;
      }}
    </BrowserOnly>
  );
};

export default HarnessApiData;
