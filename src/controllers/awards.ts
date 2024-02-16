// src/controllers/awardController.ts
import { NextFunction, Request, Response } from "express";
import { Awards } from "../../models/index";

export const getAllAwards = async (req: Request, res: Response) => {
  try {
    const awards = await Awards.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "points",
        "created_at",
        "updated_at",
      ],
    });
    res.json(awards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAwardById = async (req: Request, res: Response) => {
  const awardId = req.params.id;

  try {
    const award = await Awards.findByPk(awardId);

    if (!award) {
      return res.status(404).json({ message: "Awards not found" });
    }

    res.json(award);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createAward = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newAward = await Awards.create(req.body);

    return res
      .status(201)
      .json({ message: "Awards created successfully", award: newAward });
  } catch (error) {
    next(error);
  }
};

export const updateAward = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingAward = await Awards.findByPk(id);

    if (!existingAward) {
      return res.status(404).json({ message: "Awards not found" });
    }

    await existingAward.update(req.body);

    const updatedAward = await Awards.findByPk(id);

    return res.json({
      message: "Awards updated successfully",
      award: updatedAward,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAward = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingAward = await Awards.findByPk(id);

    if (!existingAward) {
      return res.status(404).json({ message: "Awards not found" });
    }

    await existingAward.destroy();

    return res.json({ message: "Awards deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
