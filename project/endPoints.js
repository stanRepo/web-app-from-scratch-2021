const endPoints = [
  {
    url: "https://min-api.cryptocompare.com/data/all/coinlist",
    query: "initList",
  },
  {
    url:
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=80&tsym=EUR",
    query: "topListByMarketCapOverview",
  },
  {
    url:
      "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD",
    query: "topListByVolume24Hrs",
  },
];
const options = {
  subject: "fsyms=", // currencies seperated by commas followed by an ampersant (&),
  valuedIn: "tsyms=", //tsyms=USD,EUR,
};

// when use also saves to localStorage

//   singleCoin: "https://min-api.cryptocompare.com/data/pricemulti?", //fsyms=BTC,ETH&
//   topListByMarketCapOverview:
//     "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=80&tsym=EUR",
//   subject: "fsyms=", // currencies seperated by commas followed by an ampersant (&)
//   valuedIn: "tsyms=", //tsyms=USD,EUR,
//   topListByVolume24Hrs:
//     "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD",
export default endPoints;
