// eslint-disable-next-line import/order
import {
  reactive, onMounted, computed, ComputedRef,
} from '@vue/composition-api';

/* eslint-disable */
import { Todo, State, NewTodo, UpdateTodo } from 'src/types/index';
import { get, add, update, remove } from '../utils/fetchData';
/* eslint-enable */

const baseUrl = 'http://localhost:3000/api/v1/todo';

export default function useTodos(): {
    todos: ComputedRef<Todo[]>
    getTodos: (filterDescriptionText: string) => void
    addNewTodo: (payload: NewTodo, node: HTMLInputElement) => void
    updateTodo: (id: string, payload: UpdateTodo) => void
    removeTodo: (id: string) => void
    removeAllChecked:() => void
    } {
  const state: State = reactive({
    items: [],
    meta: {
      hasNextPage: false,
      hasPrevPage: false,
      itemCount: 0,
      limit: 20,
      nextPage: null,
      offset: 0,
      page: 1,
      pageCount: 1,
      prevPage: null,
    },
  });

  const getTodos = async (filterDescriptionText = ''): Promise<void> => {
    try {
      const data = await get<State>(baseUrl, filterDescriptionText);
      const { items, meta } = data;

      state.items = items;
      state.meta = meta;
    } catch (err) {
      console.warn(err as string);
    }
  };

  const addNewTodo = async (payload: NewTodo, node: HTMLInputElement): Promise<void> => {
    if (payload.description.length === 0) {
      node.focus();
      return;
    }

    try {
      const data = await add<Todo>(baseUrl, payload);

      state.items = state.items.length === 0 ? [data] : [...state.items, data];
    } catch (err) {
      console.warn(err as string);
    }
  };

  const updateTodo = async (id: string, payload: UpdateTodo): Promise<void> => {
    try {
      const response = await update<Todo>(baseUrl, id, payload);
      // eslint-disable-next-line no-underscore-dangle
      const updatedTodoIdx = state.items.findIndex((todo) => todo._id === id);

      if (updatedTodoIdx === -1) return;

      const firstPartTodos = state.items.slice(0, updatedTodoIdx);
      const secondPartTodos = state.items.slice(updatedTodoIdx + 1, state.items.length);

      state.items = [...firstPartTodos, response, ...secondPartTodos];
    } catch (err) {
      console.warn(err as string);
    }
  };

  const removeTodo = async (id: string): Promise<void> => {
    try {
      await remove(baseUrl, id);
      // eslint-disable-next-line no-underscore-dangle
      const todos = state.items.filter((todo) => todo._id !== id);

      state.items = [...todos];
    } catch (err) {
      console.warn(err as string);
    }
  };

  const removeAllChecked = async (): Promise<void> => {
    const doneTodos = state.items.filter((todo: Todo) => todo.done);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    doneTodos.forEach(async (element: Todo): Promise<void> => {
      // eslint-disable-next-line no-underscore-dangle
      await removeTodo(element._id);
    });
    await getTodos();
  };

  onMounted(async () => {
    await getTodos();
  });

  return {
    todos: computed(() => state.items),
    getTodos,
    addNewTodo,
    updateTodo,
    removeTodo,
    removeAllChecked,
  };
}
