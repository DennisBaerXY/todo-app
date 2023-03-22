import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model("users", userSchema);
