import { Router } from "express";
import {
  createSection,
  getAllSections,
  getSectionById,
  getSectionsByBranch,
  updateSection,
  removeSection,
} from "./Sections.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const SectionRoutes = Router();

// Protect all routes with authentication middleware
SectionRoutes.get("/",  getAllSections);
SectionRoutes.get("/:branch/get-all",  getSectionsByBranch);
SectionRoutes.get("/get-id/:id",  getSectionById);
SectionRoutes.post("/post",  createSection);
SectionRoutes.put("/update/:id", updateSection);
SectionRoutes.delete("/delete/:id",  removeSection);

export default SectionRoutes;