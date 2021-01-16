<template lang="pug">
  main#app.container
    div.search
      BaseInput.search__content(
        v-model="searchText"
        placeholder="Search"
      )
    ul.todos
      li.todos__element.todos__header
        BaseInput.todos__add(
          v-model="newTodoDescription"
          @keypress="addNewTodo(newTodoPayload)"
          placeholder="Take a note"
        )
      li.todos__element(
          v-for="(todo, index) in todos"
          :key="todo._id"
      )
        div.container-todo
          span {{todo}}
          button.update(
            @click="updateTodo(todo._id, {done: !todo.done, description: todo.description})"
            ) Update
          button.remove(@click="removeTodo(todo._id)") Remove
    button.deleteChecked(
      type='text'
      @click="removeAllChecked"
    ) Remove all done todos
</template>

<script lang="ts">
/* eslint-disable */
import {
  defineComponent,
  ref,
  computed,
  reactive,
  onMounted,
} from '@vue/composition-api';
// import { debouncedWatch } from '@vueuse/core';
import BaseInput from './components/BaseInput.vue';
import useTodos from './composables/useTodos';
import useSearch from './composables/useSearch';
import { NewTodo, Todo } from './types/index';
/* eslint-enable */

export default defineComponent({
  name: 'App',
  components: {
    BaseInput,
  },
  setup() {
    /* eslint-disable */
    const {
      todos,
      addNewTodo,
      removeTodo,
      updateTodo,
      getTodos,
      removeAllChecked,
    } = useTodos();
    /* eslint-enable */

    const searchText = ref('');

    useSearch(searchText, getTodos);

    const newTodoDescription = ref('');
    const newTodoPayload: NewTodo = reactive({
      description: computed((): string => newTodoDescription.value),
    });

    return {
      todos,
      newTodoDescription,
      newTodoPayload,
      addNewTodo,
      removeTodo,
      updateTodo,
      removeAllChecked,
      searchText,
    };
  },
});
</script>

<style lang="scss">
@import 'src/assets/styles/index';

.container {
  max-width: $max-content-width;
  margin: 0 auto;
  margin-top: $space;
}
</style>
