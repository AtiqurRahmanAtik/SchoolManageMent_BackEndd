import { Router } from "express";
import {
  createStudentMark,
  getAllStudentMarks,
  getStudentMarkById,
  getStudentMarksByBranch,
  updateStudentMark,
  removeStudentMark,
} from "./StudentMark.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const StudentMarkRoutes = Router();

// Protect all routes with authentication middleware
StudentMarkRoutes.get("/",  getAllStudentMarks);
StudentMarkRoutes.get("/:branch/get-all",  getStudentMarksByBranch);
StudentMarkRoutes.get("/get-id/:id",  getStudentMarkById);
StudentMarkRoutes.post("/post",  createStudentMark);
StudentMarkRoutes.put("/update/:id",  updateStudentMark);
StudentMarkRoutes.delete("/delete/:id",  removeStudentMark);

export default StudentMarkRoutes;