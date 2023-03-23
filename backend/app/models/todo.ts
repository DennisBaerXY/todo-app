export interface CreateTodoBody {
	title: string;
	description: string;
	dueDate: Date;
}

export interface Todo {
	id: string;
	title: string;
	description: String;
	dueDate: Date;
	completed: boolean;

	userId: string;
}
