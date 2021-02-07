import events from "./events.js";
import localStorage from "./cache.js";
(function () {
  // add event listener
  events.submitBtn();
  // activate localStorage
  localStorage.init();
  console.log("running app.js");
})();
