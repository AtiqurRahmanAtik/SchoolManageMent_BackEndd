import { Router } from "express";
import {
  createExamination,
  getAllExaminations,
  getExaminationById,
  getExaminationsByBranch,
  updateExamination,
  removeExamination,
} from "./Examination.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const ExaminationRoutes = Router();

// Protect all routes with authentication middleware
ExaminationRoutes.get("/",  getAllExaminations);
ExaminationRoutes.get("/:branch/get-all",  getExaminationsByBranch);
ExaminationRoutes.get("/get-id/:id",  getExaminationById);
ExaminationRoutes.post("/post",  createExamination);
ExaminationRoutes.put("/update/:id",  updateExamination);
ExaminationRoutes.delete("/delete/:id",  removeExamination);


export default ExaminationRoutes;