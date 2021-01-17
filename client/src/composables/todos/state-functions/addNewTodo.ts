import env from '@/env';
import add from '@/services/todos/add';
import { NewTodo } from '@/types/models/newTodo';
import Todo from '@/types/models/todo';
import { TodoResponse } from '@/types/response/TodoResponse';

export default function addNewTodo(setState: (todo: Todo) => void) {
  return async (payload: NewTodo, setFocus: ()=>void): Promise<void> => {
    if (payload.description.length === 0) {
      setFocus();
      return;
    }

    const todo = await add<TodoResponse>(env('BASE_URL'), payload)
      .catch((error) => {
        throw new Error(error);
      });

    setState(new Todo(todo));
  };
}
