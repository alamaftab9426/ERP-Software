import express from "express";
import {
  createLocationHistory,
  getEmployeeHistory,
  getLatestLocation,
  getCompanyLatestLocations,
} from "../controllers/locationHistoryController.js";

const router = express.Router();

import verifyToken from "../middleware/verifyToken.js"
import { authorize } from "../middleware/authorize.js";

router.post("/",verifyToken,  createLocationHistory);
router.get("/employee/:employeeId", verifyToken, authorize("ADMIN"),  getEmployeeHistory);
router.get("/employee/:employeeId/latest", verifyToken, authorize("ADMIN"), getLatestLocation);
router.get("/company/latest",verifyToken,authorize("ADMIN"),getCompanyLatestLocations
);

export default router;