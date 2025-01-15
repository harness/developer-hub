import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Chatbot from "@site/src/components/Chatbot/Chatbot";
import React from "react";
import { createRoot } from "react-dom/client";

const AppendChatbotToPage = () => {
  const root = document.getElementById("__docusaurus");

  if (root) {
    if (!document.getElementById("chatbot-container")) {
      const chatbotContainer = document.createElement("div");
      chatbotContainer.id = "chatbot-container";
      root.appendChild(chatbotContainer);

      const rootContainer = createRoot(chatbotContainer);
      rootContainer.render(<Chatbot />);
    }
  }
};

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener("load", () => {
    let interval = setInterval(AppendChatbotToPage, 500);
    setTimeout(() => {
      clearInterval(interval);
      interval = 0;
    }, 2000);
  });
}
