import renderEngine from "./renderEngine.js";

export default class Renderer {
  constructor() {}
  renderTable = (finalList) => {
    finalList.forEach((coin, i) => {
      let element = document.querySelector(".data"); // select HTML Element to render
      let parentElement = document.querySelector("tbody"); // select parent
      let dataHMTLString = element.innerHTML.toString(); // Create Template
      const renderedElement = renderEngine.render(dataHMTLString, coin); // create next coin layout
      const newRowElement = document.createElement("tr"); // create new Row Element
      newRowElement.setAttribute("id", `data${i}`); // set a custom ID (unused atm)
      newRowElement.innerHTML = renderedElement; // set innerHTML to ne
      parentElement.insertAdjacentElement("beforeend", newRowElement); // add new element to parentElement
      newRowElement.classList.add(coin.Name, "coin");
    });
  };
  renderDetails = (finalList) => {
    finalList.forEach((coin, i) => {
      console.log(coin);
      let element = document.querySelector("#extraInfo");
      let parentElement = document.querySelector(".extraInfoSection");
      let dataHMTLString = element.innerHTML.toString();
      const renderedElement = renderEngine.render(dataHMTLString, coin);
      const newEl = document.createElement("li");
      newEl.setAttribute("id", `dataDetails${i}`);
      newEl.innerHTML = renderedElement;
      newEl.classList.add(`details`);
      parentElement.insertAdjacentElement("beforeend", newEl);
    });
  };
  clearEl = (el) => {
    // console.log(el.children[0]);
    const newEl = el.children[0];
    el.innerHTML = "";
    el.insertAdjacentElement("beforeend", newEl);
    // el.innerHTML = el.children[0];
    // debugger;
  };
}
