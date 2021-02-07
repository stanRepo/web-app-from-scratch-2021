import events from "./events.js";
import endPoints from "./endPoints.js";

const localStorage = {
  init: () => {
    endPoints.forEach((endPoint) => {
      const cache = window.localStorage.getItem(endPoint.query);
      if (cache == null || undefined) {
        // No data has been stored to localStorage so far. So we do this now!
        events.retrieveInitLists(endPoint);
      } else {
        console.log("retrieve data from cache");
      }
    });
  },
  storeInitList: (data, query) => {
    window.localStorage.setItem(query, JSON.stringify(data));
    console.log(`chached: ${query}`);
  },
};

export default localStorage;
