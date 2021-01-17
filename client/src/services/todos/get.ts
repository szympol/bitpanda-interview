import NetworkError from '@/types/errors/network-error';

export default async <T>(url: string, filterDescriptionText = ''): Promise<T> => {
  const finalUrl = filterDescriptionText.length ? `${url}?description=${filterDescriptionText}` : url;

  const response = await fetch(finalUrl).catch((error) => {
    throw new NetworkError(error, response);
  });

  return <T>(await response.json());
};
