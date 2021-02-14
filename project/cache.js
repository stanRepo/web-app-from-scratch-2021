import events from "./events.js";
// import endPoints from "./endPoints.js";
import templator from "./template.js";
import render from "./renderEngine.js";
import dataRefine from "./data.js";
let allLists = [];
let newCoin = {};
const localStorage = {
  init2: (endPoints) => {
    return window.localStorage;
    debugger;
  },
  init: (endPoints) => {
    let coinListTotal = [];
    endPoints.forEach(async (endPoint) => {
      const cache = window.localStorage.getItem(endPoint.query);

      // voor elke endpoint
      // zoek elke coin op in db
      // add nieuwe props / overschrijf
      // save in localStorage
      if (cache == null || undefined) {
        // No data has been stored to localStorage so far. So we do this now!
        let singleDataSet = await events.retrieveInitLists(endPoint);

        function objToArr(Obj) {
          let arr = Object.keys(Obj).map(function (key) {
            return Obj[key];
          });
          return arr;
        }
        switch (endPoint.query) {
          case "initList":
            allLists.unshift(objToArr(singleDataSet.Data));
            break;
          case "topListByMarketCapOverview":
            allLists.push(singleDataSet.Data);
            break;
          case "topListByVolume24Hrs":
            allLists.push(singleDataSet.Data);
            break;
        }
        // console.log(coinListTotal);

        const temp = allLists[0];
        // I want to create a list that hold as much information as possible about the coins that are selected.
        // I loop through the list to find the initList which holds information about all coins.

        if (
          endPoint.query !== "initList" &&
          window.localStorage.getItem("coinListTotal") // if current list is not initList or the list that holds the totals
        ) {
          console.log(`combining ${endPoint.query}`);

          temp.forEach((coin) => {
            for (let i = 1; i < allLists.length; i++) {
              allLists[i].forEach((coin2) => {
                if (!coin2.CoinInfo) {
                  console.log(`Data inconsistant, not caching this coin`);
                  console.log(coin2);
                  console.log(coin);
                } else {
                  if (coin.CoinInfo.FullName == coin2.CoinInfo.FullName) {
                    console.log(
                      `1.${coin.CoinInfo.FullName} 2.${coin2.CoinInfo.FullName}`
                    );
                    // console.log("found pair");
                    newCoin = { ...coin2.CoinInfo, ...coin.CoinInfo };
                    if (coin2.RAW && coin2.DISPLAY) {
                      newCoin.RAW = coin2.RAW;
                      newCoin.DISPLAY = coin2.DISPLAY;

                      // console.log("found RAW & DISPLAY");
                    }
                    coinListTotal.push(newCoin);
                    // /console.log(coinListTotal);
                  }
                }
              });
            }
          });
        } else {
        }
        if (endPoint.query === "initList") {
          const refinedList = dataRefine.refineInitList(
            singleDataSet.Data,
            endPoint.query
          );
          console.log(singleDataSet.Data);
          console.log(refinedList);
          window.localStorage.setItem(
            endPoint.query,
            JSON.stringify(refinedList)
          );
        }
        console.log(coinListTotal);
        window.localStorage.setItem(
          "coinListTotal",
          JSON.stringify(coinListTotal)
        );
        console.log("Stored merged coin list");
      } else {
        localStorage.renderMarketCapList(endPoint);
      }
      return cache;
    });
  },
  renderMarketCapList: (endPoint) => {
    console.log("running");

    const data = templator.createDataSetMarketCapOverview(
      window.localStorage.getItem("coinListTotal")
    ); // Get Data

    console.log(data);
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

    console.log(`Retrieved ${endPoint.query}. Data from Cache`);
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
