// middleware/auth.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/index";
require("dotenv");

const { SECRET_KEY_AUTH } = process.env;

export const authenticate = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Authentication failed!");
    }

    const decoded = jwt.verify(token, SECRET_KEY_AUTH);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error("User not found!");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed!" });
  }
};
