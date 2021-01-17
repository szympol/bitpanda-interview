import { Meta } from '@/types/response/metaResponse';
import { TodoResponse } from '@/types/response/TodoResponse';

export interface StateResponse {
  items: Array<TodoResponse>;
  meta: Meta;
}
