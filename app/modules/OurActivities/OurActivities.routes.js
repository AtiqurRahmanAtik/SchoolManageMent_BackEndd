import { Router } from "express";

import {
  createOurActivity,
  getAllOurActivities,
  getOurActivityById,
  getOurActivitiesByBranch,
  updateOurActivity,
  removeOurActivity,
} from "./OurActivities.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const OurActivitiesRoutes = Router();

// Protect all routes with authentication middleware
OurActivitiesRoutes.get("/", getAllOurActivities);
OurActivitiesRoutes.get("/:branch/get-all",  getOurActivitiesByBranch);
OurActivitiesRoutes.get("/get-id/:id",  getOurActivityById);
OurActivitiesRoutes.post("/post", createOurActivity);
OurActivitiesRoutes.put("/update/:id", updateOurActivity);
OurActivitiesRoutes.delete("/delete/:id",  removeOurActivity);

export default OurActivitiesRoutes;