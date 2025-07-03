export function runReducerDemo() {
    const initialState = [{
        id:1,
        todo: 'Caminar',
        done: true,
    }];

    const todoReducer = (state = initialState, action = {}) => {
        if (action.type === "WALK") {
            return [...state, action.payload];
        }
        return state;
    };

    let todos = todoReducer();

    const newTodo = {
        id: 2,
        todo: 'Cantar',
        done: false,
    };

    const addTodoAction = {
        type: 'WALK',
        payload: newTodo,
    };

    todos = todoReducer(todos, addTodoAction);

    console.table(todos);
}