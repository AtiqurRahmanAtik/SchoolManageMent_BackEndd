// File: ClassTime.routes.js

import { Router } from "express";
import {
  createClassTime,
  getAllClassTimes,
  getClassTimeById,
  getClassTimesByBranch,
  updateClassTime,
  removeClassClassTime,
} from "./ClassTime.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const ClassTimeRoutes = Router();

// Protect all routes with authentication middleware
ClassTimeRoutes.get("/",  getAllClassTimes);
ClassTimeRoutes.get("/:branch/get-all",  getClassTimesByBranch);
ClassTimeRoutes.get("/get-id/:id",  getClassTimeById);
ClassTimeRoutes.post("/post",  createClassTime);
ClassTimeRoutes.put("/update/:id",  updateClassTime);
ClassTimeRoutes.delete("/delete/:id",  removeClassClassTime);

export default ClassTimeRoutes;