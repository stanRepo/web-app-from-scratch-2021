import render from "./renderEngine.js";
//console.log(!render);
const templator = {
  createDataSetMarketCapOverview: (data) => {
    // console.log(query);

    let arr = [];
    data = JSON.parse(data);
    console.log(data);

    data.forEach((coin, i) => {
      // console.log(coin.CoinInfo.ProofType);
      arr.push({
        FullName: coin.FullName,
        Name: coin.Name,
        MarketCap: coin.DISPLAY.USD.MKTCAP,
        MarketCapRAW: coin.RAW.USD.MKTCAP,
        Price: coin.DISPLAY.USD.PRICE,
        Change24Hrs: coin.RAW.USD.CHANGE24HOUR,
        ChangePCT24Hrs: coin.RAW.USD.CHANGEPCT24HOUR,
        Supply: coin.DISPLAY.USD.SUPPLY,
        listNumber: i + 1,
        imageUrl: `https://www.cryptocompare.com/${coin.ImageUrl}`,
        // overview url
        maxSupply: templator.maxSupplyValidate(coin.MaxSupply),
        linkToCC: "https://www.cryptocompare.com/${coin.CoinInfo.Url}",
        ProofType: coin.ProofType,
        Algorithm: coin.Algorithm,
        AssetLaunchDate: coin.AssetLaunchDate,
        Description: coin.Description,
        //
      });
    });
    //console.log(arr[0]);

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
