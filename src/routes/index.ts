import express from "express";
import studentRoutes from "./students";
import awardsRoutes from "./awards";

const router = express.Router();

// Define routes for the '/api/students' endpoint
router.use("/api", studentRoutes);

// Define routes for the '/api/awards' endpoint
router.use("/api", awardsRoutes);

export default router;
