// this file handles data refinement

const dataRefine = {
  refineInitList: (data) => {
    const x = data.query;
    console.log(data.res.Data);
    // console.log(Object.keys(data.data.Data));
    let array = Object.keys(data.res.Data).map(function (key) {
      return data.res.Data[key];
    });
    console.log(data);

    array = array.map((data) => {
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
    array.query = data.query;
    console.log(array);
    return array;
  },
  refineTopListByMarketCap: (data) => {
    return data;
  },
};

export default dataRefine;
