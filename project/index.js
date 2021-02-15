import Templates from "./templates.js";
import Page from "./page.js";

export default class Index extends Page {
  template = new Templates();
  constructor(update, endPoints) {
    super(update, endPoints);
    this.lists = [];
    this.endPoints = endPoints;

    // get all lists
    // this function will fetch data => refine for storage => save to localstorage => call templator
    this.getItem = async () => {
      // /  console.log(endPoints);
      // wait for all lists to be retrieved
      try {
        let res = await Promise.all(
          endPoints.initialLists.map((e, i) => {
            // console.log(e);
            const x = this.Api.fetch(e);
            return x;
          })
        ).then((res) => {
          // console.log(res);
          console.log("calling templater");
          const combinedList = this.template.combineLists(res);
          // call renderer
          // console.log(combinedList);

          let finalList = this.template.createDataSetMarketCapOverview(
            combinedList
          );
          finalList = finalList.sort((a, b) => b.MarketCapRAW - a.MarketCapRAW); // for descending sort
          finalList = finalList.map((coin, i) => {
            coin.listNumber = i + 1;
            return coin;
          });
          console.log(finalList);
          this.renderer.render(finalList);
        });
      } catch (err) {
        console.log(err);
      }
    };

    this.getItem().then((res) => {
      // console.log(this.store.stateRead.length);
    });
  }
}
