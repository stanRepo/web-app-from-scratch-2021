import Request from "./api.js";
import key from "./key.js";
import localStorage from "./cache.js";
const events = {
  submitBtn: () => {
    const Btn = document.querySelector(".searchBtn");
    const input = document.querySelector(".inputTicker");
    const clearBtn = document.querySelector("#clearCache");
    clearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      console.log("cache cleared");
    });
    Btn.addEventListener("click", () => {}); ////////////////////////////////////////!
  },
  retrieveInitLists: (endPoint) => {
    const requestAPI = new Request(endPoint.url, endPoint.query, key);
    console.log(requestAPI);
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
