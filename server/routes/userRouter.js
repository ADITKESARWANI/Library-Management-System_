import express from "express";
import { getAllUsers, registerNewAdmin, requestDeleteOTP, deleteAccount } from "../controllers/userControllers.js";
import { isAuthenticated, isAuthorized} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUsers);
router.post("/add/new-admin", isAuthenticated, isAuthorized("Admin"), registerNewAdmin);

router.post("/delete/request-otp", isAuthenticated, requestDeleteOTP);
router.delete("/delete", isAuthenticated, deleteAccount);

export default router;