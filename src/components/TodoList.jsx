import React, { useState, useEffect } from 'react';

const TodoList = (props) => {
    const { todos } = props;
    const [updatedTodos, setUpdatedTodos] = useState(todos);

    useEffect(() => {
        setUpdatedTodos(todos);
    }, [todos]);

    const deleteTodo = (id) => {
        const newTodos = updatedTodos.filter((todo) => todo.id !== id);
        localStorage.setItem('todo', JSON.stringify(newTodos));
        setUpdatedTodos(newTodos);
    };

    const updateTodo = (id) => {
        // Reserved for edit functionality
    };

    const changeMystatus = (id) => {
        const newTodos = updatedTodos.map((todo) =>
            todo.id === id
                ? {
                      ...todo,
                      status: todo.status === 'PENDING' ? 'COMPLETED' : 'PENDING',
                  }
                : todo
        );
        localStorage.setItem('todo', JSON.stringify(newTodos));
        setUpdatedTodos(newTodos);
    };

    return (
        <div>
            
            <h1>My Todos</h1>
           
            <table>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Created At</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {updatedTodos.map((todo, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black' }}>{index + 1}</td>
                            <td style={{ border: '1px solid black' }}>{todo.createdAt}</td>
                            <td style={{ border: '1px solid black' }}>{todo.title}</td>
                            <td style={{ border: '1px solid black' }}>{todo.description}</td>
                            <td
                                style={{
                                    border: '1px solid black',
                                    cursor: 'pointer',
                                    color: todo.status === 'COMPLETED' ? 'green' : 'red',
                                }}
                                onClick={() => changeMystatus(todo.id)}
                            >
                                {todo.status}
                            </td>
                            <td style={{ border: '1px solid black' }}>
                                <button onClick={() => updateTodo(todo.id)}>Edit</button>{' '}
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>{' '}
                                <button onClick={() => changeMystatus(todo.id)}>{todo.status==='PENDING'?'task ended':'continue working'}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
