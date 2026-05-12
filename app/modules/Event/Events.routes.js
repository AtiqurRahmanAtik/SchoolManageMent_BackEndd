import { Router } from "express";

import {
  createEvent,
  getAllEvents,
  getEventById,
  getEventsByBranch,
  updateEvent,
  removeEvent,
} from "./Events.controller.js";

import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const EventRoutes = Router();

// Protect all routes with authentication middleware
EventRoutes.get("/",  getAllEvents);
EventRoutes.get("/:branch/get-all",  getEventsByBranch);
EventRoutes.get("/get-id/:id", getEventById);
EventRoutes.post("/post",  createEvent);
EventRoutes.put("/update/:id",  updateEvent);
EventRoutes.delete("/delete/:id",  removeEvent);

export default EventRoutes;