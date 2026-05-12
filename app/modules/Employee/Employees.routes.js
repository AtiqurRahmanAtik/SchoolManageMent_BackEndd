import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  getEmployeesByBranch,
  updateEmployee,
  removeEmployee,
} from "./Employees.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const EmployeeRoutes = Router();

// Protect all routes with authentication middleware
EmployeeRoutes.get("/",  getAllEmployees);
EmployeeRoutes.get("/:branch/get-all",  getEmployeesByBranch);
EmployeeRoutes.get("/get-id/:id",  getEmployeeById);
EmployeeRoutes.post("/post",  createEmployee);
EmployeeRoutes.put("/update/:id",  updateEmployee);
EmployeeRoutes.delete("/delete/:id",  removeEmployee);

export default EmployeeRoutes;