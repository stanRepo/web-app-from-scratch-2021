import localStorage from "./cache.js";

const render = {
  test: () => {
    function renderHello() {
      // var template = document.getElementById("template").innerHTML;
      // var rendered = Mustache.render(template, { name: "Luke" });
      // document.getElementById("target").innerHTML = rendered;

      // Search for anything that is surrounded by the brackets, and replace it with the name inside data.
      // Check for Target
      // I.E. "{{data.FullName}}", "data = {FullName:"Bitcoin"}"
      var render = (template, data) => {
        return template.replace(/{{(.*?)}}/g, (match) => {
          // console.log(data[match.split(/{{|}}/).filter(Boolean)[0].trim()]);
          return data[match.split(/{{|}}/).filter(Boolean)[0].trim()];
        });
      };

      var parse = (template) => {
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
      };
      const compileToString = (template) => {
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
      };
      const compile = (template) => {
        return new Function("data", "return " + compileToString(template));
      };

      const dataByCoinNameFromLocalStorage = () => {};

      const displayThese = ["FullName", ""];
      let data = {
        FullName: "BitCoin",
      };

      const testTemplate = (Stat) => {
        let string = (displayThisStat) => {
          const x = `This is my testString {{ ${displayThisStat} }}`;
          return x;
        };
        // console.log(string(Stat));
        return string(Stat);
      };
      console.log(render(testTemplate("FullName"), data));
      console.log("ITWORKS" + render(testTemplate("FullName"), data));
    }
    renderHello();
  },
};
export default render;
