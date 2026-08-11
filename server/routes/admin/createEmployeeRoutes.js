import express from "express";
import {
  createEmployee, 
  getEmployees,
  getEmployeeById,
  updateEmployee,
  updateEmployeeStatus,
  deleteEmployee,

} from "../../controllers/admin/createEmployeeController.js";

import  verifyToken from "../../middleware/verifyToken.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();


router.post("/employees-create",verifyToken, authorize("ADMIN"),createEmployee);
router.get("/employees-get", verifyToken, authorize("ADMIN"), getEmployees);
router.get("/employees-get/:id", verifyToken, authorize("ADMIN"), getEmployeeById);
router.put("/employees-update/:id", verifyToken, authorize("ADMIN"), updateEmployee);
router.patch("/employees-update-status/:id", verifyToken, authorize("ADMIN"), updateEmployeeStatus);
router.delete("/employees-delete/:id", verifyToken, authorize("ADMIN"), deleteEmployee);


export default router;