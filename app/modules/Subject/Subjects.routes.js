import { Router } from "express";
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  getSubjectsByBranch,
  updateSubject,
  removeSubject,
} from "./Subjects.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const SubjectRoutes = Router();

// Protect all routes with authentication middleware
SubjectRoutes.get("/",  getAllSubjects);
SubjectRoutes.get("/:branch/get-all",  getSubjectsByBranch);
SubjectRoutes.get("/get-id/:id",  getSubjectById);
SubjectRoutes.post("/post", createSubject);
SubjectRoutes.put("/update/:id",  updateSubject);
SubjectRoutes.delete("/delete/:id",  removeSubject);

export default SubjectRoutes;