//

import events from "./events.js";
import app from "./app.js";

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
        return res.json();
      })
      .then((data) => {
        this.data = data.Data;
        app.APIRequestFullFilled(null, this.data, this.query);
      })
      .catch((err) => {
        app.APIRequestFullFilled(err);
      });
  }
}

export default Request;
