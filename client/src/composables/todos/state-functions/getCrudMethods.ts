import addNewTodo from '@/composables/todos/state-functions/addNewTodo';
import removeAllDoneTodos from '@/composables/todos/state-functions/removeAllDoneTodos';
import removeTodo from '@/composables/todos/state-functions/removeTodo';
import updateAfterRequest from '@/composables/todos/state-functions/updateAfterRequest';
import updateTodo from '@/composables/todos/state-functions/updateTodo';
import updateTodos from '@/composables/todos/state-functions/updateTodos';
import { CrudTodosInterface } from '@/types/crudTodosInterface';
import { State } from '@/types/models/state';
import Todo from '@/types/models/todo';
import { Meta } from '@/types/response/metaResponse';

export default function getCrudMethods(setItems: (items: Todo[]) => void,
  setMeta: (meta: Meta) => void, state: State): CrudTodosInterface {
  const get = updateTodos((items: Todo[], meta: Meta) => {
    setItems(items);
    setMeta(meta);
  });

  const add = addNewTodo((todo: Todo) => {
    setItems(state.items.length === 0 ? [todo] : [...state.items, todo]);
  });

  const update = updateTodo((todo: Todo, id: string) => {
    updateAfterRequest(state, id, setItems, todo);
  });

  const remove = removeTodo((id) => {
    const todos = state.items.filter((todo) => todo.id !== id);

    setItems([...todos]);
  });

  return {
    getTodos: get,
    addNewTodo: add,
    updateTodo: update,
    removeTodo: remove,
    removeAllChecked: removeAllDoneTodos(state, remove, get),
  };
}
