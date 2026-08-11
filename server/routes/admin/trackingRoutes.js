import express from "express";
import {
  updateLocation,
  getCompanyLiveLocations,
  getEmployeeHistory

} from "../../controllers/admin/trackingController.js";

import  verifyToken from "../../middleware/verifyToken.js";
import { authorize } from "../../middleware/authorize.js";
// Mobile App API
router.post('/update', verifyToken, updateLocation);

// ERP Admin Dashboard APIs
router.get('/live/:companyId', verifyToken,  getCompanyLiveLocations);
router.get('/history/:employeeId', verifyToken, getEmployeeHistory);

module.exports = router;