import events from "./events.js";
import endPoints from "./endPoints.js";
import templator from "./template.js";
import render from "./render.js";
// import app from "./app.js";

const localStorage = {
  init: () => {
    endPoints.forEach((endPoint) => {
      const cache = window.localStorage.getItem(endPoint.query);

      if (cache == null || undefined) {
        // No data has been stored to localStorage so far. So we do this now!
        events.retrieveInitLists(endPoint);
      } else {
        if (endPoint.query === "topListByMarketCapOverview") {
          const data = templator.createDataSetMarketCapOverview(endPoint.query); // Get Data
          //console.log(data);
          // in elke coin kijken
          data.forEach((coin, i) => {
            let element = document.querySelectorAll(".data")[i]; // select HTML Element to render
            let parentElement = element.parentNode;
            console.log(parentElement);
            console.log(element);
            let dataHMTLString = element.innerHTML.toString(); // Create Template
            const renderedElement = render.render(dataHMTLString, coin); // create next coin layout
            const newRowElement = document.createElement("tr"); // create new Row Element
            newRowElement.innerHTML = renderedElement; // set innerHTML to ne
            console.log(dataHMTLString);
            console.log(renderedElement);
            element = element.insertAdjacentElement("beforeend", newRowElement);

            // element.insertAdjacentElement("before");
            // render.render(Tempplate(dataHMTLString), daco=ta)
            //console.log(coin);
            // const template = render.Template(coin.)
          });
          // events.bodyIsLoaded(data);
        }
        console.log(`Retrieved ${endPoint.query}. Data from Cache`);
      }
      return cache;
    });
  },
  storeInitList: (data, query) => {
    window.localStorage.setItem(query, JSON.stringify(data));
    console.log(`chached: ${query}`);
  },
};

export default localStorage;
