import Templates from "./templates.js";
import Page from "./page.js";

export default class Index extends Page {
  template = new Templates();
  constructor(update, endPoints) {
    super(update, endPoints);
    this.lists = [];
    this.endPoints = endPoints;
    this.clearVariableElements = () => {
      console.log(this);
      this.variableEl.forEach((el) => {
        this.renderer.clearEl(el);
        console.log("cleared");
      });
    };
    // get all lists
    // this function will fetch data => refine for storage => save to localstorage => call templator
    this.getItem = async () => {
      // wait for all lists to be retrieved
      try {
        let res = await Promise.all(
          endPoints.initialLists.map((e, i) => {
            const x = this.Api.fetch(e);
            return x;
          })
        ).then((res) => {
          console.log("calling Combiner");
          const combinedList = this.template.combineLists(res);
          this.store.stateCreate("combinedList", combinedList);
          // call renderer

          let finalList = this.template.createDataSetMarketCapOverview(
            combinedList
          );

          console.log(finalList);
          this.renderer.renderTable(finalList);
        });
      } catch (err) {
        console.log(err);
      }
    };
    this.clearVariableElements();
    this.getItem().then((res) => {});
  }
}
