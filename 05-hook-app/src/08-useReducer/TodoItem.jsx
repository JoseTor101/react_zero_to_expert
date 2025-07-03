import React from "react";

const TodoItem = ({ todo, onDeleteTodo, onToggleTodo }) => {
  return (
    <li className={`list-group-item d-flex justify-content-between ${todo.done ? "bg-success" : ""}`}>
      <span className="align-self-center"
      onClick={() => onToggleTodo(todo.id)}
      >{todo.description}</span>
      <button 
        className="btn btn-danger" 
        onClick={() => onDeleteTodo(todo.id)}>
        Borrar
      </button>
    </li>
  );
};

export default TodoItem;
