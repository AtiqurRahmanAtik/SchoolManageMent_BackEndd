import {
  createUser,
  getAllUsers,
  getUserByBranch,
  getUserById,
  removeUser,
  updateUser,
  loginUser,
  logoutUser,
  changePassword,
} from "./Users.controller.js";
import jwt from "jsonwebtoken";
import passport from 'passport';
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 
import { Router } from "express";



const UserRoutes = Router();


UserRoutes.post("/login", loginUser); // Login does not require a token
UserRoutes.post("/post", createUser); // If creating a user should also be public

UserRoutes.get("/",  getAllUsers);
UserRoutes.get("/:branch/get-all",  getUserByBranch);
UserRoutes.get("/get-id/:id",  getUserById);
UserRoutes.post("/logout",  logoutUser);
UserRoutes.delete("/delete/:id",  removeUser);
UserRoutes.put("/update/:id",  updateUser);

UserRoutes.put("/change-password", changePassword);


export default UserRoutes;