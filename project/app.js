import events from "./events.js";
import localStorage from "./cache.js";
(function () {
  events.submitBtn();
  localStorage.init();
  console.log("running app.js");
})();
