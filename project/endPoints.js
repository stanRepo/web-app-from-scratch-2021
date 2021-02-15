const endPoints = {
  initialLists: [
    {
      url: "https://min-api.cryptocompare.com/data/all/coinlist",
      query: "initList",
    },
    {
      url:
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=EUR",
      query: "topListByMarketCapOverview",
    },
    {
      url:
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD",
      query: "topListByVolume24Hrs",
    },
  ],
  getSingle: (subject, valuedIn) => {
    let string = `https://min-api.cryptocompare.com/data/pricemultifull?${endPoints.options.subject}${subject}&${endPoints.options.valuedIn}${valuedIn}`;
    const obj = {
      url: string,
      query: "getSingle",
    };
    return obj;
  },
  options: {
    subject: "fsyms=", // currencies seperated by commas followed by an ampersant (&),
    valuedIn: "tsyms=", //tsyms=USD,EUR,
  },
};
//console.log(endPoints.getSingle("ADA", "EUR"));

// when use also saves to localStorage

//   singleCoin: "https://min-api.cryptocompare.com/data/pricemulti?", //fsyms=BTC,ETH&
//   topListByMarketCapOverview:
//     "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=80&tsym=EUR",
//   subject: "fsyms=", // currencies seperated by commas followed by an ampersant (&)
//   valuedIn: "tsyms=", //tsyms=USD,EUR,
//   topListByVolume24Hrs:
//     "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD",
export default endPoints;
