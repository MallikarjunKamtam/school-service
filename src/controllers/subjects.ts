import { NextFunction, Request, Response } from "express";
import { Subject } from "../../models/index";

export const getAllsubjects = async (req: Request, res: Response) => {
  try {
    const subject = await Subject.findAll({
      attributes: ["id", "name", "description", "created_at", "updated_at"],
    });
    res.json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  const subjectId = req.params.id;

  try {
    const subject = await Subject.findByPk(subjectId);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newSubject = await Subject.create(req.body);

    return res
      .status(201)
      .json({ message: "Subject created successfully", subject: newSubject });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Subject name already exist" });
    }

    console.log(error, ">>>>>>>>>>>>>>>>>>>>>");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingSubject = await Subject.findByPk(id);

    if (!existingSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await existingSubject.update(req.body);

    const updatedSubject = await Subject.findByPk(id);

    return res.json({
      message: "Subject updated successfully",
      subject: updatedSubject,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingSubject = await Subject.findByPk(id);

    if (!existingSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await existingSubject.destroy();

    return res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
