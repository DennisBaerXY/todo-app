import express from "express";
import checkAuth from "../middelware/auth";
import Todo from "../models/todoSchema";
import { CreateTodoBody } from "../models/todo";

const router = express.Router();

router.get("", checkAuth, async (req, res) => {
	console.log("🔎 getting todos...");
	const user = req.user!;
	const todos = await Todo.find({ userId: user.id }, { userId: 0 });

	console.log("🔎 todos found");
	res.status(200).json({
		todos,
	});
});

router.post("", checkAuth, async (req, res) => {
	const user = req.user!;
	const data = req.body as CreateTodoBody;
	console.log(data);

	try {
		const todo = new Todo({
			title: data.title,
			description: data.description,
			dueDate: data.dueDate,
			completed: false,
			userId: user.id,
		});
		await todo.save();
	} catch (error: any) {
		console.log(error);
		return res.status(400).json({
			msg: "Something went wrong " + error.toString(),
			error: error,
		});
	}

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

router.post("/:todoID", checkAuth, async (req, res) => {
	const user = req.user!;
	const todoId = req.params.todoID;
	const data = req.body as UpdateTodoBody;

	const todo = await Todo.findByIdAndUpdate(todoId, {
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

router.put("/:todoID/toggle", checkAuth, async (req, res) => {
	const user = req.user!;
	const todoId = req.params.todoID;
	const data = req.body as UpdateTodoBody;

	const todo = await Todo.findById(todoId);

	if (!todo) {
		return res.status(400).json({
			msg: "Todo not found",
		});
	}
	todo.completed = !todo.completed;
	await todo.save();

	res.json({
		msg: "Todo updated",
		todo,
	});
});

router.delete("/:todoID", checkAuth, async (req, res) => {
	const user = req.user!;
	const todoId = req.params.todoID;

	const todo = await Todo.findByIdAndDelete(todoId);

	if (!todo) {
		return res.status(400).json({
			msg: "Todo not found",
		});
	}

	res.json({
		msg: "Todo deleted",
	});
});

export default router;
