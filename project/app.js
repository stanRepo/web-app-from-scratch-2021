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
      router.init();
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
    // this.state = new store(endPoints);
    // this.router = new router(endPoints);
    // this.API = new API(endPoints);
  }
}

class store extends App {
  constructor(endPoints) {
    super(endPoints);
    this.state = {
      stateDelete: (key) => {
        window.localStorage.removeItem(key);
      },
      stateUpdate: (key, value) => {
        const string = JSON.stringify(value);
        window.localStorage.setItem(key, string);
        return true;
      },
      stateCreate: (key, value) => {
        const string = JSON.stringify(value);
        window.localStorage.setItem(key, string);
        // console.error(`Failed Saving ${key} to Storage`);
      },
      stateGet: (key) => {
        const data = window.localStorage.getItem(key);
        return data;
      },

      currentURL: window.location,
      stateRead: window.localStorage,
      listsStored: 0,
    };
  }
}

class API extends store {
  constructor(endPoints) {
    super(endPoints);
    this.checkPlural = (endPoints) => {
      if (endPoints.push) {
        // multiple endpoints
        return endPoints;
      } else {
        // single endpoint
        return [endPoints]; // make it into an array
      }
    };

    this.request = {
      fetch: async (endPoint, key) => {
        console.log(endPoint.url);
        const data = await fetch(`${endPoint.url}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            try {
              this.state.stateCreate(endPoint.query, data.Data);
              this.state.listsStored++;
            } catch {
              console.log("listerror, refining");
              data = this.templates.mapInitList(data.Data);
              this.state.stateCreate(endPoint.query, data);
              this.state.listsStored++;
            }
            console.log(this.state.stateRead.length);
            console.log(this.state.listsStored);
            if (this.state.listsStored === endPoints.length) {
              // all lists were stored
              console.log("stored all lists");
              this.templates.combineLists();
            }

            return this.data;
          })
          .catch((err) => {
            console.error(err);
          });
      },
      fetchEndPoints: (endPoints) => {
        endPoints.forEach((endPoint) => {
          this.request.fetch(endPoint, key);
        });
      },
    };
  }
}
const router = {
  routes: (app) => {
    routie({
      "": async function () {
        // this is the home route
        console.log("@home");
        // console.log(app);
        if (app.state.stateRead.length < 1) {
          app.request.fetchEndPoints(endPoints);
        }
      },
      "details/:id": function (id) {
        console.log("@details");
        console.log(id);
      },

      "*": function () {
        console.log("404");
      },
    });
  },
};

class templates extends API {
  constructor(endPoints) {
    super(endPoints);
    this.templates = {
      mapInitList: (list) => {
        const array = Object.entries(list).map((data) => {
          // refine the data
          return {
            ticker: data[1].Symbol,
            id: data[1].Id,
            coinName: data[1].CoinName,
            imageUrl: data[1].ImageUrl,
            linkToCC: data[1].Url,
            Description: data[1].Description,
            ProofType: data[1].ProofType,
            Algorithm: data[1].Algorithm,

            FullName: data[1].FullName,
          };
        });
        //  array.query = query;
        return array;
      },
      combineLists: () => {
        let arr = [];
        const stored = this.state.stateRead;
        let mainList = this.state.stateGet("initList");
        // console.log(mainList);

        mainList.forEach((coin) => {});
      },
    };

    // console.log(this);
  }
}

const app = new templates(endPoints);
// app.start();
router.routes(app);
console.log(app);
