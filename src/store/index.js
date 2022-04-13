import { createStore, createHook } from "react-sweet-state";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    getTodosFromUserDevice: async ({ setState }) => {
      try {
        const todos = await AsyncStorage.getItem("todos");
        if (todos != null) {
          setState({
            todos: JSON.parse(todos),
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    saveTodoToUserDevice:
      (todos) =>
      async ({ setState }) => {
        try {
          const stringifyTodos = JSON.stringify(todos);
          await AsyncStorage.setItem("todos", stringifyTodos);
        } catch (error) {
          console.log(error);
        }
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
