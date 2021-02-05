import events from "./events.js";

const localStorage = {
  init: (query) => {
    //query undefined?

    if (!window.localStorage.getItem(query)) {
      // console.log(window.localStorage.getItem(query));

      // No data has been stored to localStorage so far. So we do this now!
      events.retrieveInitLists();
    } else {
      // Data was stored previously and we will retrieve it.
      const data = window.localStorage.getItem(query);
      // console.log(JSON.parse(data));
    }
  },
  storeInitList: (data, query) => {
    // console.log(data);
    // console.log(query);
    window.localStorage.setItem(query, JSON.stringify(data));
    console.log(`stored: ${query}`);
  },
};

export default localStorage;
