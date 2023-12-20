module.exports = function () {
  return {
    name: "scarf-plugin",
    injectHtmlTags() {
         return {
           postBodyTags: [
             ` <img referrerpolicy="no-referrer-when-downgrade" src="https://static.scarf.sh/a.png?x-pxid=09d1a2e3-ac98-42ec-aef4-f9fad03d2382" style="display: none;" /> `,
           ],
         };
    },
  };
};
