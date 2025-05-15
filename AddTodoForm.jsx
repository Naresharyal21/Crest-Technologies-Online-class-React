import React, { useState } from 'react'

const AddTodoForm = (props) => {
    const { handleAddTodo } = props;
    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState('');
const [description, setDescription] = useState('');


    const validate = (event) => {
        const title = event.target.title.value;
        const description = event.target.description.value;

        const errors = {};

        if (title === '') {
            errors['title'] = 'Title is required';
        }

        if (description=== '') {
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
        <div className="flex todo-form" style={{ flexDirection: 'column' }}  >
            <h1 className='mr-11' style={{ marginLeft: "145px" }}>Add Todo</h1>

            <div>
                <form onSubmit={handleSubmit}>
                    <div className='bxhw'>

                        <input
            className={`mr-11 sw ${errors.title ? 'input-error' : ''}`}
            type="text"
            name="title"
            placeholder="Enter todo title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
          />
          <p className='ercolor'>{errors.title}</p>

          <input
            className={`mr-11 sw ${errors.description ? 'input-error' : ''}`}
            type="text"
            name="description"
            placeholder="Enter todo description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors({ ...errors, description: '' });
            }}
          />
          <p className='ercolor'>{errors.description}</p>
                        <button className='mr-11 sw'>Add</button>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default AddTodoForm