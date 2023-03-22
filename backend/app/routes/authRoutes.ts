import express from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

interface RegisterBody {
	username: string;
	email: string;
	password: string;
}
// Routes stat with /auth
router.post("/register", async (req, res) => {
	const data = req.body as RegisterBody;
	console.log(data);
	if (!data.username || !data.email || !data.password) {
		return res.status(400).json({
			msg: "Ups. Something went wrong. Have you provided a username, email and password?🦆",
		});
	}

	const user = await User.findOne({ email: data.email });
	if (user) {
		return res.status(400).json({
			msg: "🦄Ups. Something went wrong. This email is already in use.🦄",
		});
	}

	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(data.password, salt);

	const newUser = new User({
		username: data.username,
		email: data.email,
		password: hashedPassword,
	});
	await newUser.save();

	if (!process.env.JWT_SECRET) {
		return res.status(500).json({
			msg: "Ups. Something went wrong. Please try again later.🐶",
		});
	}
	const token = jwt.sign(
		{ id: newUser._id },
		process.env.JWT_SECRET as string,
		{
			expiresIn: "1h",
		}
	);

	res.status(200).json({
		token: "Bearer " + token,
	});
});

interface LoginBody {
	username: string;
	password: string;
}

router.post("/login", async (req, res) => {
	const data = req.body as LoginBody;
	console.log(`${data.username} is trying to login`);

	if (!data.username || !data.password) {
		return res.status(400).json({
			msg: "Ups. Something went wrong. Have you provided a username and password?",
		});
	}

	const userDoc = await User.findOne({ username: data.username });
	if (!userDoc) {
		return res.status(400).json({
			msg: "Username or password is incorrect.",
		});
	}

	const isMatch = await bcrypt.compare(
		data.password,
		userDoc.password as string
	);
	if (!isMatch) {
		return res.status(400).json({
			msg: "Username or password is incorrect.",
		});
	}

	if (!process.env.JWT_SECRET) {
		return res.status(500).json({
			msg: "Ups. Something went wrong. Please try again later.",
		});
	}
	const token = jwt.sign(
		{ id: userDoc._id },
		process.env.JWT_SECRET as string,
		{
			expiresIn: "1h",
		}
	);

	res.status(200).json({
		token: "Bearer " + token,
		msg: "Login successful",
	});
});

export default router;
