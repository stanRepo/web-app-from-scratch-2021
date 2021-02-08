import localStorage from "./cache.js";
import templator from "./template.js";

const dataByCoinNameFromLocalStorage = () => {};

const displayThese = [
  "FullName",
  "Name",
  "MarketCap.DISPLAY",
  "Price.DISPLAY",
  "Change24Hrs",
  "ChangePCT24Hrs",
  "Supply",
];
let data = {
  FullName: "BitCoin",
};

const render = {
  displayThese: [
    "FullName",
    "Name",
    // "MarketCap.DISPLAY",
    // "Price.DISPLAY",
    "Change24Hrs",
    "ChangePCT24Hrs",
    "Supply",
  ],

  Template: (Stat) => {
    let string = (displayThisStat) => {
      const x = `{{ ${displayThisStat} }}`;
      return x;
    };
    // console.log(string(Stat));
    return string(Stat);
  },
  render: (template, data) => {
    // var template = document.getElementById("template").innerHTML;
    // var rendered = Mustache.render(template, { name: "Luke" });
    // document.getElementById("target").innerHTML = rendered;

    // Search for anything that is surrounded by the brackets, and replace it with the name inside data.
    // Check for Target
    // I.E. "{{data.FullName}}", "data = {FullName:"Bitcoin"}"

    return template.replace(/{{(.*?)}}/g, (match) => {
      return data[match.split(/{{|}}/).filter(Boolean)[0].trim()];
    });
  },
  parse: (template) => {
    console.log(template);
    let result = /{{(.*?)}}/g.exec(template); // add selector
    let arr = [];
    let firstPos;
    console.log(result);
    while (result) {
      firstPos = result.index;
      if (firstPos !== 0) {
        arr.push(template.substring(0, firstPos)); // add starting index on string.
        template = template.slice(firstPos); // add everything between [0] and [firstPos]
        console.log(template);
      }

      arr.push(result[0]);
      template = template.slice(result[0].length);
      result = /{{(.*?)}}/g.exec(template);
      console.log(result);
    }
    if (template) arr.push(template);
    return arr;
  },
  compileToString: (template) => {
    console.log(template);

    const ast = template;
    console.log(ast);
    console.log(typeof ast);
    let fnStr = `""`;

    ast.map((t) => {
      // checking to see if it is an interpolation
      if (t.startsWith("{{") && t.endsWith("}}")) {
        // append it to fnStr
        fnStr += `+data.${t.split(/{{|}}/).filter(Boolean)[0].trim()}`;
      } else {
        // append the string to the fnStr
        fnStr += `+"${t}"`;
      }
    });
    console.log(fnStr);
    return fnStr;
  },
  compile: (template) => {
    return new Function("data", "return " + compileToString(template));
  },
};

// activeer event wanneer body=loaded
// voor elke coin, kijk welke prop gelijk is aan de inhoud van de html
// zoek door html naar data.prop
const bodyIsLoaded = (data) => {
  const e = document.querySelector("body");

  e.addEventListener("load", (e) => {
    data.forEach((coin) => {
      console.log(coin.CoinInfo.FullName);
    });
  });
};

// const html = document.querySelector("#data").innerText;
// console.log(html);

//console.log(render.render(render.Template(html), data));

console.log("ITWORKS" + render.render(render.Template("FullName"), data));

export default render;
