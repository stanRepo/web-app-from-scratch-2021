//

import events from "./events.js";
import key from "./key.js";
import dataRefine from "./data.js";
import localStorage from "./cache.js";

const onfulfilled = function (err, data, query) {
  if (err) {
    console.error(err);
    return;
    // stoppen op error
  }
  console.log(data);
  // verder met data
  data = dataRefine.checkQuery(data, query);
  localStorage.storeInitList(data, query); // store in cache ->localStorage
  console.log(`${query} - Ready for Templating`);
};

class Request {
  constructor(endPoint, Key, query) {
    // query should be formatted as BTC,ETH,ADA,AGI etc
    this.query = query;
    this.endPoint = endPoint;
    this.query = query;
    this.Key = Key;
    this.data = {};

    fetch(`${endPoint}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        // console.log(data.Data);
        this.data = data.Data;
        onfulfilled(null, this.data, this.query);
      })
      .catch((err) => {
        onfulfilled(err);
      });

    // function getData() {
    //   console.log("request fired");
    //   if (query) {
    //     // check request reason

    //     // fetch basic infomation of all cryptocurrency
    //     async function x() {
    //       const response = await fetch(endPoint);
    //       return response.json();
    //     }
    //     x().then((res) => {
    //       this.data = res;
    //
    //       if (this.query === "initList") {
    //         const responseWithQuery = {
    //           res: res,
    //           query: query, // add query as a property of a new object
    //         };
    //         // console.log(responseWithQuery);
    //         events.dataArrived(responseWithQuery);
    //       }

    //       if (this.query === "topListByMarketCapOverview") {
    //         const responseWithQuery = {
    //           res: res,
    //           query: query, // add query as a property of a new object
    //         };
    //         // console.log(responseWithQuery);
    //         events.dataArrived(responseWithQuery);
    //       }
    //     });
    //   } else {
    //     console.error("no/invalid query");
    //   }
    // }
  }
}

export default Request;
