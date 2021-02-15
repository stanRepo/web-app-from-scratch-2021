import endPoints from "./modules/constant/endPoints.js";
import Store from "./modules/store.js";
import Router from "./modules/router.js";

class App {
  constructor() {
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

const app = new App(endPoints.initialLists);
