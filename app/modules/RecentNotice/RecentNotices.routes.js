import { Router } from "express";

import {
  createRecentNotice,
  getAllRecentNotices,
  getRecentNoticeById,
  getRecentNoticesByBranch,
  updateRecentNotice,
  removeRecentNotice,
} from "./RecentNotices.controller.js";

import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const RecentNoticeRoutes = Router();

// Protect all routes with authentication middleware
RecentNoticeRoutes.get("/",  getAllRecentNotices);
RecentNoticeRoutes.get("/:branch/get-all", getRecentNoticesByBranch);
RecentNoticeRoutes.get("/get-id/:id",  getRecentNoticeById);
RecentNoticeRoutes.post("/post",  createRecentNotice);
RecentNoticeRoutes.put("/update/:id", updateRecentNotice);
RecentNoticeRoutes.delete("/delete/:id", removeRecentNotice);

export default RecentNoticeRoutes;