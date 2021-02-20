export default class Templates {
  constructor() {}
  mapInitList = (list) => {
    const array = Object.entries(list).map((data) => {
      return {
        ticker: data[1].Symbol,
        coinName: data[1].CoinName,
        imageUrl: data[1].ImageUrl,
        linkToCC: data[1].Url,
        Description: data[1].Description,
        ProofType: data[1].ProofType,
        Algorithm: data[1].Algorithm,
        FullName: data[1].FullName,
      };
    });
    return array;
  };
  // I want to create a list that hold as much information as possible about the coins that are selected.
  // I loop through the list to find the initList which holds information about all coins.

  /*
  @params: {coin1} = coin from initList ( holds all coins )
  @params: {coin2} = coin from other lists
  @return: {newCoin} = created Coin that holds all properties.
  */
  createNewCoin = (coin1, coin2) => {
    let newCoin = {};
    if (coin1.ticker === coin2.CoinInfo.Name) {
      newCoin = { ...coin1, ...coin2.CoinInfo }; // set Coininfo
      if (coin2.DISPLAY) {
        let firstKey = Object.keys(coin2.DISPLAY);
        if (firstKey[0] === "EUR") {
          newCoin.RAW = coin2.RAW; // RAW info
          newCoin.DISPLAY = coin2.DISPLAY; // DISPLAY info
        }
      }
      return newCoin;
    }
  };
  combineLists = (lists) => {
    this.listOfCombinedData = lists.map((list) => {
      if (list.query == "initList") {
        list.data.forEach((coin1) => {
          lists.forEach((list) => {
            if (list.query !== "initList") {
              list.data.forEach((coin2) => {
                console.log(this.createNewCoin(coin1, coin2));
                debugger;
                return this.createNewCoin(coin1, coin2);
              });
            }
          });
        });
      }
    });

    // lists.forEach((list) => {
    //   if (list.query === "initList") {
    //     list.data.forEach((coin1) => {
    //       lists.forEach((list) => {
    //         if (list.query !== "initList") {
    //           list.data.forEach((coin2) => {
    //             if (coin1.ticker === coin2.CoinInfo.Name) {
    //               let newCoin = { ...coin1, ...coin2.CoinInfo }; // set Coininfo

    //               if (coin2.DISPLAY) {
    //                 let firstKey = Object.keys(coin2.DISPLAY);

    //                 if (firstKey[0] === "EUR") {
    //                   newCoin.RAW = coin2.RAW; // RAW info
    //                   newCoin.DISPLAY = coin2.DISPLAY; // DISPLAY info
    //                   this.listOfCombinedData.push(newCoin);
    //                 }
    //               }
    //             }
    //           });
    //         }
    //       });
    //     });
    //     console.log(this);
    //     return this.listOfCombinedData;
    //   }
    //   return this.listOfCombinedData;
    // });
  };

  createDataSetMarketCapOverview = (data) => {
    let arr = data.map((coin, i) => {
      return {
        FullName: coin.FullName,
        Name: coin.Name,
        MarketCap: coin.DISPLAY.EUR.MKTCAP,
        MarketCapRAW: coin.RAW.EUR.MKTCAP,
        Price: coin.DISPLAY.EUR.PRICE,
        Change24Hrs: coin.RAW.EUR.CHANGE24HOUR,
        ChangePCT24Hrs: coin.RAW.EUR.CHANGEPCT24HOUR.toFixed(2),
        Supply: coin.DISPLAY.EUR.SUPPLY,
        listNumber: i + 1,
        imageUrl: `https://www.cryptocompare.com/${coin.ImageUrl}`,

        maxSupply: this.maxSupplyValidate(coin.MaxSupply),
        //linkToCC: `https://www.cryptocompare.com/${coin.CoinInfo.Url}`,
        ProofType: coin.ProofType,
        Algorithm: coin.Algorithm,
        AssetLaunchDate: coin.AssetLaunchDate,
        Description: coin.Description,
        //
      };
    });

    arr = arr.sort((a, b) => b.MarketCapRAW - a.MarketCapRAW); // for descending sort
    arr = arr.map((coin, i) => {
      coin.listNumber = i + 1;
      return coin;
    });
    return arr;
  };
  /*
  @params: maxSupply = string.
  @return: maxSupply = string. holds initial string OR "No max Supply" if the coin has no supply limit.
  */
  maxSupplyValidate = (maxSupply) => {
    if (maxSupply == "-1") {
      maxSupply = "No max supply";
      return maxSupply;
    } else {
      return maxSupply;
    }
  };
}
