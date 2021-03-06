import store from "./store.js";
import Templates from "./templates.js";

export default class API {
  constructor(endPoints, store) {
    this.store = store;
    this.template = new Templates();
    this.data = [];
  }

  fetch = (endPoint) => {
    return new Promise((resolve, reject) => {
      const data = fetch(`${endPoint.url}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.data = {
            data: data.Data || data,
            query: endPoint.query,
          };
          try {
            this.store.stateCreate(endPoint.query, data.Data);
          } catch {
            console.log("listerror, refining"); // 1 list is too big to store locally right now. So I use .map() to Filter it

            const refinedData = this.template.mapInitList(
              data.Data,
              endPoint.query
            );

            if (refinedData) {
              this.data = {
                data: refinedData,
                query: endPoint.query,
              };
              this.store.stateCreate(endPoint.query, this.data);
              console.log("data refined");
            } else {
              data.query = endPoint.query;
              console.log("All Lists Retrieved And Stored");
            }
          }

          resolve(this.data);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };
  fetchEndPoints = async (endPoints) => {};
}
