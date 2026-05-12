// File: ClassRoutine.routes.js

import { Router } from "express";
import {
  createClassRoutine,
  getAllClassRoutines,
  getClassRoutineById,
  getClassRoutinesByBranch,
  updateClassRoutine,
  removeClassRoutine,
} from "./ClassRoutine.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const ClassRoutineRoutes = Router();

// Protect all routes with authentication middleware
ClassRoutineRoutes.get("/", getAllClassRoutines);
ClassRoutineRoutes.get("/:branch/get-all", getClassRoutinesByBranch);
ClassRoutineRoutes.get("/get-id/:id", getClassRoutineById);
ClassRoutineRoutes.post("/post", createClassRoutine);
ClassRoutineRoutes.put("/update/:id", updateClassRoutine);
ClassRoutineRoutes.delete("/delete/:id", removeClassRoutine);

export default ClassRoutineRoutes;