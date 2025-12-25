// Replaced incorrect file: implemented TodoForm component
import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState(""); // controlled input

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return; // ignore empty
    addTodo(trimmed); // add todo
    setValue(""); // clear input
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Add a task"
        onChange={(e) => setValue(e.target.value)} // update state
      />
      <button type="submit" className="todobtn">
        Add task
      </button>
    </form>
  );
};

export default TodoForm; // export component
