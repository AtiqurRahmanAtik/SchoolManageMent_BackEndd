import { Router } from "express";
import {
  createNotice,
  getAllNotices,
  getNoticeById,
  getNoticesByBranch,
  updateNotice,
  removeNotice,
} from "./Notice.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const NoticeRoutes = Router();

NoticeRoutes.get("/",  getAllNotices);
NoticeRoutes.get("/:branch/get-all",  getNoticesByBranch);
NoticeRoutes.get("/get-id/:id",  getNoticeById);
NoticeRoutes.post("/post", createNotice);
NoticeRoutes.put("/update/:id",  updateNotice);
NoticeRoutes.delete("/delete/:id",  removeNotice);

export default NoticeRoutes;