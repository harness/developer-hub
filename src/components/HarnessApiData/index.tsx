import React, { useEffect, useState } from "react";
import { getXChatbotKeyCookie } from "../Chatbot/helpers";
import BrowserOnly from "@docusaurus/BrowserOnly";

interface IHarnessApiData {
  query: string;
  accountIdentifier?: boolean;
  token?: boolean;
  fallback: string;
  parse: string;
}

const HarnessApiData: React.FC<IHarnessApiData> = ({
  query,
  fallback,
  accountIdentifier,
  token,
  parse,
}) => {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const cookie = getXChatbotKeyCookie();
        const [response, setResponse] = useState("");

        useEffect(() => {
          async function FetchData() {
            try {
              const fetchResponse = await fetch(
                "https://developer.harness.io/api/api_proxy",
                {
                  method: "POST",
                  body: JSON.stringify({
                    ...(query.includes("app.harness.io")
                      ? {
                          token: token ? cookie?.token : null,
                          parse,
                          query:
                            query +
                            `?${
                              accountIdentifier
                                ? `accountIdentifier=${cookie?.id}`
                                : ""
                            }`,
                        }
                      : { query, parse }),
                  }),
                }
              );
              if (!fetchResponse.ok) {
                throw new Error(`HTTP error! status: ${fetchResponse.status}`);
              }

              const data = await fetchResponse.json();
             
              setResponse(JSON.stringify(data));
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
