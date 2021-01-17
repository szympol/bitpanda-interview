import Todo from '@/types/models/todo';
import { Meta } from '@/types/response/metaResponse';

export interface State {
  items: Array<Todo>;
  meta: Meta;
}
