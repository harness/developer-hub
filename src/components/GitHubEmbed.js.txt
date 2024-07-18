import React, { useEffect, useState } from "react";
import CodeBlock from "@theme/CodeBlock";

let _client;
function getClient() {
  if (_client) {
    return _client;
  }

  const sdkDemoKey = "client-rfLvYGag3eyU0jYW5zcIJTQip7GXxSrhOFN69IGMjvq";
  const { StatsigClient, runStatsigAutoCapture, runStatsigSessionReplay } =
    window.Statsig;

  _client = new StatsigClient(sdkDemoKey, {
    userID: "",
  });

  runStatsigAutoCapture(_client);
  runStatsigSessionReplay(_client);

  _client.initializeAsync().catch((err) => console.error(err));

  return _client;
}

function logRender(url, language) {
  try {
    getClient().logEvent({
      eventName: "gh_embed_render",
      value: url.replace("https://raw.githubusercontent.com/statsig-io", ""),
      metadata: { language },
    });
  } catch (error) {
    // noop
  }
}

function logFailure(url, language, error) {
  try {
    getClient().logEvent({
      eventName: "gh_embed_error",
      value: url,
      metadata: { language, error },
    });
  } catch (error) {
    // noop
  }
}

function extractSnippet(input) {
  const parts = input.split("\n");
  const result = [];

  let isAdding = false;

  for (const line of parts) {
    if (line.includes("<snippet>")) {
      isAdding = true;
    } else if (line.includes("</snippet>")) {
      isAdding = false;
    } else if (isAdding) {
      result.push(line);
    }
  }

  return result.join("\n");
}

function runGateCheck() {
  try {
    return getClient().checkGate("partial_gate");
  } catch (error) {
    // noop
  }

  return false;
}

export default function GitHubEmbed({ url, language }) {
  const [content, setContent] = useState(null);

  runGateCheck();

  useEffect(() => {
    logRender(url, language);

    const fetchData = async () => {
      try {
        const start = Date.now();
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const minTime = 500;
        const data = await response.text();
        const remaining = Date.now() - start;
        if (remaining < minTime) {
          setTimeout(
            () => setContent(extractSnippet(data)),
            minTime - remaining
          );
        } else {
          setContent(extractSnippet(data));
        }
      } catch (error) {
        setContent(`// Failed to load example.\n// View on GitHub:\n// ${url}`);
        logFailure(url, language, error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div
      style={{
        maxHeight: content ? "1000px" : "200px",
        transition: "max-height 1s ease-out",
        overflow: "hidden",
      }}
    >
      {content == null && (
        <CodeBlock language={language ?? "typescript"}>
          <div style={{ textAlign: "center", padding: "50px 0px 50px 0px" }}>
            ...
          </div>
        </CodeBlock>
      )}
      {content != null && (
        <CodeBlock language={language ?? "typescript"}>{content}</CodeBlock>
      )}
    </div>
  );
}
