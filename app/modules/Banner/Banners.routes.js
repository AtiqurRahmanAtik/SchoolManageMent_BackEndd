import { Router } from "express";
import {
  createBanner,
  getAllBanners,
  getBannerById,
  getBannersByBranch,
  updateBanner,
  removeBanner,
} from "./Banners.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const BannerRoutes = Router();

// Protect all routes with authentication middleware
BannerRoutes.get("/",  getAllBanners);
BannerRoutes.get("/:branch/get-all", getBannersByBranch);
BannerRoutes.get("/get-id/:id",  getBannerById);
BannerRoutes.post("/post",  createBanner);
BannerRoutes.put("/update/:id",  updateBanner);
BannerRoutes.delete("/delete/:id",  removeBanner);

export default BannerRoutes;