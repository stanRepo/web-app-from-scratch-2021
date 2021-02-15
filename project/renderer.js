import renderEngine from "./renderEngine.js";

export default class Renderer {
  constructor() {}
  render = (finalList) => {
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
}
