export interface Todo {
  _id: string;
  createdAt: string;
  description: string;
  done: boolean;
  updatedAt: string;
}

export interface Meta {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  itemCount: number;
  limit: number;
  nextPage: null | boolean;
  offset: number;
  page: number;
  pageCount: number;
  prevPage: null | boolean;
}

export interface State {
  items: Todo[] | [];
  meta: Meta;
}

export interface NewTodo {
  description: string
}

export interface UpdateTodo {
  done: boolean,
  description: string
}
