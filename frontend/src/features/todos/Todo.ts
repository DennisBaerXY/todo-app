export default interface ITodo {
	_id: string;
	title: string;
	description: string;
	completed: boolean;
	dueDate: Date;
	createdAt: Date;
	userId: string;
}

export interface ITodoRequest {
	todos: ITodo[];
}
