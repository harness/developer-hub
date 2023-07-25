import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const OpenDetailTab = () => {
  const currentURL = window.location.href;
  const url = new URL(currentURL);
  if (url.hash) {
    const element = document.getElementsByTagName("details");
    for (let i = 0; i < element.length; i++) {
      element[i].setAttribute("data-collapsed", "false");

      const divElement = element[i].querySelector("div");
      divElement.style.display = "block";
      divElement.style.overflow = "visible";
      divElement.style.height = "auto";
      divElement.style.willChange = "height";
      divElement.style.transition = "height 8043ms ease-in-out 0s";
    }
  }
};

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener("popstate", OpenDetailTab);
}
