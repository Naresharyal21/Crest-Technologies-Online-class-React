import React from 'react'

const TodoForm = (props) => {
    const { setTodos } = props;

    const handleSubmit = (event) => {
        event.preventDefault();

        const todos = JSON.parse(localStorage.getItem('todo')) || [];

        todos.push({
            id: todos.length + 1,
            title: event.target.title.value,
            description: event.target.description.value,
            status: "PENDING",
            createdAt: new Date().toISOString(),
        });

        localStorage.setItem('todo', JSON.stringify(todos));

        setTodos(todos);
    }
 

    return (
        <div>
            
            <h1>Add Todo</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Enter todo title" />
                <input type="text" name="description" placeholder="Enter todo description" />
                

                <button>Add</button>
                <input type="text" name="title" placeholder="Search" />
          
            </form>
        </div>
    )
}

export default TodoForm