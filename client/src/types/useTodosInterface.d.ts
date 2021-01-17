import { ComputedRef } from '@vue/composition-api';

import { NewTodo } from '@/types/models/newTodo';
import Todo from '@/types/models/todo';
import { UpdateTodo } from '@/types/models/updateTodo';

export interface UseTodosInterface {
  getTodos: (filterDescriptionText: string) => void
  addNewTodo: (payload: NewTodo, setFocus: () => void) => void
  updateTodo: (id: string, payload: UpdateTodo) => void
  removeTodo: (id: string) => void
  removeAllChecked: () => void
  todos: ComputedRef<Todo[]>
}
