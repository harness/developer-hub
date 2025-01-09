import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

function EmbedFunction() {
  const urlParams = new URLSearchParams(window.location.search);
  const embed = urlParams.get("embed");
  if (Boolean(embed) === true) {
    const chatbotContainer = document.getElementById("chatbot-container");
    if (chatbotContainer) {
      chatbotContainer.style.display = "none";
    }
    const nav = document.querySelector("nav");
    if (nav) {
      nav.style.display = "none";
    }
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.style.display = "none";
    }
    const aside = document.querySelector("aside");
    if (aside) {
      aside.style.display = "none";
    }
    const toc = document.querySelector(".col--3");
    if (toc) {
      toc.style.display = "none";
    }
    const pagNav = document.querySelector(".pagination-nav");
    if (pagNav) {
      pagNav.style.display = "none";
    }

    const cookieConsent = document.querySelector(".ot-sdk-row");
    if (cookieConsent) {
      cookieConsent.style.display = "none";
    }
    const cookieOverlay = document.querySelector(".onetrust-pc-dark-filter");
    if (cookieOverlay) {
      cookieOverlay.style.display = "none";
    }
  }
}

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener("load", () => {
    let interval = setInterval(EmbedFunction, 50);
    setTimeout(() => {
      clearInterval(interval);
      interval = 0;
    }, 2000);
  });
}
