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
  }

  render() {
    console.log(this);
    return {
      template: this.template,
      store: this.store,
      Api: this.Api,
    };
  }
  positionCalc = (() => {
    const positionCalc = document.querySelector("#positionCalc");
    positionCalc.addEventListener("keyup", (e) => {
      let coins = document.querySelectorAll(".coin");
      coins = Array.from(coins);
      coins.forEach((coin) => {
        let marketCap = document.querySelector(`#${coin.id}`).children[8]
          .innerText;

        if (marketCap !== "No max supply") {
          let position = marketCap / e.target.value;

          let positionEl = document.querySelector(`#${coin.id}`).children[7];
          positionEl.innerText = `€${position.toFixed(2).toString()}`;
        }
      });
    });
  })();
}
