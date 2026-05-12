import { Router } from "express";
import {
  createTransactionLog,
  getAllTransactionLogs,
  getTransactionLogById,
  removeTransactionLog,
  getSuperAdminTransactionLogs,
  getPaginatedTransactionLogs,
  getTransactionLogsByBranch,
} from "./TransactionLog.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const TransactionLogRoutes = Router();

// Protect all routes with authentication middleware
TransactionLogRoutes.get("/",  getAllTransactionLogs);
TransactionLogRoutes.get("/paginated",  getPaginatedTransactionLogs);
TransactionLogRoutes.get("/:branch/get-all",  getTransactionLogsByBranch);
TransactionLogRoutes.get("/get-id/:id",  getTransactionLogById);
TransactionLogRoutes.post("/create",  createTransactionLog);
TransactionLogRoutes.delete("/delete/:id", removeTransactionLog);
TransactionLogRoutes.get("/superadmin/all",  /* adminOnly, */ getSuperAdminTransactionLogs);

export default TransactionLogRoutes;