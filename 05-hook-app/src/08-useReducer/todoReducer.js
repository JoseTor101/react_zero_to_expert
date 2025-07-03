export const todoReducer = (initialState = [], action) => {
  switch (action.type) {
    case "ADD":
      //throw new Error('Action.type = ADD no está implementada')
      return [...initialState, action.payload];
    case "REMOVE":
      return initialState.filter((todo) => todo.id !== action.payload);
    case "TOGGLE":
      return initialState.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );

    default:
      return initialState;
  }
};
