import React, { useState } from "react";

export const todoContext = React.createContext({
	todos: [],
	setTodos: (todos: any) => {},
});

type Props = {
	children: React.ReactNode;
};

const TodoProvider = ({ children }: Props) => {
	const [todos, setTodos] = useState([]);
	return (
		<todoContext.Provider value={{ todos, setTodos }}>
			{children}
		</todoContext.Provider>
	);
};

export default TodoProvider;
