import React, { useContext, useEffect } from "react";
import {
	useAuthHeader,
	useAuthUser,
	useIsAuthenticated,
	useSignOut,
} from "react-auth-kit";
import ITodo, { ITodoRequest } from "../features/todos/Todo";
import DeleteTrash from "@assets/delete_white_24.svg";
import { todoContext } from "../features/todos/todoContext";
import TodoList from "../features/todos/TodoList";
import { Link, Navigate } from "react-router-dom";

const Dashboard = () => {
	const authHeader = useAuthHeader();
	const auth = useAuthUser();
	const signOut = useSignOut();
	const isAuthenticated = useIsAuthenticated();
	const apiBasePath = import.meta.env.APIBASE_PATH || "http://backend-service";

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}
	const context = useContext(todoContext);
	const fetchAllTodos = async () => {
		if (!isAuthenticated) {
			console.log("Not Authenticated");
			return;
		}
		const response = await fetch(apiBasePath + "/todos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: authHeader(),
			},
		});

		if (response.status === 401) {
			console.log("Unauthorized");
		}
		if (response.ok) {
			const resData = (await response.json()) as ITodoRequest;

			context.setTodos(resData.todos);

			console.log(resData.todos);
		}
	};

	const removeTodo = (id: string) => {
		context.setTodos(context.todos.filter((todo) => todo._id !== id));
	};

	useEffect(() => {
		fetchAllTodos();
	}, []);

	return (
		<div className="h-screen p-5">
			<div className=" flex justify-end">
				<button
					className="btn btn-secondary"
					onClick={() => {
						signOut();
					}}
				>
					Log Out
				</button>
			</div>
			<h1 className="text-5xl font-bold text-center">
				Todos - {auth()!.username}
			</h1>

			<div className="flex justify-center">
				<div className="flex flex-col w-full max-w-screen-lg ">
					<div className="flex justify-between my-10">
						<h2 className="text-3xl font-bold">Todos</h2>
						<Link to={"/create"}>
							<button className="btn btn-secondary ">+ New Todo</button>
						</Link>
					</div>
					<TodoList todos={context.todos} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
