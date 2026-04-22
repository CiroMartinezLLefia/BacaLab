import express from "express";
import {
  getAllBacalla,
  getBacallaById,
  createBacalla,
  editBacalla,
  deleteBacalla,
} from "../controller/bacallaController.js";

const bacallaRouter = express.Router();

bacallaRouter.get("/", getAllBacalla);
bacallaRouter.get("/:id", getBacallaById);
bacallaRouter.post("/", createBacalla);
bacallaRouter.put("/:id", editBacalla);
bacallaRouter.delete("/:id", deleteBacalla);

export default bacallaRouter;