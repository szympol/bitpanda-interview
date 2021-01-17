import { NewTodo } from '@/types/models/newTodo';
import { UpdateTodo } from '@/types/models/updateTodo';

export interface CrudTodosInterface {
  getTodos: (filterDescriptionText: string) => void
  addNewTodo: (payload: NewTodo, setFocus: () => void) => void
  updateTodo: (id: string, payload: UpdateTodo) => void
  removeTodo: (id: string) => void
  removeAllChecked: () => void
}
