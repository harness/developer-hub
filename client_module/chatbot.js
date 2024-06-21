import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Chatbot from "@site/src/components/Chatbot/Chatbot";
import React from "react";
import { createRoot } from "react-dom/client";

const doYourCustomStuff = () => {
  const root = document.getElementById("__docusaurus");

  if (root) {
    const chatbotContainer = document.createElement("div");
    chatbotContainer.id = "chatbot-container";
    root.appendChild(chatbotContainer);

    const rootContainer = createRoot(chatbotContainer);
    rootContainer.render(<Chatbot />);
  }
};

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener("load", () => {
    let interval = setInterval(doYourCustomStuff, 500);
    setTimeout(() => {
      clearInterval(interval);
      interval = 0;
    }, 2000);
  });
}
