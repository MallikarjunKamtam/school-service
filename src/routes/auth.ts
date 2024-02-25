import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/index";
import bcrypt from "bcrypt";
require("dotenv");
const router = express.Router();
const { SECRET_KEY_AUTH, TOKEN_EXPIRE_TIME } = process.env;
import { authenticate } from "../middlewares/auth";

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body;
    const user = await User.findOne({ where: { user_name } });

    const hashedPassword = bcrypt.hashSync(password, 10);

    if (!user || !(await bcrypt.compare(password, hashedPassword))) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY_AUTH, {
      expiresIn: TOKEN_EXPIRE_TIME,
    });

    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/logout", authenticate, async (req: any, res: Response) => {
  try {
    const currentToken = req.header("Authorization")?.replace("Bearer ", "");

    if (currentToken) {
      const user = await User.findByPk(req.user.id);

      if (user) {
        await user.blacklistedTokens.push(currentToken);
        await user.save();
      } else {
        throw new Error("User not found");
      }
    } else {
      throw new Error("User not found");
    }

    res.send({ message: "Logout successful" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
