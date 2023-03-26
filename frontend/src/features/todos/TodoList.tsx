import React, { useContext, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Link } from "react-router-dom";
import ITodo from "./Todo";
import { todoContext } from "./todoContext";
import TodoItem from "./TodoItem";
import { useTodoContext } from "./useTodoContext";

type Props = {
	todos: ITodo[];
};

const TodoList = ({ todos }: Props) => {
	const authHeader = useAuthHeader();
	const [isLoading, setIsLoading] = useState(false);

	const context = useTodoContext();
	const deleteTodo = async (id: string) => {
		setIsLoading(true);
		const response = await fetch(`/api/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: authHeader(),
			},
		});

		if (response.ok) {
			console.log("Deleted");
			await context.fetchAll();
		}
		setIsLoading(false);
	};
	const toggleTodo = async (id: string) => {
		setIsLoading(true);
		const response = await fetch(`/api/todos/${id}/toggle`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: authHeader(),
			},
		});

		if (response.ok) {
			console.log("Toggled");
			await context.fetchAll();
		}

		setIsLoading(false);
	};

	if (todos.length === 0)
		return (
			<div className="card w-full sm:max-w-xl bg-base-100 shadow-xl mx-auto">
				<figure>
					<img
						src="https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif"
						alt="No Todos"
					/>
				</figure>
				<div className="card-body">
					<h4 className="card-title">Your Todo list is empty</h4>
					<p>
						Looks like you don't have any todos yet! Don't worry, it's easy to
						get started. Just click on the "NEW Todo" button to create your
						first Todo.
					</p>
					<div className="card-actions justify-end">
						<Link to="/create">
							<button className="btn btn-secondary">+ NEW TODO</button>
						</Link>
					</div>
				</div>
			</div>
		);

	return (
		<div className="flex flex-col gap-4">
			{todos.map((todo) => (
				<TodoItem
					todo={todo}
					deleteTodo={deleteTodo}
					toggleTodo={toggleTodo}
					key={todo._id}
					isLoading={isLoading}
				/>
			))}
		</div>
	);
};

export default TodoList;
