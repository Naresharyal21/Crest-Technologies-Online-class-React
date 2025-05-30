import React, { useState } from 'react'

const EditTodoForm = (props) => {
    const { handleAddTodo, todo } = props;

    const [errors, setErrors] = useState({});


    const validate = (event) => {
        const title = event.target.title.value;
        const description = event.target.description.value;

        const errors = {};

        if (title === '') {
            errors['title'] = 'Title is required';
        }

        if (description === '') {
            errors['description'] = 'Description is required';
        }

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return false;
        }

        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const todos = JSON.parse(localStorage.getItem('todo')) || [];

        const isValid = validate(event);

        if (!isValid) {
            return;
        }

        const updatedTodo = {
            title: event.target.title.value,
            description: event.target.description.value,
            status: event.target.status.value,
        }

        const todoIndex = todos.findIndex((currentTodo) => currentTodo.id === todo.id);

        if (todoIndex !== -1) {
            todos[todoIndex] = {
                ...todos[todoIndex],
                ...updatedTodo,
            }

            localStorage.setItem('todo', JSON.stringify(todos));
            handleAddTodo(todos);
        }
    }

    return (
        <div>
            <h1 className='edittodo'>Edit Todo</h1>

            <form  className='editmain'onSubmit={handleSubmit}>
                <input className='sww'
                    type="text"
                    name="title"
                    placeholder="Enter todo title"
                    defaultValue={todo.title}
                />
                <p className='ercolor'>{errors['title']}</p>

                <input className='sww'
                    type="text"
                    name="description"
                    placeholder="Enter todo description"
                    defaultValue={todo.description}
                />
                <p className='ercolor'>{errors['description']}</p>

                <select  className='sww'name="status" defaultValue={todo.status}>
                    <option value="PENDING">Pending</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>

                <button className='sww'>Save</button>
            </form>
        </div>
    )
}

export default EditTodoForm