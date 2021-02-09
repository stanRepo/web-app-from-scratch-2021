import events from "./events.js";
import endPoints from "./endPoints.js";
import templator from "./template.js";
import render from "./render.js";
const localStorage = {
  init: () => {
    endPoints.forEach((endPoint) => {
      const cache = window.localStorage.getItem(endPoint.query);

      if (cache == null || undefined) {
        // No data has been stored to localStorage so far. So we do this now!
        events.retrieveInitLists(endPoint);
      } else {
        if (endPoint.query === "topListByMarketCapOverview") {
          const data = templator.createDataSetMarketCapOverview(
            window.localStorage.getItem(endPoint.query)
          ); // Get Data

          // const otherData = templator.createDataSetMarketCapOverview(window.localStorage.getItem())

          data.forEach((coin, i) => {
            let element = document.querySelector(".data"); // select HTML Element to render
            let parentElement = document.querySelector("tbody"); // select parent
            let dataHMTLString = element.innerHTML.toString(); // Create Template
            const renderedElement = render.render(dataHMTLString, coin); // create next coin layout
            const newRowElement = document.createElement("tr"); // create new Row Element
            newRowElement.setAttribute("id", `data${i}`); // set a custom ID (unused atm)
            newRowElement.innerHTML = renderedElement; // set innerHTML to ne
            parentElement.insertAdjacentElement("beforeend", newRowElement); // add new element to parentElement
            newRowElement.classList.add(coin.Name, "coin");
          });
        }
        console.log(`Retrieved ${endPoint.query}. Data from Cache`);
      }
      return cache;
    });
  },
  storeInitList: (data, query) => {
    window.localStorage.setItem(query, JSON.stringify(data));
    console.log(`cached: ${query}`);
  },
  clear: () => {
    window.localStorage.clear();
  },
  retrieveSingleCoinData: (id) => {
    let list = window.localStorage.getItem("initList");
    console.log("running");
    if (list !== undefined || null) {
      return list;
    } else {
      // no list found in localStorage // throw error
      console.error("Could not Retrieve initList from windows.localStorage");
    }
  },
};

export default localStorage;
