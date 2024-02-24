import express from "express";
const router = express.Router();
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user";
import userSchema from "../validations/user";

router.post("/user", async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    return await createUser(req, res);
  } catch (error) {
    if (+error.code === 23505) {
      res.status(500).json({ error: "User name already taken" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body, {
      abortEarly: false,
    });

    // If validation fails, respond with a 400 status code and details about the errors
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    return await updateUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/users", getAllUsers);

router.get("/user/:id", getUserById);

router.delete("/user/:id", deleteUser);

export default router;
