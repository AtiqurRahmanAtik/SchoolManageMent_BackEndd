import { Router } from "express";
import {
  createGrade,
  getAllGrades,
  getGradeById,
  getGradesByBranch,
  updateGrade,
  removeGrade,
} from "./Grade.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const GradeRoutes = Router();

// Routes
GradeRoutes.get("/", getAllGrades);
GradeRoutes.get("/:branch/get-all", getGradesByBranch);
GradeRoutes.get("/get-id/:id", getGradeById);
GradeRoutes.post("/post", createGrade);
GradeRoutes.put("/update/:id", updateGrade);
GradeRoutes.delete("/delete/:id", removeGrade);

export default GradeRoutes;