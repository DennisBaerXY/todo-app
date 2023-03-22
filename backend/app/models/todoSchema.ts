import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
	title: String,
	description: String,
	status: String,
	dueDate: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model("todo", todoSchema);
