import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	completed: Boolean,

	dueDate: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
});

export default mongoose.model("Todo", todoSchema);
