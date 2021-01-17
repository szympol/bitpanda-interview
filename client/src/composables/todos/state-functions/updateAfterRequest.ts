import { State } from '@/types/models/state';
import Todo from '@/types/models/todo';

export default function updateAfterRequest(
  state: State,
  id: string,
  setItemsState: (items: Todo[])
    => void, todo: Todo,
): void {
  const updatedTodoIdx = state.items.findIndex((todoItem) => todoItem.id === id);

  if (updatedTodoIdx === -1) return;

  const firstPartTodos = state.items.slice(0, updatedTodoIdx);
  const secondPartTodos = state.items.slice(updatedTodoIdx + 1, state.items.length);

  setItemsState([...firstPartTodos, todo, ...secondPartTodos]);
}
