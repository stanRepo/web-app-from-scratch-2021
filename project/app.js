import dataRefine from "./data.js";
import localStorage from "./cache.js";
import events from "./events.js";
import render from "./render.js";

console.log(document);

// fires on pageload.

const app = {
  init: () => {
    // fires on pageload.
    // events.submitBtn();
    // localStorage.init();
  },
  APIRequestFullFilled: (err, data, query) => {
    if (err) {
      console.error(err);
      return;
      // stoppen op error
    }

    // verder met data
    console.log("xxxxxxxxxxxxxxxx");
    data = dataRefine.checkQuery(data, query);
    localStorage.storeInitList(data, query); // store in cache ->localStorage
  },
};
//app.init();

export default app;
