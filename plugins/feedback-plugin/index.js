module.exports = function (context) {
  return {
    name: "feedback-plugin",
    injectHtmlTags() {
      const { siteConfig } = context;
      const { baseUrl } = siteConfig;

      return {
        preBodyTags: [
          `
          <script>
            function Feedback() {
                 let myDiv = document.body
              let button = document.createElement('button');
             
                 myDiv.appendChild(button);;
              let span = document.createElement('span');
              let img = document.createElement('img');

              span.textContent = "Feedback";
              span.classList.add("feedback-span");
              button.appendChild(img);
              button.appendChild(span);

              img.src = \`${baseUrl}img/icon_feedback.svg\`;
              img.alt = "Feedback";
              img.width = "24";
              img.height = "24";

              button.classList.add("feedback");
              img.classList.add("feedback-img");

              button.addEventListener("click", handleClick);

              function handleClick() {
                try {
                  window._refinerQueue = window._refinerQueue || [];
                  function _refiner() {
                    _refinerQueue.push(arguments);
                  }
                  _refiner("setProject", "a61ea060-9e2a-11ec-b6a3-9d6ceaa4c99a");

                  (function () {
                    var a = document.createElement("script");
                    a.type = "text/javascript";
                    a.async = true;
                    a.src = "https://js.refiner.io/v001/client.js";
                    var b = document.getElementsByTagName("script")[0];
                    b.parentNode.insertBefore(a, b);
                  })();

                  _refiner("showForm", "9afbf970-3859-11ed-91de-cb8481e90a69", true);
                } catch (error) {
                  console.error(error);
                }
              }
            }

            document.addEventListener("DOMContentLoaded", function() {
              Feedback();
            });
          </script>
          `,
        ],
      };
    },
  };
};
