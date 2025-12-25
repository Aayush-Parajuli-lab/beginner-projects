// TodoWrapper.jsx

// React imports
import React, { useState, useEffect } from "react";

// Component imports
import TodoForm from "./TodoForm";
import EditTodoForm from "./EditTodoForm";
import Todo from "./Todo";

// UUID for unique IDs
import { v4 as uuidv4 } from "uuid";

// Main wrapper component
const TodoWrapper = () => {
  /*
    STATE INITIALIZATION (IMPORTANT)
    - We load todos from localStorage if they exist
    - This function runs ONLY once when component mounts
  */
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  /*
    SIDE EFFECT: SAVE TODOS
    - Whenever `todos` changes, save it to localStorage
    - Keeps data persistent after refresh
  */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /*
    ADD TODO
    - Creates a new todo object
    - Adds it to the todos array
  */
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(), // unique ID
        task: todo, // todo text
        completed: false, // completion status
        isEditing: false, // edit mode flag
      },
    ]);
  };

  /*
    TOGGLE COMPLETE
    - Marks todo as completed / not completed
  */
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  /*
    DELETE TODO
    - Removes todo by filtering it out
  */
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  /*
    TOGGLE EDIT MODE
    - Switches between view and edit mode
  */
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
      ),
    );
  };

  /*
    UPDATE TASK
    - Saves edited text
    - Turns off edit mode
  */
  const editTask = (id, newTask) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask, isEditing: false } : todo,
      ),
    );
  };

  // UI RENDER
  return (
    <div className="TodoWrapper">
      <h1>Todo List</h1>

      {/* Form to add new todos */}
      <TodoForm addTodo={addTodo} />

      {/* Render todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ),
      )}
    </div>
  );
};

export default TodoWrapper;
