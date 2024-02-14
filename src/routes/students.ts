import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  createManyStudents,
} from "../controllers/students";
import studentSchema from "../validations/students";

const router = express.Router();

router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);

router.delete("/student/:id", deleteStudent);

router.post("/student", async (req, res) => {
  try {
    // Validate the request body against the Joi schema
    const { error, value } = studentSchema.validate(req.body, {
      abortEarly: false,
    });

    // If validation fails, respond with a 400 status code and details about the errors
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    return await createStudent(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/many-students", async (req, res) => {
  try {
    const responseArr = [];
    const reqArr = req.body.data;
    for await (const student of reqArr) {
      const { error, value } = studentSchema.validate(student, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((e) => e.message) });
      }

      const response = await createManyStudents(student);
      responseArr.push(response);
    }

    return res
      .status(201)
      .json({ message: "Created multiple records successfully", data: reqArr });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/student/:id", async (req, res) => {
  try {
    const { error } = studentSchema.validate(req.body, {
      abortEarly: false,
    });

    // If validation fails, respond with a 400 status code and details about the errors
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    return await updateStudent(req, res);
  } catch (error) {}
});

export default router;
