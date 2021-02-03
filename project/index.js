//

import events from "./events.js";
class Request {
  constructor(endPoint, Key, query) {
    // query should be formatted as BTC,ETH,ADA,AGI etc
    this.query = query;
    this.endPoint = endPoint;
    this.query = query;
    this.Key = Key;
    console.log("request fired");
    if (query) {
      // check request reason

      // fetch basic infomation of all cryptocurrency
      async function x() {
        const response = await fetch(`${endPoint}`);
        return response.json();
      }
      x()
        .then((res) => {
          if (this.query === "initList") {
            const responseWithQuery = {
              res: res,
              query: query, // add query as a property of a new object
            };
            console.log(responseWithQuery);
            events.dataArrived(responseWithQuery);
          }

          if (this.query === "topListByMarketCapOverview") {
            const responseWithQuery = {
              res: res,
              query: query, // add query as a property of a new object
            };
            console.log(responseWithQuery);
            events.dataArrived(responseWithQuery);
          }
        })
        .then((res) => {
          console.log;
        });
    }
  }
}

export default Request;
