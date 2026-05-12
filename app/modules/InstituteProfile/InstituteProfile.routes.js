// src/app/modules/InstituteProfile/InstituteProfile.routes.js
import { Router } from "express";
import {
  getAllInstituteProfiles,
  getInstituteProfilesByBranch,
  getInstituteProfileById,
  createInstituteProfile,
  updateInstituteProfile,
  removeInstituteProfile,
} from "./InstituteProfile.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";

const InstituteProfileRoutes = Router();

InstituteProfileRoutes.get("/",  getAllInstituteProfiles);
InstituteProfileRoutes.get("/:branch/get-all",  getInstituteProfilesByBranch);
InstituteProfileRoutes.get("/get-id/:id",  getInstituteProfileById);
InstituteProfileRoutes.post("/post", createInstituteProfile);
InstituteProfileRoutes.put("/update/:id",  updateInstituteProfile);
InstituteProfileRoutes.delete("/delete/:id",  removeInstituteProfile);

export default InstituteProfileRoutes;