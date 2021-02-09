import events from "./events.js";
import localStorage from "./cache.js";
import render from "./renderEngine.js";
import router from "./router.js";

const app = {
  start: () => {
    console.log("running app.js");
    router.init();
    // add event listener
    events.submitBtn();
    events.positionCalc();
    // activate localStorage
    // const cache = localStorage.init();
    // console.log(cache);
  },
};
app.start();
//export default app;
