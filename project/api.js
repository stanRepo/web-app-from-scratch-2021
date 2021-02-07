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

  // verder met data
  data = dataRefine.checkQuery(data, query);
  console.log(`${query} - Ready for Templating`);
  localStorage.storeInitList(data, query); // store in cache ->localStorage
};

class Request {
  constructor(endPoint, query, Key) {
    // query should be formatted as BTC,ETH,ADA,AGI etc
    this.query = query;
    this.endPoint = endPoint;
    this.query = query;
    this.Key = Key;
    this.data = {};

    fetch(`${endPoint}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.data = data.Data;
        onfulfilled(null, this.data, this.query);
      })
      .catch((err) => {
        onfulfilled(err);
      });
  }
}

export default Request;
