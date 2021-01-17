import NetworkError from '@/types/errors/network-error';
import { UpdateTodo } from '@/types/models/updateTodo';

export default async <T>(url: string, id: string, data: UpdateTodo): Promise<T> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    throw new NetworkError(error, response);
  });

  return <T>(await response.json());
};
