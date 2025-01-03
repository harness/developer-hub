import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const doYourCustomStuff = () => {
  const navbar__items = document.querySelector('.navbar__items');
  const navbar__sidebar__close = document.querySelector(
    '.navbar-sidebar__close'
  );
  const navbar__inner = document.querySelector('.navbar__inner');

  const searchBoxMain = navbar__inner.querySelector('#coveo-search-main');

  if (searchBoxMain) {
    searchBoxMain.classList.add('main-nav-coveo');
  }

  const searchButton = document.createElement('i');
  searchButton.setAttribute('id', 'search-button');
  searchButton.setAttribute('class', 'fa-solid fa-magnifying-glass');

  if (navbar__items) {
    navbar__items.appendChild(searchButton);
    if (window.location.pathname !== '/') {
      const navbar__toggle = document.querySelectorAll('.navbar__toggle');
      if (navbar__toggle) {
        navbar__toggle[0].addEventListener('click', () => {
          const navbar__sidebar__items = document.querySelectorAll(
            '.navbar-sidebar__items'
          );
          if (navbar__sidebar__items[0]) {
            navbar__sidebar__items[0].classList.add(
              'navbar-sidebar__items--show-secondary'
            );
          }
        });
      }
    }

    searchButton.addEventListener('click', () => {
      const navbar = document.querySelector('.navbar');
      const navbar__sidebar = document.querySelector('.navbar-sidebar');

      if (navbar && navbar__sidebar) {
        navbar.classList.add('navbar-sidebar--show');
        navbar__sidebar.classList.add('navbar-sidebar--show');
      }

      const navbar__sidebar__items = document.querySelectorAll(
        '.navbar-sidebar__items'
      );
      if (navbar__sidebar__items[0]) {
        navbar__sidebar__items[0].classList.remove(
          'navbar-sidebar__items--show-secondary'
        );
      }
    });
  }
  if (navbar__sidebar__close) {
    navbar__sidebar__close.addEventListener('click', () => {
      const navbar = document.querySelector('.navbar');
      const navbar__sidebar = document.querySelector('.navbar-sidebar');

      if (navbar && navbar__sidebar) {
        navbar.classList.remove('navbar-sidebar--show');
        navbar__sidebar.classList.remove('navbar-sidebar--show');
      }
    });
  }
};

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener('load', () => {
    let interval = setInterval(doYourCustomStuff, 500);
    setTimeout(() => {
      clearInterval(interval);
      interval = 0;
    }, 2000);
  });
}
