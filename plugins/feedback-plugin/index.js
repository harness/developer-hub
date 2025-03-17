export default function (context) {
  return {
    name: 'feedback-plugin',
    injectHtmlTags() {
      return {
        postBodyTags: [
          `
            <script>
              function Feedback() {  
              (function loadRefiner() {
                  if (window._refinerLoaded) return; // Prevent multiple loads
                  window._refinerLoaded = true;
                
                  // Initialize Refiner queue before script loads
                  window._refinerQueue = window._refinerQueue || [];
                
                  const script = document.createElement("script");
                  script.type = "text/javascript";
                  script.async = true;
                  script.src = "https://js.refiner.io/v001/client.js";
                
                  const firstScript = document.getElementsByTagName("script")[0];
                  firstScript.parentNode.insertBefore(script, firstScript);
                })();
                function _refiner() {
                  _refinerQueue.push(arguments)
                }
                const feedback = document.getElementsByClassName("feedback");
                if (feedback[0]) return;
  
                const footer = document.getElementsByClassName("theme-doc-footer docusaurus-mt-lg")[0];
                if (!footer) return;
  
                // Create wrapper span
                let wrapperSpan = document.createElement("span");
                wrapperSpan.classList.add("tool");
                wrapperSpan.setAttribute("hover-tooltip", "Leave feedback to help us improve");
                wrapperSpan.setAttribute("tooltip-position", "bottom");
  
                // Create button
                let button = document.createElement("button");
                let span = document.createElement("span");
                let img = document.createElement("img");
  
                span.textContent = "Feedback";
                span.classList.add("feedback-span");
  
                // Append elements
                wrapperSpan.appendChild(button);
                button.appendChild(img);
                button.appendChild(span);
  
                // Set image properties
                img.src = \`/img/icon_feedback.svg\`;
                img.alt = "Feedback";
                img.width = "24";
                img.height = "24";
  
                // Add classes
                button.classList.add("feedback");
                img.classList.add("feedback-img");
  
                // Handle button click
                const handleClick = () => {
                  _refiner("setProject", "a61ea060-9e2a-11ec-b6a3-9d6ceaa4c99a");
                  _refiner("showForm", "9afbf970-3859-11ed-91de-cb8481e90a69", true);
                  _refiner("addToResponse", { currentUrl: window.location.href });
                };
  
                footer.appendChild(wrapperSpan);
                button.addEventListener("click", handleClick);
              }
  
              let previousUrl = "";
              const observer = new MutationObserver(() => {
                if (!previousUrl) {
                  setTimeout(Feedback, 2000);
                }
                if (location.href !== previousUrl) {
                  previousUrl = location.href;
                  Feedback();
                }
              });
  
              observer.observe(document, { subtree: true, childList: true });
            </script>
            `,
        ],
      };
    },
  };
}
