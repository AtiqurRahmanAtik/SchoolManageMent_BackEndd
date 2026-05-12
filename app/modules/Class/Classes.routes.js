import { Router } from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  getClassesByBranch,
  updateClass,
  removeClass,
} from "./Classes.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const ClassRoutes = Router();

// Protect all routes with authentication middleware
ClassRoutes.get("/", getAllClasses);
ClassRoutes.get("/:branch/get-all",  getClassesByBranch);
ClassRoutes.get("/get-id/:id",  getClassById);
ClassRoutes.post("/post",  createClass);
ClassRoutes.put("/update/:id",  updateClass);
ClassRoutes.delete("/delete/:id",  removeClass);

export default ClassRoutes;