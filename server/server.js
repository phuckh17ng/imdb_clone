import express, { json } from "express";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
const app = express();
app.use(json());

app.use("/api/showingmovie", movieRoutes);

app.listen(5000, () => {
	console.log("App listening on port 5000");
});
