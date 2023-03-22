import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
	res.send("Hello Auth");
});

export default router;
