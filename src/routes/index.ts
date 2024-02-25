import express from "express";
import studentRoutes from "./students";
import awardsRoutes from "./awards";
import usersRoute from "./user";
import loginRoute from "./auth";

import { authenticate } from "../middlewares/auth";
const router = express.Router();

router.use("/api", loginRoute);
router.use("/api", usersRoute);

router.use("/api", authenticate, studentRoutes);

router.use("/api", authenticate, awardsRoutes);

export default router;
