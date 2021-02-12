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
      "/": this["/"],
      "/details/:id": this["/details/:id"],
      "*": this["*"],
    });
  }

  render = () => {
    // gooi die route in de renderEngine en gooi het op de html
    //
    templateEngine(this.currentPage.render()); // parse en Replaced
  };

  "/" = async () => {
    const indexPage = new Index(this.render, endPoints);
    this.currentPage = indexPage;
    console.log("@home");
  };
  "details/:id" = async (id) => {
    console.log("@details");
    const detailsPage = new DetailsPage(this.render, id);
    this.currentPage = detailsPage;
  };

  "*" = async () => {
    console.log("404");
  };
}

class Store {
  constructor() {
    this.stateDelete = (key) => {
      window.localStorage.removeItem(key);
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
    this.listsStored = 0;
  }
}
class Page {
  Api = new API(this.endPoint);
  Store = new Store(this.key);
  template = new Templates();

  constructor(update, endPoint, key) {
    this.endPoint = endPoint;
    this.key = key;
    this.update = update;
  }

  render() {
    console.log(this);
    return {
      template: this.template,
      store: this.Store,
    };
  }
}

class Index extends Page {
  template = "index.html";
  constructor(update, endPoints) {
    super(update, endPoints, key);
    this.data = [];
    // this.templates = new Templates(endPoints);
    // console.log(endPoints);
  }
  getLists = (() => {
    // console.log(endPoints);
    endPoints.forEach((endPoint) => {
      this.Api.fetch(endPoint);
    });
    console.log(this);
  })();
}

class Details extends Page {
  template = "details.html";

  // constructor(update, id) {
  //   super(update, `cryptocomparedetailurl?id=${id}`, "details");
  //   this.Api.fetch().then((data) => {
  //     this.Store.set(data);
  //     this.update();
  //   });
  // }
}

class API {
  constructor(endPoints) {}
  // checkPlural = (endPoints) => {
  //   console.log(endPoints);
  //   if (!endPoints.push) {
  //     // single endpoint
  //     return [endPoints]; // make it into an array
  //   } else {
  //     // multiple endpoints
  //     return endPoints;
  //   }
  // };

  fetch = (endPoint, key) => {
    // console.log(endPoint.url);
    const data = fetch(`${endPoint.url}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        try {
          console.log(data.Data);
          console.log(this);
          // this.state.stateCreate(endPoint.query, data.Data);
          // this.state.listsStored++;
        } catch {
          console.log("listerror, refining");
          //console.log(this);
          // data = this.templates.mapInitList(data.Data);
          // this.state.stateCreate(endPoint.query, data);
          // this.state.listsStored++;
        }
        // console.log(this.state.stateRead.length);
        // console.log(this.state.listsStored);
        // if (this.state.listsStored === endPoints.length) {
        // all lists were stored
        // console.log("stored all lists");
        // this.templates.combineLists();
        // }

        return this.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  fetchEndPoints = async (endPoints) => {
    // let dataList = [];
    // await this.checkPlural(endPoints).forEach((endPoint) => {
    //   console.log(this.checkPlural(endPoint.url));
    //   // console.log(this);
    //   dataList.push(this.fetch(endPoint, key));
    //   console.log(dataList);
    //   // this.checkPlural(this.fetch(endPoint, key));
    // });
    // return dataList;
  };
}

class Templates {
  constructor(endPoints) {}
  mapInitList = (list) => {
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
  };
  combineLists = () => {
    let arr = [];
    const stored = this.state.stateRead;
    let mainList = this.state.stateGet("initList");
    // console.log(mainList);

    mainList.forEach((coin) => {});
  };
}

// console.log(this);

const app = new App(endPoints);
// app.start();
//router.routes(app);
