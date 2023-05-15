import React, { useEffect, useState } from "react";

export const TodoItem = ({id, title, complete, onComplete, onDelete, ...props}) => {
	const [checked, setChecked] = useState(false);

	useEffect( () => {
		setChecked(complete);
	}, []);

	// When task completes
	const onCompleteCheck = () => {
		setChecked(!checked);
		onComplete(id);
	}

	// Delete
	const onDeleteTask = () => {
		if (window.confirm(`You're trying to remove "${title}" item. Please, confirm?`)) {
			onDelete(id);
		}
	}

	return (
		<div className="list-group-item todo-item">
			<div className="row">
				<TodoCheck
					onChange={onCompleteCheck}
					checked={checked ? true : false}
					{...props} />
				<TodoLabel value={title} complete={checked} />
				<TodoDelete onClick={onDeleteTask} />
			</div>
		</div>
	);
}

const TodoCheck = ({ onChange, ...props }) => {
	return (
		<div className="col-2 todo-item__checkbox">
			<input
				type="checkbox"
				className="form-control"
				onChange={ onChange }
				{...props}
			/>
		</div>
	);
}

const TodoLabel = ({ value, complete = false }) => {
	return (
		<div className="col-8 todo-item__title">
			<h3
				style={{
					color: complete ? 'silver' : '',
					textDecoration: complete ? 'line-through' : '',
				}}>
				{ value }
			</h3>
		</div>
	);
}

const TodoDelete = ({ onClick }) => {
	return (
		<div className="col-2 todo-item__delete">
			<button
				className="btn btn-danger"
				onClick={ onClick }>
				<span style={{fontSize: '24px', lineHeight: '16px'}}>x</span>
			</button>
		</div>
	);
}
