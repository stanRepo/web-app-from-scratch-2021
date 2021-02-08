import render from "./render.js";
console.log(!render);
const templator = {
  createDataSetMarketCapOverview: (query) => {
    let data = window.localStorage.getItem(query);
    console.log(query);
    let arr = [];
    data = JSON.parse(data);
    console.log(data[0]);
    data.forEach((coin, i) => {
      if (coin.CoinInfo && coin.DISPLAY && coin.RAW) {
        arr.push({
          FullName: coin.CoinInfo.FullName,
          Name: coin.CoinInfo.Name,
          MarketCap: {
            DISPLAY: coin.DISPLAY.EUR.MKTCAP,
            RAW: coin.RAW.EUR.MKTCAP,
          },
          Price: { DISPLAY: coin.DISPLAY.EUR.PRICE, RAW: coin.RAW.EUR.PRICE },
          Change24Hrs: coin.RAW.EUR.CHANGE24HOUR,
          ChangePCT24Hrs: coin.RAW.EUR.CHANGEPCT24HOUR,
          Supply: coin.DISPLAY.EUR.SUPPLY,
        });
      } else {
        console.log("data inconsistent");
      }
    });
    //console.log(arr);

    return arr;
  },
};

export default templator;

// topListByMarketCapOverview
