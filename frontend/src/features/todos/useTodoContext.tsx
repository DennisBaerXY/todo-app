import { useContext } from "react";
import { todoContext } from "./todoContext";

export const useTodoContext = () => {
	const context = useContext(todoContext);
	if (!context) {
		throw new Error("useTodoContext must be used within TodoProvider");
	}
	return context;
};
