// src/controllers/studentController.ts
import { Request, Response } from "express";
import { Student } from "../../models/index";

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const newStudent = await Student.create(req.body);

    return res
      .status(201)
      .json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBody = req.body;
 

    
    const existingStudent = await Student.findByPk(id);

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    await existingStudent.update(req.body);

    const updatedStudent = await Student.findByPk(id);

    return res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
