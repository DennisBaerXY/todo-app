import express from "express";
import checkAuth from "../middelware/auth";

const router = express.Router();

router.get("/test", checkAuth, async (req, res) => {
	res.send("Hello Auth and User " + req.body.user.username);
});

export default router;
