import render from "./render.js";
console.log(!render);
const templator = {
  createDataSetMarketCapOverview: (data) => {
    // console.log(query);
    let arr = [];
    data = JSON.parse(data);
    console.log(data[0]);

    data.forEach((coin, i) => {
      if (coin.CoinInfo && coin.DISPLAY && coin.RAW) {
        arr.push({
          FullName: coin.CoinInfo.FullName,
          Name: coin.CoinInfo.Name,
          MarketCap: coin.DISPLAY.EUR.MKTCAP,
          MarketCapRAW: coin.RAW.EUR.MKTCAP,
          Price: coin.DISPLAY.EUR.PRICE,
          Change24Hrs: coin.RAW.EUR.CHANGE24HOUR,
          ChangePCT24Hrs: coin.RAW.EUR.CHANGEPCT24HOUR,
          Supply: coin.DISPLAY.EUR.SUPPLY,
          listNumber: i + 1,
          imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
          // overview url
          maxSupply: templator.maxSupplyValidate(coin.CoinInfo.MaxSupply),
          linkToCC: "https://www.cryptocompare.com/${coin.CoinInfo.Url}",
          //
        });
      } else {
        console.log("data inconsistent");
      }
    });
    console.log(arr[0]);

    return arr;
  },
  maxSupplyValidate: (maxSupply) => {
    if (maxSupply == "-1") {
      maxSupply = "No max supply";
      return maxSupply;
    } else {
      return maxSupply;
    }
  },
  createDataSetDetailPage: (coin) => {
    console.log("foundlist");
    list = JSON.parse(list);
    let thisCoin = {};
    list.forEach((coin) => {
      if (coin.ticker === id) {
        console.log("foundcoin");
        console.log(coin);
        thisCoin = coin;
      }
    });
    console.log(thisCoin);
  },
};

export default templator;

// topListByMarketCapOverview
