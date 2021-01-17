import { TodoResponse } from '@/types/response/TodoResponse';

export default class Todo {
  id = '';

  createdAt = '';

  description = '';

  done = false;

  updatedAt = '';

  constructor(todoResponse: TodoResponse) {
    // eslint-disable-next-line no-underscore-dangle
    this.id = todoResponse._id;
    this.createdAt = todoResponse.createdAt;
    this.description = todoResponse.description;
    this.done = todoResponse.done;
    this.updatedAt = todoResponse.updatedAt;
  }
}
