import NetworkError from '@/types/errors/network-error';

export default async (url: string, id: string): Promise<string> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  }).catch((error) => {
    throw new NetworkError(error, response);
  });

  return `This todo ${id} has just been successfully deleted.`;
};
