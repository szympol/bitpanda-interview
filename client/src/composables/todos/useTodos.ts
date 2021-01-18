import { computed, reactive } from '@vue/composition-api';

import getCrudMethods from '@/composables/todos/state-functions/getCrudMethods';
import { State } from '@/types/models/state';
import Todo from '@/types/models/todo';
import { Meta } from '@/types/response/metaResponse';
import { UseTodosInterface } from '@/types/useTodosInterface';

function getStateInit() {
  return reactive({
    items: [],
    meta: {
      hasNextPage: false,
      hasPrevPage: false,
      itemCount: 0,
      limit: 20,
      nextPage: null,
      offset: 0,
      page: 1,
      pageCount: 1,
      prevPage: null,
    },
  });
}

function setState(state: State) {
  const todosState = state;

  const setItems = (items: Todo[]) => {
    todosState.items = items;
  };
  const setMeta = (meta: Meta) => {
    todosState.meta = meta;
  };

  return {
    setItems,
    setMeta,
  };
}

export default function useTodos(): UseTodosInterface {
  const state: State = getStateInit();
  const {
    setItems,
    setMeta,
  } = setState(state);

  return {
    todos: computed(() => state.items),
    ...getCrudMethods(setItems, setMeta, state),
  };
}
