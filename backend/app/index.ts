import express, { Express, Request, Response } from "express";

var morgan = require("morgan");
var dotenv = require("dotenv");
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL =
	process.env.MONGODB_SERVER + ":27017/todo-app"
		? process.env.MONGODB_SERVER
		: "localhost:27017/todo-app";
if (!process.env.MONGODB_SERVER) {
	console.error("Please define the MONGODB_SERVER environment variable");
	process.exit(1);
}

let MONGO_URI = MONGO_URL;
// Connect to MongoDB with password
const mongoUser = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
console.log("Mongo Authentication: " + mongoUser + " " + mongoPassword);
// create a pretty print for all the mongodb related env variables
const mongoAuth =
	mongoUser && mongoPassword ? `${mongoUser}:${mongoPassword}@` : "";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB = "todo-app";
MONGO_URI = `mongodb://${mongoAuth}${MONGO_URI}`;
console.log("Mongo Connection String " + MONGO_URI);

mongoose.connect(MONGO_URI);

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
