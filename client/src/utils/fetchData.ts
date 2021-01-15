/* eslint-disable import/prefer-default-export */

/* eslint-disable */
import { NewTodo, UpdateTodo } from 'src/types/index';
/* eslint-enable */

const errorMessage = 'Something wrong happened while';

export const get = async <T>(url: string): Promise<T> => {
  const resp = await fetch(url);

  if (resp.ok) return <T>(await resp.json());

  throw new Error(`${errorMessage} downloading all todos.`);
};

export const add = async <T>(url: string, data: NewTodo): Promise<T> => {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.ok) return <T>(await resp.json());

  throw new Error(`${errorMessage} adding a new todo.`);
};

export const update = async <T>(url: string, id: string, data: UpdateTodo): Promise<T> => {
  const resp = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.ok) return <T>(await resp.json());

  throw new Error(`${errorMessage} .`);
};

export const remove = async (url: string, id: string): Promise<void> => {
  const resp = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });

  if (!resp.ok) throw new Error(`${errorMessage} deleting the todo.`);
};