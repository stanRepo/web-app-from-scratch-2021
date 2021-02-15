import endPoints from "./endPoints.js";
import Store from "./store.js";
import Router from "./router.js";

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
