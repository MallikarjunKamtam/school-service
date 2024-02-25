import express from "express";
import studentRoutes from "./students";
import awardsRoutes from "./awards";
import usersRoute from "./user";
import loginRoute from "./auth";
import subjectRoute from "./subjects";

import { authenticate } from "../middlewares/auth";
const router = express.Router();

const basePath = "/api";

router.use(basePath, loginRoute);
router.use(basePath, usersRoute);
router.use(basePath, authenticate, studentRoutes);
router.use(basePath, authenticate, subjectRoute);
router.use(basePath, authenticate, awardsRoutes);

export default router;
