import express from "express";
import checkAuth from "../middelware/auth";

const router = express.Router();

router.get("/test", checkAuth, (req, res) => {
	res.send("Hello Auth");
});

export default router;
