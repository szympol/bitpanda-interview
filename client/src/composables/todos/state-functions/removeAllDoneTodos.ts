import { State } from '@/types/models/state';

export default function removeAllDoneTodos(state: State,
  removeTodo: (id: string) => Promise<void>,
  refreshState: (filterDescriptionText?: string) => Promise<void>) {
  return async (): Promise<void> => {
    const doneTodos = state.items.filter((todo) => todo.done);
    const removePromises = [];

    for (let i = 0; i < doneTodos.length; i += 1) {
      const todoToRemove = doneTodos[i];

      removePromises.push(removeTodo(todoToRemove.id));
    }
    await Promise.all(removePromises);
    await refreshState();
  };
}
