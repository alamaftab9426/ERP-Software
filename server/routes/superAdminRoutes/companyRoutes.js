import express from "express";
import { createCompany, getCompanies, getCompanyById, updateCompany, updateCompanyStatus,deleteCompany } from "../../controllers/superAdmin/companyController.js";
import  verifyToken from "../../middleware/verifyToken.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();

router.post("/companies-create",verifyToken, authorize("SUPER_ADMIN"), createCompany);
router.get("/companies-get", verifyToken, authorize("SUPER_ADMIN"),  getCompanies);
router.get("/companies-get/:id",verifyToken, authorize("SUPER_ADMIN"),getCompanyById);
router.put("/companies-update/:id", verifyToken, authorize("SUPER_ADMIN"), updateCompany);
router.patch("/companies-update-status/:id", verifyToken, authorize("SUPER_ADMIN"), updateCompanyStatus);
router.delete("/companies-delete/:id", verifyToken, authorize("SUPER_ADMIN"),deleteCompany);


export default router;