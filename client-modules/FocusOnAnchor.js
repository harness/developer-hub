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

    const element = document.getElementsByTagName("details");
    if (element.length > 0) {
      for (let i = 0; i < element.length; i++) {
        const divElement = element[i].querySelector("div");
        const headingsInsideDiv = divElement.querySelectorAll(
          "h1, h2, h3 ,h4 , h5"
        );
        element[i].setAttribute("data-collapsed", "false");
        element[i].setAttribute("open", "true");
        for (let i = 0; i < headingsInsideDiv.length; i++) {
          const changedHeading = headingsInsideDiv[i].id
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()
            .replace(/\u200B/g, "")
            .trim();
          const changedTarget = target
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()
            .replace(/\u200B/g, "")
            .trim();
          if (changedHeading == changedTarget) {
            divElement.style.display = "block";
            divElement.style.overflow = "visible";
            divElement.style.height = "auto";
            divElement.style.willChange = "height";
            divElement.style.transition = "height 8043ms ease-in-out 0s";
            headingsInsideDiv[i].scrollIntoView();
          }
        }
      }
    }
  }
};

window.addEventListener("load", () => {
  setTimeout(FocusOnAnchor, 1000); // Adjust the delay as needed
});
