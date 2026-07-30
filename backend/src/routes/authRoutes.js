import express from "express";

import {
    deleteProfile,
    getProfile,
    loginUser,
    registerUser,
    updatePassword,
    updateProfile,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router
    .route("/profile")
    .get(protect, getProfile)
    .patch(protect, updateProfile)
    .delete(protect, deleteProfile);

router.patch("/password", protect, updatePassword);

export default router;
