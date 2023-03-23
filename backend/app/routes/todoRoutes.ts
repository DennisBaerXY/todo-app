import express from "express";
import checkAuth from "../middelware/auth";
import Todo from "../models/todoSchema";
import { CreateTodoBody } from "../models/todo";

const router = express.Router();

router.get("", checkAuth, async (req, res) => {
	const user = req.user!;
	const todos = await Todo.find({ userId: user.id }, { userId: 0 });

	res.status(200).json({
		todos,
	});
});

router.post("/create", checkAuth, async (req, res) => {
	const user = req.user!;
	const data = req.body as CreateTodoBody;
	const todo = new Todo({
		title: data.title,
		description: data.description,
		dueDate: data.dueDate,
		completed: false,
		userId: user.id,
	});
	await todo.save();
	res.status(200).json({
		msg: "Todo created",
	});
});

interface UpdateTodoBody {
	_id: string;
	title: string;
	description: string;
	completed: boolean;
}

router.post("/update", checkAuth, async (req, res) => {
	const user = req.user!;
	const data = req.body as UpdateTodoBody;

	const todo = await Todo.findByIdAndUpdate(data._id, {
		title: data.title,
		description: data.description,
		completed: data.completed,
	});

	if (!todo) {
		return res.status(400).json({
			msg: "Todo not found",
		});
	}

	res.json({
		msg: "Todo updated",
	});
});

export default router;
