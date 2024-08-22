import React, { useEffect, useState } from "react";
import { getXChatbotKeyCookie } from "../Chatbot/helpers";
import BrowserOnly from "@docusaurus/BrowserOnly";

interface IHarnessApiData {
  query: string;
  accountIdentifier?: boolean;
  token?: boolean;
  fallback: string;
  showLatest?: boolean;  // Add a showLatest prop
  parse?: (data: any) => any;  // Add a parse function prop
}

const HarnessApiData: React.FC<IHarnessApiData> = ({
  query,
  fallback,
  accountIdentifier,
  token,
  showLatest = false, // Default to true, returning the latest item
  parse, // Receive the parse function
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

              // Check if data is an array or list and return the last item
              let parsedData = data;
              if (showLatest && Array.isArray(data)) {
                parsedData = data[data.length - 1];
              }

              // Use the parse function if provided
              parsedData = parse ? parse(parsedData) : parsedData;

              setResponse(parsedData);
            } catch (error) {
              console.log(error);
              setResponse(fallback);
            }
          }
          FetchData();
        }, [query, fallback, accountIdentifier, token, showLatest, parse]);

        return <>{response}</>;
      }}
    </BrowserOnly>
  );
};

export default HarnessApiData;