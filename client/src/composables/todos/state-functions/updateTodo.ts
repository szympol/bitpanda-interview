import env from '@/env';
import update from '@/services/todos/update';
import Todo from '@/types/models/todo';
import { UpdateTodo } from '@/types/models/updateTodo';
import { TodoResponse } from '@/types/response/TodoResponse';

export default function updateTodo(setState: (items: Todo, id: string) => void) {
  return async (id: string, payload: UpdateTodo): Promise<void> => {
    const todo = await update<TodoResponse>(env('BASE_URL'), id, payload)
      .catch((error) => {
        throw new Error(error);
      });

    setState(new Todo(todo), id);
  };
}
