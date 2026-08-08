import express from "express";
import {
createEmployee
} from "../../controllers/admin/createEmployeeController.js";

import  verifyToken from "../../middleware/verifyToken.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();


router.post("/create",verifyToken, authorize("ADMIN"),createEmployee);


export default router;