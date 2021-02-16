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
        // /console.log("cleared");
      });
    };
    // get all lists
    // this function will fetch data => refine for storage => save to localstorage => call templator
    this.getItem = async () => {
      // state >= XDATE?1000seconden: getNewData:getLocally
      // wait for all lists to be retrieved
      const today = new Date();
      const timeStamp = today.getTime();
      const savedTime = this.store.stateGet("freshTimeStamp"); // milliseconds
      console.log(savedTime);

      if (!savedTime || timeStamp - savedTime > 30000) {
        console.log("Retrieving new Data");
        try {
          let res = await Promise.all(
            endPoints.initialLists.map((e, i) => {
              const x = this.Api.fetch(e);
              return x;
            })
          )
            .then((res) => {
              console.log(res);
              this.store.stateCreate(`freshTimeStamp`, timeStamp);
              console.log("calling Combiner");
              const combinedList = this.template.combineLists(res);
              this.store.stateCreate("combinedList", combinedList);
              // call renderer

              let finalList = this.template.createDataSetMarketCapOverview(
                combinedList
              );

              // console.log(finalList);
              this.renderer.renderTable(finalList);
            })
            .then(() => {
              this.calculateSentimentsCorrelation();
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("Old Data Retrieved");
        const combinedList = this.store.stateGet("combinedList");
        // call renderer
        let finalList = this.template.createDataSetMarketCapOverview(
          combinedList
        );

        // console.log(finalList);
        this.renderer.renderTable(finalList);
        this.calculateSentimentsCorrelation();
      }
    };
    // this.inputSearchQuery();
    this.clearVariableElements();
    this.setLoader();
    this.getItem().then((res) => {
      this.hideLoader();
      this.colorPricePercentage();
    });
  }
}
