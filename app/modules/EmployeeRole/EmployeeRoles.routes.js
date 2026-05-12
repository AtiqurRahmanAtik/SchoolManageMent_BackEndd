import { Router } from "express";
import {
  createEmployeeRole,
  getAllEmployeeRoles,
  getEmployeeRoleById,
  getEmployeeRolesByBranch,
  updateEmployeeRole,
  removeEmployeeRole,
} from "./EmployeeRoles.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const EmployeeRoleRoutes = Router();

// Protect all routes with authentication middleware
EmployeeRoleRoutes.get("/",  getAllEmployeeRoles);
EmployeeRoleRoutes.get("/:branch/get-all",  getEmployeeRolesByBranch);
EmployeeRoleRoutes.get("/get-id/:id",  getEmployeeRoleById);
EmployeeRoleRoutes.post("/post",  createEmployeeRole);
EmployeeRoleRoutes.put("/update/:id",  updateEmployeeRole);
EmployeeRoleRoutes.delete("/delete/:id",  removeEmployeeRole);

export default EmployeeRoleRoutes;