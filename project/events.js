import Request from "./index.js";
import localStorage from "./cache.js";
import dataRefine from "./data.js";
import key from "./key.js";

/////////////////////// Add to seperate file during refatoring
const endPoints = {
  allCoinNames: "https://min-api.cryptocompare.com/data/all/coinlist", // when use also saves to localStorage

  singleCoin: "https://min-api.cryptocompare.com/data/pricemulti?", //fsyms=BTC,ETH&
  topListByMarketCapOverview:
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=80&tsym=EUR",
  subject: "fsyms=", // currencies seperated by commas followed by an ampersant (&)
  valuedIn: "tsyms=", //tsyms=USD,EUR,
};
///////////////////////
const events = {
  submitBtn: () => {
    const Btn = document.querySelector(".searchBtn");
    const input = document.querySelector(".inputTicker");
    Btn.addEventListener("click", () => {}); ////////////////////////////////////////!
  },

  dataArrived: (data) => {
    console.log(data);

    if (data.query === "initList") {
      // since the data is too large to store locally (api-response>localstorage size), I refine the data in data.js
      const refinedData = dataRefine.refineInitList(data);
      console.log(refinedData);
      localStorage.storeInitList(refinedData, data.query); // store in cache ->localStorage
      console.log(`${refinedData.query} - Ready for Templating`);
    }
    if (data.query === "topListByMarketCapOverview") {
      const refinedData = dataRefine.refineTopListByMarketCap(data);
      console.log(refinedData);
      localStorage.storeInitList(refinedData, data.query); // store in cache ->localStorage
      console.log(`${refinedData.query} - Ready for Templating`);
    }
  },
  init: () => {
    // fires on pageload.

    events.submitBtn();
    localStorage.init();
  },
  retrieveInitLists: () => {
    // API request for UIx
    const x = new Request(endPoints.allCoinNames, key, "initList");
    const y = new Request(
      endPoints.topListByMarketCapOverview,
      key,
      "topListByMarketCapOverview"
    );
  },
};

export default events;
