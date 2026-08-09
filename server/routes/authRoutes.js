import express from "express";

import { login, logout, setupPassword } from "../controllers/authController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyToken, (req, res) => {res.status(200).json({success: true,user: req.user,});});

router.post("/admin-setup-password", setupPassword);


export default router;