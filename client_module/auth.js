import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

function AuthFunction() {
  const signInBtn = document.querySelector("#signInBtn");
  if (signInBtn) {
    const parent = signInBtn.parentNode;
    const grandParent = parent.parentNode;
    if (!parent || !grandParent) {
      return;
    }

    grandParent.href = `https://app.harness.io/sso.html?action=login&src=developerhub&return_to=${window.location.href}&timestamp=1`;
  }
}
if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener("load", () => {
    setInterval(AuthFunction, 500);
  });
}
