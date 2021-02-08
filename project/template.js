import render from "./render.js";
console.log(!render);
const templator = {
  createDataSetMarketCapOverview: (query) => {
    let data = window.localStorage.getItem(query);
    console.log(query);
    let arr = [];
    data = JSON.parse(data);
    // console.log(data[0]);
    data.forEach((coin, i) => {
      if (coin.CoinInfo && coin.DISPLAY && coin.RAW) {
        arr.push({
          FullName: coin.CoinInfo.FullName,
          Name: coin.CoinInfo.Name,
          MarketCap: coin.DISPLAY.EUR.MKTCAP,
          Price: coin.DISPLAY.EUR.PRICE,
          Change24Hrs: coin.RAW.EUR.CHANGE24HOUR,
          ChangePCT24Hrs: coin.RAW.EUR.CHANGEPCT24HOUR,
          Supply: coin.DISPLAY.EUR.SUPPLY,
        });
      } else {
        console.log("data inconsistent");
      }
    });
    console.log(arr[0]);

    return arr;
  },
};

export default templator;

// topListByMarketCapOverview
