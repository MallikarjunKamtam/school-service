import { NextFunction, Request, Response } from "express";
import { User } from "../../models/index";
const bcrypt = require("bcrypt");

export const createUser = async (req, res) => {
  try {
    const { user_name, password, role } = req.body;

    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      user_name,
      password: hashedPassword,
      role,
    });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "User name already taken" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingUser = await User.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await existingUser.update(req.body);

    const updatedUser = await User.findByPk(id);

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingUser = await User.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await existingUser.destroy();

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
