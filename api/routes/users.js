import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.json({ message: "User authenticated successfully!" });
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.json({ message: "Hello User, logged in successfully!" });
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.json({ message: "Hello Admin, logged in successfully!" });
});

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", getUsers);

export default router;
