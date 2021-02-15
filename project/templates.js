export default class Templates {
  constructor(endPoints) {}
  mapInitList = (list, query) => {
    // console.log
    const array = Object.entries(list).map((data) => {
      // refine the data

      return {
        ticker: data[1].Symbol,
        // id: data[1].Id,
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
  // if current list is not initList or the list that holds the totals
  combineLists = (lists) => {
    this.listOfCombinedData = [];

    console.log(lists);
    lists.forEach((list) => {
      if (list.query === "initList") {
        list.data.forEach((coin1) => {
          lists.forEach((list) => {
            if (list.query !== "initList") {
              // console.log(list);
              list.data.forEach((coin2) => {
                if (coin1.ticker === coin2.CoinInfo.Name) {
                  // console.log(`${coin1.FullName} + ${coin2.CoinInfo.FullName}`);
                  // console.log("found a pair");
                  // found a pair
                  let newCoin = { ...coin1, ...coin2.CoinInfo }; // set Coininfo
                  //console.log(coin2);
                  // debugger;

                  if (coin2.DISPLAY) {
                    let firstKey = Object.keys(coin2.DISPLAY);
                    //console.log(firstKey[0] === "EUR");

                    if (firstKey[0] === "EUR") {
                      newCoin.RAW = coin2.RAW; // RAW info
                      newCoin.DISPLAY = coin2.DISPLAY; // DISPLAY info
                      this.listOfCombinedData.push(newCoin);
                    }
                  }
                  // console.log(this.listOfCombinedData);
                  // debugger;
                }
              });
            }
          });
        });
        console.log(this);
        return this.listOfCombinedData;
      }
      return this.listOfCombinedData;
    });
    return this.listOfCombinedData;
  };

  createDataSetMarketCapOverview = (data) => {
    // console.log(query);

    let arr = [];
    // /console.log(data);

    data.forEach((coin, i) => {
      //console.log(coin);
      arr.push({
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
        // overview url
        maxSupply: this.maxSupplyValidate(coin.MaxSupply),
        //linkToCC: `https://www.cryptocompare.com/${coin.CoinInfo.Url}`,
        ProofType: coin.ProofType,
        Algorithm: coin.Algorithm,
        AssetLaunchDate: coin.AssetLaunchDate,
        Description: coin.Description,
        //
      });
    });
    //console.log(arr[0]);
    //console.log(arr);
    // debugger;
    arr = arr.sort((a, b) => b.MarketCapRAW - a.MarketCapRAW); // for descending sort
    arr = arr.map((coin, i) => {
      coin.listNumber = i + 1;
      return coin;
    });
    return arr;
  };
  maxSupplyValidate = (maxSupply) => {
    if (maxSupply == "-1") {
      maxSupply = "No max supply";
      return maxSupply;
    } else {
      return maxSupply;
    }
  };
}
