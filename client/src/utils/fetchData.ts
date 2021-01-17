/* eslint-disable import/prefer-default-export */

// eslint-disable-next-line import/no-unresolved
import { NewTodo, UpdateTodo } from 'src/types/index';

const errorMessage = 'Something wrong happened while';

export const get = async <T>(url: string, filterDescriptionText = ''): Promise<T> => {
  const finalUrl = filterDescriptionText.length ? `${url}?description=${filterDescriptionText}` : url;

  const resp = await fetch(finalUrl);

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

export const remove = async (url: string, id: string): Promise<string> => {
  const resp = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });

  if (!resp.ok) throw new Error(`${errorMessage} deleting the todo.`);

  return `This todo ${id} has just been successfully deleted.`;
};
