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
    getTodos: () => void
    addNewTodo: (payload: NewTodo) => void
    updateTodo: (id: string, payload: UpdateTodo) => void
    removeTodo: (id: string) => void
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

  const getTodos = async (): Promise<void> => {
    try {
      const data = await get<State>(baseUrl);
      const { items, meta } = data;

      state.items = items;
      state.meta = meta;

      console.log('🚀 ~ file: useTodos.ts ~ line 35 ~ getTodos ~ data', data);
    } catch (err) {
      console.warn(err as string);
    }
  };

  const addNewTodo = async (payload: NewTodo): Promise<void> => {
    try {
      await add<Todo>(baseUrl, payload);

    // const data = await add<Todo>(baseUrl, payload);
    //   state.items.push(data);
    } catch (err) {
      console.warn(err as string);
    }
    await getTodos();
  };

  const updateTodo = async (id: string, payload: UpdateTodo): Promise<void> => {
    try {
      await update<Todo>(baseUrl, id, payload);
    } catch (err) {
      console.warn(err as string);
    }
    await getTodos();
    // eslint-disable-next-line no-underscore-dangle
    // const updatedTodo = state.items.find((todo) => todo._id === id);

    // if (!updatedTodo) return;

    // updatedTodo.done = payload.done;
  };

  const removeTodo = async (id: string): Promise<void> => {
    try {
      await remove(baseUrl, id);
    } catch (err) {
      console.warn(err as string);
    }
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
  };
}
