// import render from "./render.js";
import localStorage from "./cache.js";
const router = {
  init: () => {
    //const hash = window.location.hash;

    //console.log(window.location.pathname);

    //Routie(router.routes);
    // console.log(window);

    routie({
      "": function () {
        // this is the home route
        console.log("@home");
        const cache = localStorage.init();
      },
      "details/:id": function (id) {
        console.log("@details");
        console.log(id);
        const cache = localStorage.init();
        // check if coin exists in localStorage
        let data = localStorage.retrieveSingleCoinData(id);
        data = JSON.parse(data);
        console.log(data[0]);
        data.forEach((coin) => {});
      },

      "*": function () {
        console.log("404");
      },
    });
  },
};
export default router;
