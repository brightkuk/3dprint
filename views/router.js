import express from "express";
import ThreeDPrintsController from "../controllers/ThreeDPrintsController.js";

const Router = express.Router();

Router.route("/3DPRINTING")
.get(ThreeDPrintsController.getAllThreeDPrints)
.post(ThreeDPrintsController.createThreeDPrints);

Router.route("/3DPRINTING/:id") // <-- this defines an endpoint with a "placeholder" for the id
  .get(ThreeDPrintsController.getThreeDPrintsById)
  .put(ThreeDPrintsController.updateThreeDPrintsById)
  .delete(ThreeDPrintsController.deleteThreeDPrintsById);

//   .get((req, res) => {
//     res.send(
//       "🤖 3DPrinting Route with GET method - this endpoint will get all of the 3D prints from the database"
//     );
//   })
//   .post((req, res) => {
//     res.send(
//       "🤖 3DPrinting Route with POST method - this endpoint will create a new 3D print in the database"
//     );
//   });

export default Router;