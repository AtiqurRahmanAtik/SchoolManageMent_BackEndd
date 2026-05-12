import { Router } from "express";
import {
  createAboutUs,
  getAllAboutUs,
  getAboutUsById,
  getAboutUsByBranch,
  updateAboutUs,
  removeAboutUs,
} from "./AboutUs.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const AboutUsRoutes = Router();

// Protect all routes with authentication middleware
AboutUsRoutes.get("/",  getAllAboutUs);
AboutUsRoutes.get("/:branch/get-all",  getAboutUsByBranch);
AboutUsRoutes.get("/get-id/:id",  getAboutUsById);
AboutUsRoutes.post("/post",  createAboutUs);
AboutUsRoutes.put("/update/:id",  updateAboutUs);
AboutUsRoutes.delete("/delete/:id", removeAboutUs);

export default AboutUsRoutes;