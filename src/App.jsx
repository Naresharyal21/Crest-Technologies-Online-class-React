import { useEffect, useState } from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Updatetodo from "./components/Updatetodo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todo')) || [];

    setTodos(todos);
  }, []);

  return (
    <>
      <h1>My Todo</h1>
      <button>Add Todo</button>

      <TodoForm setTodos={setTodos} />
      <TodoList todos={todos} />
      <Updatetodo />
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