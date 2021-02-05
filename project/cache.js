import events from "./events.js";

const localStorage = {
  init: (query) => {
    //query undefined
    const cache = window.localStorage.getItem(query);
    console.log(window.localStorage.getItem(query));
    if (cache === undefined || null) {
      // No data has been stored to localStorage so far. So we do this now!

      events.retrieveInitLists();
    } else {
      console.log("retrieve data from cache");
      const data = window.localStorage.getItem(query);
    }
  },
  storeInitList: (data, query) => {
    window.localStorage.setItem(query, JSON.stringify(data));
    console.log(`chached: ${query}`);
  },
};

export default localStorage;
