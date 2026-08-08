import express from "express";
import {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  togglePlanStatus,
} from "../../controllers/superAdmin/subcriptionPlanController.js";
import  verifyToken from "../../middleware/verifyToken.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();

router.post("/subcription-create",verifyToken, authorize("SUPER_ADMIN"), createPlan);
router.get("/subcription-get", verifyToken, authorize("SUPER_ADMIN"),  getPlans);
router.get("/subcription-get/:id",verifyToken, authorize("SUPER_ADMIN"), getPlanById);
router.put("/subcription-update/:id", verifyToken, authorize("SUPER_ADMIN"), updatePlan);
router.patch("/subcription-update-status/:id", verifyToken, authorize("SUPER_ADMIN"), togglePlanStatus);


export default router;