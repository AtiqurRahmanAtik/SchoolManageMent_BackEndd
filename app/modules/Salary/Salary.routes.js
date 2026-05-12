import { Router } from "express";
import {
  createSalary,
  getAllSalaries,
  getSalaryById,
  getSalariesByBranch,
  updateSalary,
  removeSalary,
} from "./Salary.controller.js";

const SalaryRoutes = Router();

SalaryRoutes.get("/", getAllSalaries);
SalaryRoutes.get("/:branch/get-all", getSalariesByBranch);
SalaryRoutes.get("/get-id/:id", getSalaryById);
SalaryRoutes.post("/post", createSalary);
SalaryRoutes.put("/update/:id", updateSalary);
SalaryRoutes.delete("/delete/:id", removeSalary);

export default SalaryRoutes;