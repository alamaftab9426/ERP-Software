import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true, 
    credentials: true,
  })
);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running Successfully",
  });
});

// Super Admin Routes
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/superAdminRoutes/companyRoutes.js";
import SubscriptionPlan from "./routes/superAdminRoutes/subcriptionRoutes.js";

// Admin Routes
import department from "./routes/admin/departmentRoutes.js";
import  createEmployee  from "./routes/admin/createEmployeeRoutes.js";
import trackingRoutes from "./routes/admin/trackingRoutes.js";





app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/subscription", SubscriptionPlan);

// Admin Routes
app.use("/api/admin/department", department);
app.use("/api/admin/employee", createEmployee)
app.use("/api/admin/tracking", trackingRoutes)



// app.use("/api/employee", employeeRoutes);
// Error Middleware// app.use(errorHandler);

export default app;