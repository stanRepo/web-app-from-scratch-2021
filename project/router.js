import Routie from "./routie.js";
console.log(Routie);
// const router = {
//   init: () => {
//     //const hash = window.location.hash;

//     //console.log(window.location.pathname);
//     console.log(router.routes);
//     //Routie(router.routes);
//   },
//   routes: {
//     "": function () {
//       // this is the home route
//       console.log("@home");
//     },
//     "/details": function () {
//       console.log("@details");
//     },
//   },
// };
Routie({
  "*": function () {
    // this is the home route
    console.log("@home");
  },
  "/details": function () {
    console.log("@details");
  },
});
export default router;
