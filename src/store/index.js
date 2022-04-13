import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  initialState: {
    todos: [],
  },

  actions: {
    addTodo:
      (newTodo) =>
      ({ setState, getState }) => {
        let state = getState().todos;
        setState({
          todos: [...state, newTodo],
        });
      },

    getTodo:
      (todo) =>
      ({ setState }) => {
        setState({
          todos: todo,
        });
      },

    deleteTodo:
      (todoId) =>
      ({ setState, getState }) => {
        const newTodosItem = getState().todos.filter(
          (item) => item.id != todoId
        );

        setState({
          todos: newTodosItem,
        });
      },

    markTodoComplete:
      (todoId) =>
      ({ setState, getState }) => {
        const newTodosItem = getState().todos.map((item) => {
          if (item.id == todoId) {
            if (item.completed === false) {
              return { ...item, completed: true };
            } else {
              return { ...item, completed: false };
            }
          }

          return item;
        });

        setState({
          todos: newTodosItem,
        });
      },
  },

  name: "todos",
});

export const userStore = createHook(Store);
