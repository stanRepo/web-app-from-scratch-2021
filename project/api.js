//

import dataRefine from "./data.js";
import localStorage from "./cache.js";

const onfulfilled = function (err, data, query) {
  if (err) {
    console.error(err);
    return;
    // stoppen op error
  }
  // console.log(data);
  // verder met data
  // data = dataRefine.checkQuery(data, query);
  // console.log(data);
  console.log(`${query} - Ready for Templating`);
  // localStorage.storeInitList(data, query); // store in cache ->localStorage
  // const allData = dataRefine.refineAllLists(data, query);
  // console.log(allData);
  // localStorage.storeInitList(allData, "allData");
  return data;
};
const requestAPI = async (endPoint, query, key) => {
  // console.log(endPoint);
  const data = await fetch(`${endPoint}`);
  const JSONdata = data.json();
  return onfulfilled(null, JSONdata, query);
  // .then((res) => {
  //   return res.json();
  // })
  // .then((data) => {
  //   // this.data = data.Data;
  //   const dataa = onfulfilled(null, data.Data, query);
  //   console.log(dataa);
  //   return dataa;
  // })
  // .catch((err) => {
  //   onfulfilled(err);
  // });
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

export default requestAPI;
