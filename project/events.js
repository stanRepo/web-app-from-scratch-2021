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
  positionCalc: () => {
    const positionCalc = document.querySelector("#positionCalc");
    positionCalc.addEventListener("keyup", (e) => {
      let coins = document.querySelectorAll(".coin");
      coins = Array.from(coins);
      coins.forEach((coin) => {
        // let marketCap = document.querySelector(`#${coin.id}:nth-child(4)`);
        let marketCap = document.querySelector(`#${coin.id}`).children[8]
          .innerText;
        //console.log(marketCap);
        // console.log(position);
        // marketCap = marketCap.querySelector(".marketCap");
        // console.log(marketCap);
        // debugger;
        //  console.log(typeof marketCap);
        if (marketCap !== "No max supply") {
          // console.log(`${coin} = number`);
          let position = marketCap / e.target.value;
          //console.log(position);
          let positionEl = document.querySelector(`#${coin.id}`).children[7];
          positionEl.innerText = `€${position.toFixed(2).toString()}`;

          // if (position <= 100000000) {
          //   console.log("input is good");
          // } else {
          //   position = "inputValue is too high";
          //   console.error("inputValue is too high");
          // }
        }
      });
    });
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
