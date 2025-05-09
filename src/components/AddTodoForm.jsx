import React, { useState } from 'react'
const AddTodoForm = (props) => {
    const { handleAddTodo } = props;
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
        const isValid = validate(event);

        if (!isValid) {
            return;
        }

        const todos = JSON.parse(localStorage.getItem('todo')) || [];

        todos.push({
            id: todos.length + 1,
            title: event.target.title.value,
            description: event.target.description.value,
            status: "PENDING",
            createdAt: new Date().toISOString(),
        });

        localStorage.setItem('todo', JSON.stringify(todos));

        handleAddTodo(todos);
    }

    return (
        <div>
            <h1>Add Todo</h1>  
            

            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Enter todo title" />
                <p>{errors['title']}</p>
                <input type="text" name="description" placeholder="Enter todo description" />
                <p>{errors['description']}</p>
                <button>Add</button>
             
            </form>

        </div>
    )
}

export default AddTodoForm