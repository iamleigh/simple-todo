import React from "react";

import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, onComplete, onDelete }) => {
	// Return inserted todos
	const items = todos.map((todo, index) => {
		return (
			<TodoItem
				key={index}
				id={index}
				onComplete={onComplete}
				onDelete={onDelete}
				{...todo} />
		);
	});

	return <ul className="list-group todo-list">{items}</ul>;
}
