import Request from "./api.js";
import localStorage from "./cache.js";
import key from "./key.js";
import endPoints from "./endPoints.js";
import render from "./render.js";
events.init();
const events = {
  submitBtn: () => {
    const Btn = document.querySelector(".searchBtn");
    const input = document.querySelector(".inputTicker");
    Btn.addEventListener("click", () => {}); ////////////////////////////////////////!
  },
  init: () => {
    // fires on pageload.

    events.submitBtn();
    localStorage.init();
  },
  retrieveInitLists: () => {
    // API request for UI
    const requestAllCoins = new Request(
      endPoints.allCoinNames,
      key,
      "initList"
    );
    const requestTopListByMarketCap = new Request(
      endPoints.topListByMarketCapOverview,
      key,
      "topListByMarketCapOverview"
    );
    // render landing overview.
    render(requestTopListByMarketCap);

    const topListByVolume24Hrs = new Request(
      endPoints.topListByVolume24Hrs,
      key,
      "topListByVolume24Hrs"
    );
  },
};

export default events;
