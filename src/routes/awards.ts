import express, { NextFunction } from "express";
import {
  getAllAwards,
  getAwardById,
  createAward,
  updateAward,
  deleteAward,
} from "../controllers/awards";
import awardSchema from "../validations/awards";

const router = express.Router();

router.get("/awards", getAllAwards);
router.get("/awards/:id", getAwardById);

router.delete("/award/:id", deleteAward);

router.post("/award", async (req, res, next: NextFunction) => {
  try {
    // Validate the request body against the Joi schema
    const { error, value } = awardSchema.validate(req.body, {
      abortEarly: false,
    });

    // If validation fails, respond with a 400 status code and details about the errors
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    return await createAward(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.put("/award/:id", async (req, res) => {
  try {
    const { error } = awardSchema.validate(req.body, {
      abortEarly: false,
    });

    // If validation fails, respond with a 400 status code and details about the errors
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    return await updateAward(req, res);
  } catch (error) {}
});

export default router;
