import { Router } from "express";
const router = Router();

import {
	addShowingMovies,
	getShowingMovies,
} from "../controllers/movieController.js";

router.get("/", getShowingMovies);
router.post("/", addShowingMovies);

export default router;
