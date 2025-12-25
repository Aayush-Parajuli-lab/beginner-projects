// TodoWrapper.jsx

import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import EditTodoForm from "./EditTodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

const TodoWrapper = () => {
  // Load todos from localStorage once
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // Filter state: all | active | completed
  const [filter, setFilter] = useState("all");

  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add todo
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        isEditing: false,
      },
    ]);
  };

  // Toggle completed
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle edit mode
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
      ),
    );
  };

  // Save edited task
  const editTask = (id, newTask) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask, isEditing: false } : todo,
      ),
    );
  };

  /*
    DERIVED STATE
    - Based on todos + filter
    - No mutation
  */
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // all
  });

  return (
    <div className="TodoWrapper">
      <h1>Todo List</h1>

      <TodoForm addTodo={addTodo} />

      {/* FILTER BUTTONS */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* RENDER TODOS */}
      {filteredTodos.map((todo) =>
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
