import env from '@/env';
import get from '@/services/todos/get';
import Todo from '@/types/models/todo';
import { Meta } from '@/types/response/metaResponse';
import { StateResponse } from '@/types/response/StateResponse';

export default function updateTodos(setState: (items: Array<Todo>, meta: Meta) => void) {
  return async (filterDescriptionText = ''): Promise<void> => {
    const stateResponse = await get<StateResponse>(env('BASE_URL'), filterDescriptionText)
      .catch((error) => {
        throw new Error(error);
      });
    const mappedItems = stateResponse.items
      .map((todoItemResponse) => new Todo(todoItemResponse));

    setState(mappedItems, stateResponse.meta);
  };
}
