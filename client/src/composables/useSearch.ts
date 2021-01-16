import { Ref } from '@vue/composition-api';
import { debouncedWatch } from '@vueuse/core';

export default function useSearch(searchText: Ref<string>, getTodos: (text: string) => void):void {
  debouncedWatch(
    searchText,
    () => {
      getTodos(searchText.value);
    },
    // eslint-disable-next-line comma-dangle
    { debounce: 500 }
  );
}
