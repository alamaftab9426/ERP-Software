import express from "express";
import { createCompany, getCompanies } from "../../controllers/superAdmin/companyController.js";
import  verifyToken from "../../middleware/verifyToken.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();

router.post("/companies-create",verifyToken, authorize("SUPER_ADMIN"), createCompany);
router.get("/companies-get", verifyToken, authorize("SUPER_ADMIN"),  getCompanies);


// Create Company - Restricted strictly to SUPER_ADMIN

export default router;