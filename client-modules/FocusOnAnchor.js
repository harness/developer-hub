import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const FocusOnAnchor = () => {
  const currentURL = window.location.href;
  const url = new URL(currentURL);
  const target = url.hash.slice(1);
  if (url.hash) {
    const headingsInsideDiv = document.querySelectorAll("h1, h2, h3 ,h4");
    const changedTarget = target
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase()
      .replace(/\u200B/g, "")
      .trim();
    for (let i = 0; i < headingsInsideDiv.length; i++) {
      const changedHeading = headingsInsideDiv[i].id
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase()
        .replace(/\u200B/g, "")
        .trim();
      if (changedHeading == changedTarget) {
        headingsInsideDiv[i].scrollIntoView();
      }
    }
  }
};

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener("popstate", FocusOnAnchor);
  window.onload = () => {
    FocusOnAnchor();
  };
}
