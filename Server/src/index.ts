import express from "express";
import { Router } from "./routes/routes";
import cors from "cors";
import { connecToDatabase } from "./db/conn";

require("dotenv").config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(cors());
app.use(Router);
const port: string = process.env.PORT || "3000";

// Run the server
app.listen(port, async () => {
	// perform Database connection when the server starts
	await connecToDatabase();
	console.log(`listening to port ${port}`);
});

// Server Api Endpoints
// Decks Api
