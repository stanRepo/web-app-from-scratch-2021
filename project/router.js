// import Routie from "./routie.js";
// console.log(routie);
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
        const cache = localStorage.init();
      },
      details: function () {
        console.log("@details");
      },
      "*": function () {
        console.log("404");
      },
    });
  },
};
export default router;
