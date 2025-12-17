import React, { useState } from 'react';

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Fixed: correct order of arguments
    editTodo(task.id, value);
    // setValue(""); // optional
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Update Task?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todobtn">
        Update task
      </button>
    </form>
  );
};

export default EditTodoForm;
