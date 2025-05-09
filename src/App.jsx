import { useEffect, useState } from "react";

import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import EditTodoForm from "./components/EditTodoForm";
import SearchTodo from "./components/SearchTodo";




function App() {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [section, setSection] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todo')) || [];

    setTodos(todos);
  }, []);

  const handleAddTodo = (todos) => {
    setTodos(todos);
    setSection('list');
  }

  const handleEditTodo = (id) => {
    setSection('edit-todo');
    const todo = todos.find((todo) => todo.id === id);

    setTodo(todo);
  }

  return (
    <>
      <h1>My Todo</h1> 
      <input
  type="text"
  name="searchtodo"
  placeholder="Search my todo"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
      <button onClick={() => setSection("add-todo")}>Add Todo</button>
      
      {
        section === 'list' && (
          <TodoList todos={todos} handleEdit={handleEditTodo} />
        )
      }

      {
        section === 'add-todo' && (
          <AddTodoForm handleAddTodo={handleAddTodo} />
        )
      }

      {
        section === 'edit-todo' && (
          <EditTodoForm handleAddTodo={handleAddTodo} todo={todo} />
        )
      }
     <SearchTodo todos={todos} searchQuery={searchQuery} />
    </>
  )
}

export default App


/**
 * Requirement
 * 1. User should be able to add new todo
 * 2. User should be able to delete todo
 * 3. User should be able to edit todo
 * 4. User should be able to mark todo as completed
 * 5. User should be able to filter todos by completed and incomplete
 * 6. User should be able to sort todos by date
 * 7. User should be able to search todos by title
 * 8. User should be able to see the number of completed and incomplete todos
 * 9. User should be able to see the total number of todos
 */