const templateElements = {
  overview: document.querySelector("tbody"),
};

//

const render = {
  renderOverview: (template, data) => {
    //render to main Table
    console.log("running template");

    // select rendering method based on the query
    switch (template) {
      case "overview":
        var rendered = Mustache.render(template, data);
        document.getElementById("target").innerHTML = rendered;
        console.log(data);
        break;
    }
  },
};

//render.renderOverview("overview");

export default render;
