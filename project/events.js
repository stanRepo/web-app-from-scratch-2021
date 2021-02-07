import Request from "./api.js";
import localStorage from "./cache.js";
import dataRefine from "./data.js";
import key from "./key.js";
import endPoints from "./endPoints.js";

const events = {
  submitBtn: () => {
    const Btn = document.querySelector(".searchBtn");
    const input = document.querySelector(".inputTicker");
    Btn.addEventListener("click", () => {}); ////////////////////////////////////////!
  },
  init: () => {
    events.submitBtn();
    localStorage.init();
  },
  retrieveInitLists: (endPoint) => {
    const requestAPI = new Request(endPoint.url, endPoint.query, key);
  },
};

export default events;
