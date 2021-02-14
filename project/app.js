import events from "./events.js";
import localStorage from "./cache.js";
import render from "./renderEngine.js";
// import router from "./router.js";
import endPoints from "./endPoints.js";
import requestAPI from "./api.js";
import key from "./key.js";

class App {
  constructor() {
    this.start = () => {
      console.log("running app.js");
      //router.init();
      // add event listener
      events.submitBtn();
      events.positionCalc();
    };

    this.errorHandler = (obj) => {
      if (obj == undefined || false || null) {
        console.error("obj is undefined");
        console.error(obj);
        return false;
      } else {
        return obj;
      }
    };

    this.store = new Store();
    this.router = new Router();
  }
}

class Router {
  constructor(endPoints) {
    routie({
      "": this["/"],
      "/": this["/"],
      "/details/:id": this["/details/:id"],
      "*": this["*"],
    });
  }
  render = () => {
    // gooi die route in de renderEngine en gooi het op de html
    console.log(this.currentPage);
    // templateEngine(this.currentPage.render()); // parse en Replaced
  };

  "/" = () => {
    console.log("@home");
    const indexPage = new Index(this.render, endPoints);
    console.log(indexPage);
    this.currentPage = indexPage;
  };
  "details/:id" = (id) => {
    console.log("@details");
    const detailsPage = new DetailsPage(this.render, id);
    this.currentPage = detailsPage;
  };
  "*" = () => {
    console.log("404");
  };
}

class Store {
  constructor() {
    this.stateDelete = (key) => {
      window.localStorage.removeItem(key);
      return true;
    };
    this.stateUpdate = (key, value) => {
      const string = JSON.stringify(value);
      window.localStorage.setItem(key, string);
      return true;
    };
    this.stateCreate = (key, value) => {
      const string = JSON.stringify(value);
      window.localStorage.setItem(key, string);
      // console.error(`Failed Saving ${key} to Storage`);
    };
    this.stateGet = (key) => {
      const data = window.localStorage.getItem(key);
      return data;
    };

    this.currentLocation = window.location;
    this.stateRead = window.localStorage;
    this.temp = [];
  }
}
class Page {
  constructor(update, endPoints) {
    this.store = new Store();
    this.template = new Templates(endPoints);
    this.Api = new API(this.endPoint, this.store);
    this.endPoints = endPoints;
    this.key = key;
    this.update = update;
    this.lists = [];
  }

  render() {
    console.log(this);
    return {
      template: this.template,
      store: this.store,
      Api: this.Api,
    };
  }
}
// this.render, endPoints, key
class Index extends Page {
  template = new Templates();
  constructor(update, endPoints) {
    super(update, endPoints);
    this.lists = [];
    this.endPoints = endPoints;

    // get all lists
    // this function will fetch data => refine for storage => save to localstorage => call templator
    this.getItem = async () => {
      // /  console.log(endPoints);
      // wait for all lists to be retrieved
      try {
        let res = await Promise.all(
          endPoints.map((e, i) => {
            // console.log(e);
            const x = this.Api.fetch(e);
            return x;
          })
        ).then((res) => {
          console.log(res);
          console.log("calling templater");
          this.template.combineLists(res);
          console.log(this.store.stateRead.length);
        });
      } catch (err) {
        console.log(err);
      }
    };

    this.getItem().then((res) => {
      console.log(this.store.stateRead.length);
    });
  }

  combineLists(lists) {
    console.log("Combining Lists");
    console.log(window.localStorage.length);
  }
}

class Details extends Page {
  template = "details.html";
}

class API {
  constructor(endPoints, store) {
    this.store = store;
    this.template = new Templates();
    this.data = [];
  }

  fetch = (endPoint, key) => {
    return new Promise((resolve, reject) => {
      const data = fetch(`${endPoint.url}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.data = {
            data: data.Data,
            query: endPoint.query,
          };

          try {
            this.store.stateCreate(endPoint.query, this.data);
          } catch {
            console.log("listerror, refining"); // 1 list is too big to store locally right now. So I use .map() to Filter it

            const refinedData = this.template.mapInitList(
              data.Data,
              endPoint.query
            );
            //console.log(refinedData);
            if (refinedData) {
              this.data = {
                data: refinedData,
                query: endPoint.query,
              };
              this.store.stateCreate(endPoint.query, this.data);
              console.log("data refined");
            } else {
              data.query = endPoint.query;
              console.log("All Lists Retrieved And Stored");
              //resolve(lists);
            }
          }
          console.log(this.data);

          resolve(this.data);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };
  fetchEndPoints = async (endPoints) => {};
}

class Templates {
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
                // console.log(coin1);
                // console.log(coin2);
                if (coin1.FullName == coin2.CoinInfo.FullName) {
                  // found a pair
                  const newCoin = { ...coin2.CoinInfo, ...coin1.CoinInfo };
                  this.listOfCombinedData.push(newCoin);
                  console.log(this.listOfCombinedData);
                  debugger;
                }
              });
            }
          });
        });
        console.log("lists combined");
        console.log(this.listOfCombinedData);
      }
    });
  };
  // I want to create a list that hold as much information as possible about the coins that are selected.
  // I loop through the list to find the initList which holds information about all coins.
  // if current list is not initList or the list that holds the totals
}

// console.log(this);

const app = new App(endPoints);
// app.start();
//router.routes(app);
