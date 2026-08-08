import express from "express";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  updateDepartmentStatus,
  deleteDepartment,
} from "../../controllers/admin/departmentController.js";

import  verifyToken from "../../middleware/verifyToken.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();


router.post("/create", verifyToken, authorize("ADMIN"),createDepartment);
router.get("/get-department", verifyToken, authorize("ADMIN"),getDepartments);
router.get("/get-departments/:id", verifyToken,  authorize("ADMIN", "HR"),getDepartmentById);
router.put("/update-departments/:id", verifyToken, authorize("ADMIN"), updateDepartment);
router.patch("/update-departments/:id/status", verifyToken, authorize("ADMIN", "HR"),updateDepartmentStatus);
// Soft Delete Department - Restricted to ADMIN role
router.delete("/admin/departments/:id",authorize("ADMIN"), deleteDepartment);

export default router;