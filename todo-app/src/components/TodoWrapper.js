// TodoWrapper.jsx
import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import EditTodoForm from './EditTodoForm';
import Todo from './Todo'; // ✅ Added import for Todo component (was missing)

// Main wrapper for Todo app
export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  // Add new todo
  const addTodo = (todo) => {
    // ✅ Fixed: include isEditing inside todo object
    setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
    console.log(todos);
  };

  // Toggle completed status
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle editing mode
  const editTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
  };

  // Update task
  const editTask = (id, newTask) => {
    // ✅ Fixed: use newTask instead of undefined 'task'
    setTodos(todos.map(todo => todo.id === id ? { ...todo, task: newTask, isEditing: !todo.isEditing } : todo));
  };

  return (
    <div className='TodoWrapper'>
      <h1>Todo List</h1>
      {/* ✅ Fixed prop name to match TodoForm */}
      <TodoForm addTodo={addTodo} />

      {todos.map((todo) => (
        todo.isEditing ? (
          // ✅ Added key to EditTodoForm
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          // ✅ Fixed: renamed 'todo' to 'Todo' component to avoid React DOM warning
          // ✅ Added key using todo.id instead of index (better for React rendering)
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      ))}
    </div>
  );
};

export default TodoWrapper;
