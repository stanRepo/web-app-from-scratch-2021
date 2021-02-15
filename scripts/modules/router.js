import Index from "./index.js";
import Details from "./details.js";
import endPoints from "./constant/endPoints.js";

export default class Router {
  constructor(endPoints) {
    routie({
      "": this["/"],
      "/": this["/"],
      "details/:id": this["details/:id"],
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
    const detailsPage = new Details(this.render, endPoints, id);
    this.currentPage = detailsPage;
  };
  "*" = () => {
    console.log("404");
  };
}
