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
          @keypress="useTodosService.addNewTodo(newTodoPayload, ()=>{inputAddTodo.$el.focus();})"
          placeholder="Take a note"
          ref="inputAddTodo"
        )
      li.todos__element(
        v-for="(todo) in useTodosService.todos.value"
        :key="todo.id"
      )
        div.container-todo
          span {{todo}}
          button.update(
            @click="updateTodo(todo)"
          ) Update
          button.remove(
            @click="useTodosService.removeTodo(todo.id)"
          ) Remove
    button.deleteChecked(
      type='text'
      @click="useTodosService.removeAllChecked"
    )   Remove all done todos
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, reactive, ref,
} from '@vue/composition-api';

import BaseInput from '@/components/BaseInput.vue';
import useSearch from '@/composables/todos/useSearch';
import useTodos from '@/composables/todos/useTodos';
import { NewTodo } from '@/types/models/newTodo';
import Todo from '@/types/models/todo';

export default defineComponent({
  name: 'App',
  components: {
    BaseInput,
  },
  setup() {
    const useTodosService = useTodos();
    const searchText = ref('');

    useSearch(searchText, useTodosService.getTodos);
    const inputAddTodo = ref();
    const newTodoDescription = ref('');
    const newTodoPayload: NewTodo = reactive({
      description: computed((): string => newTodoDescription.value),
    });

    onMounted(() => {
      useTodosService.getTodos('');
    });
    return {
      newTodoDescription,
      newTodoPayload,
      searchText,
      inputAddTodo,
      useTodosService,
      updateTodo: (todo: Todo) => useTodosService.updateTodo(todo.id, {
        done: !todo.done,
        description: todo.description,
      }),
    };
  },
});
</script>

<style lang="scss">
@import 'src/assets/styles/index';

.container {
  max-width: $max-content-width;
  margin: $space auto 0;
}
</style>
