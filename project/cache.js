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
        console.log(`Retrieved ${endPoint.query}. Data from Cache`);
      }
    });
  },
  storeInitList: (data, query) => {
    window.localStorage.setItem(query, JSON.stringify(data));
    console.log(`chached: ${query}`);
  },
  getItem: (dataPropertyName) => {
    const localData = localStorage.getItem("initList");
    const result = localData.filter((dataPropertyName, i) => {
      dataPropertyName === localData;
    });
    console.log(result);
  },
};

export default localStorage;
