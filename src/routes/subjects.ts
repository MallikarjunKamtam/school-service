import express, { NextFunction } from "express";
import {
  createSubject,
  deleteSubject,
  getAllsubjects,
  getSubjectById,
  updateSubject,
} from "../controllers/subjects";
import subjectSchema from "../validations/subjects";

const router = express.Router();

router.get("/subjects", getAllsubjects);
router.get("/subjects/:id", getSubjectById);

router.delete("/subject/:id", deleteSubject);

router.post("/subject", async (req, res, next: NextFunction) => {
  try {
    const { error, value } = subjectSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    return await createSubject(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.put("/subject/:id", async (req, res) => {
  try {
    const { error } = subjectSchema.validate(req.body, {
      abortEarly: false,
    });

    // If validation fails, respond with a 400 status code and details about the errors
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    return await updateSubject(req, res);
  } catch (error) {}
});

export default router;
