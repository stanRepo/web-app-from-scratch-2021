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

    this.cache = {
      history: () => {
        const x = window.localStorage.setItem("test", "test"); // test item
        const cache = this.state.history();
        this.storedData = cache;
        return cache;
      },
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
      stateInit: () => {},
      currentURL: window.location,
      stateRead: window.localStorage,
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
            this.state.stateCreate(endPoint.query, data.Data);
            console.log(data);
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
    // this.request.fetchEndPoints(endPoints);

    //this.request.fetchEndPoints(endPoints);
  }
}
const router = {
  routes: (app) => {
    routie({
      "": async function () {
        // this is the home route
        console.log("@home");
        console.log(app);
        if (app.state.stateRead.length < 1) {
          app.request.fetchEndPoints(endPoints);
        }
      },
      "details/:id": function (id) {
        console.log("@details");
        console.log(id);
        // const cache = localStorage.init();

        // check if coin exists in localStorage
        // let data = localStorage.retrieveSingleCoinData(id);
        // data = JSON.parse(data);
        // console.log(data[0]);
        // data.forEach((coin) => {});
      },

      "*": function () {
        console.log("404");
      },
    });
  },
};

const templates = {
  coinsCombined: () => {},
};

// console.log(window.localStorage);
const app = new API(endPoints);
// app.start();
router.routes(app);
console.log(app);
//console.log(app.state.stateRead());

// const app = {
//   start: () => {
//     console.log("running app.js");
//     router.init();
//     // add event listener
//     events.submitBtn();
//     events.positionCalc();
//     // activate localStorage
//     // const cache = localStorage.init();
//     // console.log(cache);
//   },
// };
// app.start();
// //export default app;
