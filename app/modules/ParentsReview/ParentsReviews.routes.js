import { Router } from "express";

import {
  createParentsReview,
  getAllParentsReviews,
  getParentsReviewById,
  getParentsReviewsByBranch,
  updateParentsReview,
  removeParentsReview,
} from "./ParentsReviews.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const ParentsReviewRoutes = Router();

// Protect all routes with authentication middleware
ParentsReviewRoutes.get("/",  getAllParentsReviews);
ParentsReviewRoutes.get("/:branch/get-all", getParentsReviewsByBranch);
ParentsReviewRoutes.get("/get-id/:id",  getParentsReviewById);
ParentsReviewRoutes.post("/post", createParentsReview);
ParentsReviewRoutes.put("/update/:id",  updateParentsReview);
ParentsReviewRoutes.delete("/delete/:id",  removeParentsReview);

export default ParentsReviewRoutes;