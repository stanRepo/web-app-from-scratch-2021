// this file handles data refinement

const dataRefine = {
  refineInitList: (data, query) => {
    let array = Object.keys(data).map(function (key) {
      return data[key];
    });

    array = array.map((data) => {
      // refine the data
      return {
        ticker: data.Symbol,
        id: data.Id,
        coinName: data.CoinName,
        imageUrl: data.ImageUrl,
        url: data.Url,
        description: data.Description,
        proofType: data.ProofType,
        algorithm: data.Algorithm,
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
