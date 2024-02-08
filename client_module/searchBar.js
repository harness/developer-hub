import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const doYourCustomStuff = () => {
  const navbar__items = document.querySelector(".navbar__items");
  const navbar__sidebar__close = document.querySelector(
    ".navbar-sidebar__close"
  );

  const searchButton = document.createElement("i");
  searchButton.setAttribute("id", "search-button");
  searchButton.setAttribute("class", "fa-solid fa-magnifying-glass");

  if (navbar__items) {
    navbar__items.appendChild(searchButton);

    searchButton.addEventListener("click", () => {
      const navbar = document.querySelector(".navbar");
      const navbar__sidebar = document.querySelector(".navbar-sidebar");

      if (navbar && navbar__sidebar) {
        navbar.classList.add("navbar-sidebar--show");
        navbar__sidebar.classList.add("navbar-sidebar--show");
      }
    });
  }
  if (navbar__sidebar__close) {
    navbar__sidebar__close.addEventListener("click", () => {
      const navbar = document.querySelector(".navbar");
      const navbar__sidebar = document.querySelector(".navbar-sidebar");

      if (navbar && navbar__sidebar) {
        navbar.classList.remove("navbar-sidebar--show");
        navbar__sidebar.classList.remove("navbar-sidebar--show");
      }
    });
  }
};

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener("load", () => {
    setInterval(doYourCustomStuff, 500);
  });
}
