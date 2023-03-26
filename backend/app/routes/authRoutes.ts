import express from "express";
import User from "../models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();

interface RegisterBody {
	username: string;
	email: string;
	password: string;
}

interface AuthResponse {
	token: string;
	expiresIn: number;
	authState: {
		_id: string;
		username: string;
	};
	msg?: string;
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

	console.log("🔎 checking if user already exists...");

	const user = await User.findOne({ email: data.email });
	if (user) {
		console.log("👀 user already exists");
		return res.status(500).json({
			msg: "🦄Ups.  This email is already in use.🦄",
		});
	}

	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(data.password, salt);

	const newUser = new User({
		username: data.username,
		email: data.email,
		password: hashedPassword,
	});
	console.log("🌟saving new user...");
	await newUser.save();
	console.log("🌟new user saved");

	if (!process.env.JWT_SECRET) {
		console.log("🔥JWT_SECRET not found");

		await newUser.deleteOne();
		return res.status(500).json({
			msg: "Ups. Something went wrong. Please try again later.🐶",
		});
	}
	// Check if fields are empty
	const token = signToken(newUser._id.toString(), newUser.username);

	console.log(token);
	const response: AuthResponse = {
		token: token,
		expiresIn: 3600,
		authState: {
			_id: newUser._id.toString(),
			username: newUser.username,
		},
		msg: "🦄Registration successful🦄",
	};
	res.status(200).json(response);
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
	const token = signToken(userDoc._id.toString(), userDoc.username);

	const response: AuthResponse = {
		token: token,
		expiresIn: 3600,
		authState: {
			_id: userDoc._id.toString(),
			username: userDoc.username,
		},
		msg: "🦄Login Successful🦄",
	};
	console.log(`🌟 ${data.username} logged in successfully`);

	res.status(200).json(response);
});

const signToken = (id: string, username: string) => {
	return jwt.sign({ id, username }, process.env.JWT_SECRET as string, {
		expiresIn: 3600,
	});
};

export default router;
