import env from '@/env';
import remove from '@/services/todos/remove';

export default function removeTodo(refreshItems: (id: string) => void) {
  return async (id: string): Promise<void> => {
    await remove(env('BASE_URL'), id)
      .catch((error) => {
        throw new Error(error);
      });
    refreshItems(id);
  };
}
