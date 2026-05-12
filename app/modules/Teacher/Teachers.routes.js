import { Router } from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  getTeachersByBranch,
  updateTeacher,
  removeTeacher,
} from "./Teachers.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const TeacherRoutes = Router();

// Protect all routes with authentication middleware
TeacherRoutes.get("/",  getAllTeachers);
TeacherRoutes.get("/:branch/get-all",  getTeachersByBranch);
TeacherRoutes.get("/get-id/:id",  getTeacherById);
TeacherRoutes.post("/post",  createTeacher);
TeacherRoutes.put("/update/:id", updateTeacher);
TeacherRoutes.delete("/delete/:id",  removeTeacher);

export default TeacherRoutes;