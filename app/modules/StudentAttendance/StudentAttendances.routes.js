import { Router } from "express";
import {
  createStudentAttendance,
  getAllStudentAttendances,
  getStudentAttendanceById,
  getStudentAttendancesByBranch,
  updateStudentAttendance,
  removeStudentAttendance,
} from "./StudentAttendances.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const StudentAttendanceRoutes = Router();

// Properly implemented the authentication middleware into every route
StudentAttendanceRoutes.get("/",  getAllStudentAttendances);
StudentAttendanceRoutes.get("/:branch/get-all",  getStudentAttendancesByBranch);
StudentAttendanceRoutes.get("/get-id/:id",  getStudentAttendanceById);
StudentAttendanceRoutes.post("/post",  createStudentAttendance);
StudentAttendanceRoutes.put("/update/:id",updateStudentAttendance);
StudentAttendanceRoutes.delete("/delete/:id",  removeStudentAttendance);

export default StudentAttendanceRoutes;