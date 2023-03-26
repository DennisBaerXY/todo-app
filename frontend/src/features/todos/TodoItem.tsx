import React, { useState } from "react";
import ITodo from "./Todo";
import DeleteTrash from "@assets/delete_white_24.svg";
type TodoItemProps = {
	todo: ITodo;
	deleteTodo: (id: string) => void;
	toggleTodo: (id: string) => void;
	isLoading: boolean;
};
export default function TodoItem({
	todo,
	deleteTodo,
	toggleTodo,
	isLoading,
}: TodoItemProps) {
	const [isDone, setIsDone] = useState(todo.completed);
	return (
		<div
			className={`flex flex-col shadow-lg rounded-md p-5 ${
				isDone ? "bg-base-200" : "bg-base-100"
			}`}
		>
			<div className="flex justify-between">
				<h3 className="text-2xl font-bold">{todo.title}</h3>
				<div className="flex content-center">
					<input
						type="checkbox"
						checked={isDone}
						className="checkbox checkbox-success h-12 w-12 mr-2  "
						onClick={() => {
							if (!isLoading) {
								setIsDone(!isDone);
								toggleTodo(todo._id);
							}
						}}
					/>
					<button
						className="btn btn-error"
						onClick={() => {
							if (!isLoading) {
								deleteTodo(todo._id);
							}
						}}
					>
						<img src={DeleteTrash} />
					</button>
				</div>
			</div>
			<p className="text-xl">{todo.description}</p>
		</div>
	);
}
