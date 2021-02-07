import events from "./events.js";
import localStorage from "./cache.js";
import render from "./render.js";

(function () {
  console.log("running app.js");
  // add event listener
  events.submitBtn();
  // activate localStorage
  localStorage.init();
  render.test();
})();
