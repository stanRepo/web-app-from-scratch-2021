let allData = [];
// this file handles data refinement
const dataRefine = {
  refineInitList: (data, query) => {
    // debugger;
    let array = Object.keys(data).map(function (key) {
      return data[key];
    });
    console.log(array);
    // debugger;
    array = array.map((data) => {
      // console.log(data);
      // refine the data
      return {
        ticker: data.Symbol,
        id: data.Id,
        coinName: data.CoinName,
        imageUrl: data.ImageUrl,
        linkToCC: data.Url,
        Description: data.Description,
        ProofType: data.ProofType,
        Algorithm: data.Algorithm,
        ImageUrl: data.Algorithm,
        FullName: data.FullName,
      };
    });
    array.query = query;
    return array;
  },
  refineTopListByMarketCap: (data, query) => {
    // add refinements here
    let array = [];
    return data;
  },
  topListByVolume24Hrs: function (data, query) {
    return data;
  },
  refineAllLists: (data, query) => {
    // check of deze set initList is -- zo ja, push alle coins
    // -- zo niet, pak van data elk coin
    // check of deze set nested is in .CoinInfo
    // zo nee: vergelijk namen en update de coin in allData
    if (query == "initList" && allData.length < data.length) {
      console.log("query = initList");
      allData = data;

      // let allLists = { ...localStorage };
      let allLists = { ...localStorage };
      // console.log(allLists);
      console.log(typeof allLists);
      allLists = Object.keys(allLists).map(function (key) {
        return allLists[key];
      });
      console.log(allLists);
      combineCoin();
      async function combineCoin() {
        let res = await combine();
        function combine() {
          return new Promise((resolve, reject) => {
            for (let i = 0; i <= allLists.length; i++) {
              let thisList = JSON.parse(allLists[i]);

              console.log(thisList);

              // bestaande lijst met alle coins
              // kijken in de huidige lijst naar coins
              // fullname1 === fullname2
              // vul properties aan
              // .push[]
              console.log("combining");
              thisList.forEach((coin) => {
                //  console.log(coin);
                allData.forEach((listedCoin) => {
                  if (coin.CoinInfo) {
                    if (coin.CoinInfo.Fullname === listedCoin.FullName) {
                      console.log(
                        `1:${coin.CoinInfo.FullName} 2: ${listedCoin.FullName}`
                      );
                      // debugger;
                      listedCoin = Object.assign(listedCoin, coin.CoinInfo);
                      // console.log(listedCoin);
                      allData.push(listedCoin);
                    }
                  } else {
                    // console.log(`1:${coin.FullName} 2: ${listedCoin.FullName}`);
                    // debugger;
                    listedCoin = Object.assign(listedCoin, coin);
                    // console.log(listedCoin);
                    allData.push(listedCoin);
                  }
                });
              });
              resolve(allData);
            }
          }).then((res) => {
            console.log(res);
          });
        }

        console.log(res);
      }

      // debugger;
    } else {
    }

    // return;
  },
  //
  checkQuery: function (data, query) {
    // checks the query and selects the correct refinement functions
    let refinedData = undefined;
    switch (query) {
      case "initList": {
        refinedData = this.refineInitList(data, query);
        return refinedData;
      }
      case "topListByMarketCapOverview":
        refinedData = this.refineTopListByMarketCap(data, query);
        return refinedData;
      case "topListByVolume24Hrs": {
        refinedData = this.topListByVolume24Hrs(data, query);
        return refinedData;
      }
    }
    console.log(refinedData);
  },
  prepareForRendering: (data) => {
    // data = .data && .query
  },
};

export default dataRefine;
