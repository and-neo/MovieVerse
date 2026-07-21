import express from "express";

import { searchMediaController } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", searchMediaController);

export default router;
