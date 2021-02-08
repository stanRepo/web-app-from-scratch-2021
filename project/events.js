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
  bodyIsLoaded: (data) => {
    const e = document.querySelector("body");

    console.log(data);

    e.addEventListener("load", (e) => {
      console.log("EVENT FIIRED");
      data.forEach((coin) => {
        console.log(coin.CoinInfo.FullName);
      });
    });
  },
};

export default events;
