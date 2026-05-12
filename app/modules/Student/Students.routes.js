// File: app/modules/Student/Students.routes.js

import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentsByBranch,
  updateStudent,
  removeStudent,
} from "./Students.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const StudentRoutes = Router();

// Protect all routes with authentication middleware
StudentRoutes.get("/",  getAllStudents);
StudentRoutes.get("/:branch/get-all", getStudentsByBranch);
StudentRoutes.get("/get-id/:id", getStudentById);
StudentRoutes.post("/post",  createStudent);
StudentRoutes.put("/update/:id",  updateStudent);
StudentRoutes.delete("/delete/:id",  removeStudent);

export default StudentRoutes;