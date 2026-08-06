import express from "express";

import { login, setupPassword } from "../controllers/authController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", verifyToken, (req, res) => {res.status(200).json({success: true,user: req.user,});});

// admin/company create own password with the help of setupToken which is generated during company creation by super admin
router.post("/admin-setup-password", setupPassword);


export default router;
