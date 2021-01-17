import { Ref } from '@vue/composition-api';
import { debouncedWatch } from '@vueuse/core';

export default function useSearch(searchText: Ref<string>, getTodos: (text: string) => void):void {
  debouncedWatch(
    searchText,
    () => {
      getTodos(searchText.value);
    },
    { debounce: 500 },
  );
}
