/* eslint-disable import/no-unresolved */
import {
  Todo, State, NewTodo, UpdateTodo,
} from '@/types/index';
import {
  get, add, update, remove,
} from '@/utils/fetchData';
import {
  reactive, onMounted, computed, ComputedRef,
} from '@vue/composition-api';

const baseUrl = 'http://localhost:3000/api/v1/todo';

const getTodosState = () => reactive({
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

const getTodosFunc = async (state: State, filterDescriptionText = ''): Promise<void> => {
  try {
    const data = await get<State>(baseUrl, filterDescriptionText);
    const { items, meta } = data;
    const stateTodos = state;

    stateTodos.items = items;
    stateTodos.meta = meta;
  } catch (err) {
    console.warn(err as string);
  }
};

const addNewTodoFunc = async (state: State, payload: NewTodo, node: HTMLInputElement)
  : Promise<void> => {
  if (payload.description.length === 0) {
    node.focus();
    return;
  }

  try {
    const data = await add<Todo>(baseUrl, payload);
    const stateTodos = state;

    stateTodos.items = state.items.length === 0 ? [data] : [...state.items, data];
  } catch (err) {
    console.warn(err as string);
  }
};

const updateTodoFunc = async (state: State, id: string, payload: UpdateTodo): Promise<void> => {
  try {
    const response = await update<Todo>(baseUrl, id, payload);
    const stateTodos = state;
    // eslint-disable-next-line no-underscore-dangle
    const updatedTodoIdx = stateTodos.items.findIndex((todo) => todo._id === id);

    if (updatedTodoIdx === -1) return;

    const firstPartTodos = stateTodos.items.slice(0, updatedTodoIdx);
    const secondPartTodos = stateTodos.items.slice(updatedTodoIdx + 1, stateTodos.items.length);

    stateTodos.items = [...firstPartTodos, response, ...secondPartTodos];
  } catch (err) {
    console.warn(err as string);
  }
};

const removeTodoFunc = async (state: State, id: string): Promise<void> => {
  try {
    await remove(baseUrl, id);
    const stateTodos = state;
    // eslint-disable-next-line no-underscore-dangle
    const todos = stateTodos.items.filter((todo) => todo._id !== id);

    stateTodos.items = [...todos];
  } catch (err) {
    console.warn(err as string);
  }
};

const removeAllCheckedFunc = async (state: State): Promise<void> => {
  const stateTodos = state;
  const doneTodos = stateTodos.items.filter((todo: Todo) => todo.done);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  doneTodos.forEach(async (element: Todo): Promise<void> => {
    // eslint-disable-next-line no-underscore-dangle
    await removeTodoFunc(state, element._id);
  });
  await getTodosFunc(state);
};

const createTodosService = (state: State) => ({
  todos: computed(() => state.items),
  getTodos: (filterDescriptionText = '') => getTodosFunc(state, filterDescriptionText),
  addNewTodo: (payload: NewTodo, node: HTMLInputElement) => addNewTodoFunc(state, payload, node),
  updateTodo: (id: string, payload: UpdateTodo) => updateTodoFunc(state, id, payload),
  removeTodo: (id: string) => removeTodoFunc(state, id),
  removeAllChecked: () => removeAllCheckedFunc(state),
});

export default function useTodos(): {
    todos: ComputedRef<Todo[]>
    getTodos: (filterDescriptionText: string) => void
    addNewTodo: (payload: NewTodo, node: HTMLInputElement) => void
    updateTodo: (id: string, payload: UpdateTodo) => void
    removeTodo: (id: string) => void
    removeAllChecked:() => void
    } {
  const state: State = getTodosState();

  onMounted(async () => {
    await getTodosFunc(state);
  });

  return createTodosService(state);
}
