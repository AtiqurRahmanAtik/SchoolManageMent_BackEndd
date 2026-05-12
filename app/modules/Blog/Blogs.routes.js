import { Router } from "express";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByBranch,
  updateBlog,
  removeBlog,
} from "./Blogs.controller.js";

import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const BlogRoutes = Router();

// Protect all routes with authentication middleware
BlogRoutes.get("/", getAllBlogs);
BlogRoutes.get("/:branch/get-all", getBlogsByBranch);
BlogRoutes.get("/get-id/:id",  getBlogById);
BlogRoutes.post("/post",  createBlog);
BlogRoutes.put("/update/:id",  updateBlog);
BlogRoutes.delete("/delete/:id",  removeBlog);

export default BlogRoutes;