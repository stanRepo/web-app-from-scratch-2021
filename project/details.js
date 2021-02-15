import Page from "./page.js";

export default class Details extends Page {
  constructor(update, endPoints, id) {
    super(update, endPoints, id);
    this.id = id;
    this.endPoints = endPoints;
    // template = "details.html";
    // show info about specific coin
    // retrieve id
    // send to getSingleItem
    // retrieve info
    // combine new data with stored data
    // template new coin
    this.createUrl = (id) => {
      const url = this.endPoints.getSingle("BTC", "EUR");
      return url;
    };
    this.addNewNumbers = (singleCoin, combinedList) => {
      const finalData = [];
      // find matching coin
      // add new DISPLAY and RAW data
      combinedList.map((coin) => {});
      return;
    };
    this.clearVariableElements = () => {
      console.log(this);
      this.variableEl.forEach((el) => {
        this.renderer.clearEl(el);
        console.log("cleared");
      });
    };

    const data = async () => {
      const combinedList = this.store.stateGet("combinedList");
      combinedList.forEach((coin) => {
        if (coin.ticker === id) {
          console.log(coin);
          let finalList = this.template.createDataSetMarketCapOverview([coin]);
          console.log(finalList);
          this.renderer.renderTable(finalList);
          this.renderer.renderDetails(finalList);
        }
      });
      // const url = this.createUrl(id);
      // const res = await this.Api.fetch(url).then((data) => {
      //   data = this.addNewNumbers(data, combinedList);
      //   console.log(combinedList);
      //   // this.renderer.render([data]);
      // });
      // console.log(res);
    };
    this.clearVariableElements();
    data();
  }
}
