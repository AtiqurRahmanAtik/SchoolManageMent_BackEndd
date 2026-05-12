// File: Day.routes.js

import { Router } from "express";
import {
  createDay,
  getAllDays,
  getDayById,
  getDaysByBranch,
  updateDay,
  removeDay,
} from "./Day.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const DayRoutes = Router();

// Protect all routes with authentication middleware
DayRoutes.get("/",  getAllDays);
DayRoutes.get("/:branch/get-all",  getDaysByBranch);
DayRoutes.get("/get-id/:id",  getDayById);
DayRoutes.post("/post",  createDay);
DayRoutes.put("/update/:id",  updateDay);
DayRoutes.delete("/delete/:id",  removeDay);

export default DayRoutes;