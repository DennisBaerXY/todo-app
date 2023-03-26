import express, { Express, Request, Response } from "express";

var morgan = require("morgan");
var dotenv = require("dotenv");
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI as string);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
	console.log("Connected successfully");
});

app.use(morgan("dev"));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
app.get("/", (req: Request, res: Response) => {
	res.send("Hello World");
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
