import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header("Authorization")?.split(" ")[1];
	if (!token) {
		return res.status(401).json({
			msg: "No Permission",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
		req.user = decoded as User;
		next();
	} catch (error) {
		res.status(400).json({
			msg: "Token is not valid",
		});
	}
};

export default checkAuth;
