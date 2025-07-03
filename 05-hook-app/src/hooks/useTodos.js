import { useEffect, useReducer } from "react";
import {todoReducer} from "../08-useReducer/todoReducer";

const initialState = [

  /*{
    id: new Date().getTime(),
    description: "Go for a walk",
    done: false,
  },
  {
    id: new Date().getTime() + 1,
    description: "Go for a ride",
    done: false,
  },*/
];
const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  }

const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    dispatch({
      type: "ADD",
      payload: todo,
    });
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "REMOVE",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: "TOGGLE",
      payload: id,
    });
  };

  const todosCount = todos.length;

  const pendingTodoCount = () => {
    return todos.filter(todo=> !todo.done).length
  }

  return {
    todos,
    todosCount,
    pendingTodoCount,
    handleToggleTodo,
    handleDeleteTodo,
    handleNewTodo,
  };
};

export default useTodos;
