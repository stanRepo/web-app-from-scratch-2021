import Request from "./api.js";
import key from "./key.js";

const events = {
  submitBtn: () => {
    const Btn = document.querySelector(".searchBtn");
    const input = document.querySelector(".inputTicker");
    Btn.addEventListener("click", () => {}); ////////////////////////////////////////!
  },
  retrieveInitLists: (endPoint) => {
    const requestAPI = new Request(endPoint.url, endPoint.query, key);
  },
};

export default events;
