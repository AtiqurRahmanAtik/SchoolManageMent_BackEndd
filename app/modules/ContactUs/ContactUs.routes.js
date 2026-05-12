import { Router } from "express";

import {
  createContactUs,
  getAllContactUs,
  getContactUsById,
  getContactUsByBranch,
  updateContactUs,
  removeContactUs,
} from "./ContactUs.controller.js";

import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const ContactUsRoutes = Router();

// Protect all routes with authentication middleware
ContactUsRoutes.get("/",  getAllContactUs);
ContactUsRoutes.get("/:branch/get-all",  getContactUsByBranch);
ContactUsRoutes.get("/get-id/:id",  getContactUsById);
ContactUsRoutes.post("/post",  createContactUs);
ContactUsRoutes.put("/update/:id",  updateContactUs);
ContactUsRoutes.delete("/delete/:id",  removeContactUs);

export default ContactUsRoutes;