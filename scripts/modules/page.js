import Store from "./store.js";
import Templates from "./templates.js";
import API from "./api.js";
import Renderer from "./renderer.js";
import key from "./key.js";

export default class Page {
  constructor(update, endPoints) {
    this.store = new Store();
    this.template = new Templates(endPoints);
    this.Api = new API(this.endPoint, this.store);
    this.renderer = new Renderer();
    this.endPoints = endPoints;
    this.key = key;
    this.update = update;
    this.lists = [];
    this.variableEl = [
      document.querySelector("tbody"),
      document.querySelector(".extraInfoSection"),
    ];
    this.inputSearchQuery = () => {
      const el = document.querySelector(".inputTicker");
      const submitBtn = document.querySelector(".searchBtn");

      console.log(el);
      el.addEventListener("keyup", (e) => {
        console.log(el.value);
      });
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = `details/${el.value.toUpperCase()}`;
      });
    };
  }
  setLoader = () => {
    const el = document.querySelector(".loader");
    el.classList.remove("display-none");
  };
  hideLoader = () => {
    const el = document.querySelector(".loader");
    el.classList.add("display-none");
    console.log(this.store);
  };
  colorPricePercentage = () => {
    const elements = document.querySelectorAll(".percentageDeltaPrice");
    const main = document.querySelector("main");

    if (parseFloat(elements[0].innerText) < 0) {
      main.classList.add("setMoodRed");
    } else {
      main.classList.add("setMoodGreen");
    }

    elements.forEach((el) => {
      // console.log(el.innerText);
      if (parseFloat(el.innerText) < 0) {
        el.classList.add("redNumber");
        // el.classList.remove("redNumber");
      } else {
        // el.classList.remove("greenNumber");
        el.classList.add("greenNumber");
      }
    });
  };
  render() {
    console.log(this);
    return {
      template: this.template,
      store: this.store,
      Api: this.Api,
    };
  }
  setMarketSentiment = (sentiment, color) => {
    const el = document.querySelector("#marketSentiment");
    el.classList.add(color);
    el.innerHTML = sentiment;
  };
  switchMarketSentiment = (percentTotal) => {
    if (percentTotal < 0) {
      this.setMarketSentiment(
        `Timid && Negative: ${percentTotal}`,
        "redNumber"
      );
    }
    if (percentTotal > 0) {
      this.setMarketSentiment(
        `Timid && Positive: ${percentTotal}`,
        "greenNumber"
      );
    }
    if (percentTotal > 10) {
      this.setMarketSentiment(
        `Excessive & Positive: ${percentTotal}`,
        "greenNumber"
      );
    }
    if (percentTotal < -10) {
      this.setMarketSentiment(
        `Excessive & Negative: ${percentTotal}`,
        "redNumber"
      );
    }

    // switch (percentTotal) {
    //   case percentTotal > -10 && percentTotal < 0:
    //     this.setMarketSentiment(`Timid && Negative: ${percentTotal}`);
    //     console.log(percentTotal);
    //     break;
    //   case percentTotal < 10 && percentTotal > 0:
    //     this.setMarketSentiment(`Timid && Positive: ${percentTotal}`);
    //     console.log(percentTotal);
    //     break;
    //   case percentTotal > 0:
    //     this.setMarketSentiment(`Bullish && Positive${percentTotal}`);
    //     console.log(percentTotal);
    //     break;
    //   case percentTotal < 0:
    //     this.setMarketSentiment(`Bearish && Negative ${percentTotal}`);
    //     console.log(percentTotal);
    //     break;
    // }
  };
  setXValueAvarage = (shareOfTotalList) => {
    const headerEl = document.querySelector("#headerX");
    let total = 0;
    shareOfTotalList.forEach((coin) => {
      total += coin.share;
    });
    total = total / shareOfTotalList.length;
    headerEl.innerHTML = total.toFixed(3).toString();
  };
  calculateSentimentsCorrelation = () => {
    // const investment = form.querySelector("#investment");
    // console.log(investment.value.split("").length);
    const combinedList = this.store.stateGet("combinedList");
    let percentTotal = 0;
    let percentArr = [];
    combinedList.forEach((coin) => {
      const singlePercent = parseFloat(coin.DISPLAY.EUR.CHANGEPCT24HOUR);
      // console.log(
      //   `${percentTotal} + ${singlePercent}= ${percentTotal + singlePercent}`
      // );
      percentTotal += singlePercent;
      percentArr.push(singlePercent);
    });
    percentTotal = percentTotal.toFixed(2);
    this.switchMarketSentiment(percentTotal);
    let shareOfTotalList = [];
    combinedList.forEach((coin) => {
      const singlePercent = parseFloat(coin.DISPLAY.EUR.CHANGEPCT24HOUR);
      // console.log(percentTotal);
      const shareOfTotal = (singlePercent / percentTotal) * 100; //
      // console.log(`${coin.Name} = share of total ${shareOfTotal}`);
      // debugger;
      shareOfTotalList.push({
        Name: coin.Name,
        share: shareOfTotal,
      });
      // het totale aandeel % verandering van 1 coin  in de %verandering van alle coins /100 * investment.
    });
    this.setXValueAvarage(shareOfTotalList);

    shareOfTotalList.forEach((coin) => {
      // console.log(coin);
      const el = document.querySelector(`.coin${coin.Name}`);
      // console.log(el);
      el.innerHTML = `<h2>${coin.share.toFixed(2)}</h2>`;
      // debugger;
    });
  };
  positionCalc = (() => {
    // create position values as share of investment by %delta of last 24Hours
    const form = document.querySelector("#calculatePositionForm"); // select form
    form.addEventListener("input", (e) => {
      e.preventDefault();

      // const inputTicker = form.querySelector("#inputTicker");
    });

    // stel 10k. inspelen op dip of ath => waar moet het geld in verdeeld worden.
    // tel all sharedOfTotal op
    // x = bereken aandeel coin in sharedTotalALL
    // x* investment.value

    // leg 1000 in
    // als je naaste laatste 24 uur kijkt
    // =>prcentuele verandering prijs
    // alle % veranderingen optellen
    // const x = alleVerandering 3% 5% 10%
    //18% 5
    // 5/18*100
    // * investment
    // = waar hebben we het meeste verdiend?
  })();
}
