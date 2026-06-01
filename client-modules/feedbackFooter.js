import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function loadRefiner() {
  if (window._refinerLoaded) {
    return;
  }
  window._refinerLoaded = true;
  window._refinerQueue = window._refinerQueue || [];

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://js.refiner.io/v001/client.js';

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
}

function refiner() {
  window._refinerQueue.push(arguments);
}

function mountFeedbackButton() {
  const feedback = document.getElementsByClassName('feedback');
  if (feedback[0]) {
    return;
  }

  const footer = document.getElementsByClassName('theme-doc-footer docusaurus-mt-lg')[0];
  if (!footer) {
    return;
  }

  const wrapperSpan = document.createElement('span');
  wrapperSpan.classList.add('tool');
  wrapperSpan.setAttribute('hover-tooltip', 'Leave feedback to help us improve');
  wrapperSpan.setAttribute('tooltip-position', 'bottom');

  const button = document.createElement('button');
  const span = document.createElement('span');
  const img = document.createElement('img');

  span.textContent = 'Feedback';
  span.classList.add('feedback-span');

  wrapperSpan.appendChild(button);
  button.appendChild(img);
  button.appendChild(span);

  img.src = '/img/icon_feedback.svg';
  img.alt = 'Feedback';
  img.width = 24;
  img.height = 24;

  button.classList.add('feedback');
  img.classList.add('feedback-img');

  button.addEventListener('click', () => {
    refiner('setProject', 'a61ea060-9e2a-11ec-b6a3-9d6ceaa4c99a');
    refiner('showForm', '9afbf970-3859-11ed-91de-cb8481e90a69', true);
    refiner('addToResponse', { currentUrl: window.location.href });
  });

  footer.appendChild(wrapperSpan);
}

function initFeedbackFooter() {
  if (!ExecutionEnvironment.canUseDOM || window.__hdhFeedbackFooterInit) {
    return;
  }
  window.__hdhFeedbackFooterInit = true;

  loadRefiner();

  let previousUrl = '';
  const observer = new MutationObserver(() => {
    if (!previousUrl) {
      setTimeout(mountFeedbackButton, 2000);
    }
    if (location.href !== previousUrl) {
      previousUrl = location.href;
      mountFeedbackButton();
    }
  });

  observer.observe(document, { subtree: true, childList: true });
}

initFeedbackFooter();
