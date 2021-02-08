import events from "./events.js";
import localStorage from "./cache.js";
import render from "./render.js";
import createTemplate from "./render.js";

const app = {
  start: () => {
    console.log("running app.js");
    // add event listener
    events.submitBtn();
    // activate localStorage
    const cache = localStorage.init();
    console.log(cache);
  },
};
app.start();
//export default app;
