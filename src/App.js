import React, { useEffect, useRef, useState } from "react";

import { TodoList } from "./components/TodoList";

const useDidUpdate = (callback, deps) => {
	const hasMount = useRef(false);

	useEffect(() => {
		if (hasMount.current) {
			callback();
		} else {
			hasMount.current = true;
		}
	}, deps);
}

const getLocalData = (item) => {
	const savedData = localStorage.getItem(item);

	if (!savedData) {
		return [];
	}

	return JSON.parse(savedData);
}

export const App = () => {
	const [title, setTitle] = useState('');
	const [todos, setTodos] = useState(getLocalData('et-todos'));

	// Render saved data on component mount
	useDidUpdate(() => {
		localStorage.setItem('et-todos', JSON.stringify(todos));
	}, [todos]);

	// Update title
	const _onChangeTitle = (e) => {
		const title = e.target.value;
		setTitle(title);
	}

	// Submit new todo
	const _onClickAdd = () => {
		if ('undefined' !== typeof title && '' !== title) {
			setTodos([
				...todos,
				{
					id: todos.length,
					title: title,
					complete: false
				}
			]);

			// Clean input value
			document.getElementById('new-todo').value = '';
		}

		setTitle('');
	}

	const _onEnterPressAdd = (e) => {
		if (13 === e.keyCode) {
			_onClickAdd();
		}
	}

	// On completed todo
	const _onCompleteTodo = (id) => {
		const updatedTodo = [...todos];
		updatedTodo[id].complete = !updatedTodo[id].complete;

		setTodos(updatedTodo);
	}

	// On deleted todo
	const _onDeleteTodo = (id) => {
		const updatedTodo = todos.filter((todo) => todo.id !== id);

		setTodos([...updatedTodo]);
	}

	// Define input props
	const inputProps = {
		name: 'title',
		placeholder: 'What do you need to do?',
		onChange: _onChangeTitle,
		onKeyDown: _onEnterPressAdd
	}

	// Define submit props
	const submitProps = {
		onClick: _onClickAdd
	}

	return (
		<Container>
			<Header
				title='ToDo'
				inputProps={inputProps}
				submitProps={submitProps} />

			<div className="card-body">
				<TodoList
					todos={todos}
					onComplete={_onCompleteTodo}
					onDelete={_onDeleteTodo} />
			</div>
		</Container>
	);
}

const Container = ({children}) => {
	return (
		<div className="container">
			<div className="row">
				<div className="col col-md-6 offset-md-3 mt-2">
					<div className="todos-app card">
						{ children }
					</div>
				</div>
			</div>
		</div>
	);
}

const Header = ({ title, inputProps, submitProps }) => {
	return (
		<div className="todos-app-header card-header">
			{'' !== title && <h2>{title}</h2>}
			<div className="input-group">
				<input type="text" id="new-todo" className="form-control add-new-todo" {...inputProps} />
				<div className="input-group-append">
					<button type="button" className="btn btn-success" {...submitProps}>
						<span style={{fontSize: '24px', lineHeight: '16px'}}>+</span>
					</button>
				</div>
			</div>
		</div>
	);
}