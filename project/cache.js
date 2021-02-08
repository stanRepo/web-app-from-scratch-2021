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
            let element = document.querySelectorAll(".data"); // select HTML Element to render
            console.log(i);
            console.log(element);
            console.log(document.querySelectorAll(".data")[0]);
            const templatingLayout = document.querySelectorAll(".data")[0];
            console.log(templatingLayout);
            let parentElement = document.querySelector("tbody"); // select parent
            let dataHMTLString = element[i].innerHTML.toString(); // Create Template
            const renderedElement = render.render(dataHMTLString, coin); // create next coin layout
            const newRowElement = document.createElement("tr"); // create new Row Element
            newRowElement.setAttribute("id", `data${i}`);
            console.log(parentElement);

            newRowElement.innerHTML = renderedElement; // set innerHTML to ne
            console.log(dataHMTLString);
            console.log(renderedElement);
            parentElement.insertAdjacentElement("beforeend", newRowElement);
            console.log(document.querySelectorAll(".data")[0].innerHTML);
            // element.insertAdjacentElement("before");
            // render.render(Tempplate(dataHMTLString), daco=ta)
            //console.log(coin);
            // const template = render.Template(coin.)
            console.log(element);
            console.log(parentElement.children[i]);
            element = parentElement.removeChild(parentElement.children[i]);
            parentElement.appendChild(templatingLayout);
            console.log(element);
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
