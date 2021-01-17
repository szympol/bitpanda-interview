import NetworkError from '@/types/errors/network-error';
import { NewTodo } from '@/types/models/newTodo';

export default async <T>(url: string, data: NewTodo): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    throw new NetworkError(error, response);
  });

  return <T>(await response.json());
};
