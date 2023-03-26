import React, { createContext, useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import ITodo, { ITodoRequest } from "./Todo";

export const todoContext = createContext({
	todos: [] as ITodo[],
	setTodos: (todos: ITodo[]) => {},
	fetchAll: async () => {},
});

type Props = {
	children: React.ReactNode;
};

const TodoProvider = ({ children }: Props) => {
	const [todos, setTodos] = useState<ITodo[]>([]);
	const auth = useAuthUser();
	const authHeader = useAuthHeader();

	const isAuthenticated = auth();

	const fetchAllTodos = async () => {
		if (!isAuthenticated) {
			console.log("Not Authenticated");
			return;
		}
		const response = await fetch("/api/todos", {
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

			setTodos(resData.todos);

			console.log(resData.todos);
		}
	};

	useEffect(() => {
		fetchAllTodos();
	}, []);

	return (
		<todoContext.Provider value={{ todos, setTodos, fetchAll: fetchAllTodos }}>
			{children}
		</todoContext.Provider>
	);
};

export default TodoProvider;
