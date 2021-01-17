export default class NetworkError extends Error {
  response: Response

  constructor(name: string, response: Response) {
    super(name);
    this.response = response;
  }
}
