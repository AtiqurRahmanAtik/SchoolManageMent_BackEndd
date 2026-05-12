import { Router } from "express";
import {
  createEmployeeAttendance,
  getAllEmployeeAttendances,
  getEmployeeAttendanceById,
  getEmployeeAttendancesByBranch,
  updateEmployeeAttendance,
  removeEmployeeAttendance,
} from "./EmployeeAttendance.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const EmployeeAttendanceRoutes = Router();

// Protect all routes with authentication middleware
EmployeeAttendanceRoutes.get("/", getAllEmployeeAttendances);
EmployeeAttendanceRoutes.get("/:branch/get-all",  getEmployeeAttendancesByBranch);
EmployeeAttendanceRoutes.get("/get-id/:id", getEmployeeAttendanceById);
EmployeeAttendanceRoutes.post("/post",  createEmployeeAttendance);
EmployeeAttendanceRoutes.put("/update/:id", updateEmployeeAttendance);
EmployeeAttendanceRoutes.delete("/delete/:id",  removeEmployeeAttendance);

export default EmployeeAttendanceRoutes;