import express from "express";
import { forgotPassword, getUser, login, logout, register, resetPassword, updatePassword, verifyOTP, verifyPasswordOtp} from "../controllers/authControllers.js"
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.post("/password/forgot", forgotPassword);
router.post("/password/verify-otp", verifyPasswordOtp);
router.put("/password/reset", resetPassword);
router.put("/password/update",isAuthenticated, updatePassword);

export default router