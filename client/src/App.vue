<template lang="pug">
  div#app.container
    header.header
      .header__search
        BaseInput.header__search-input(
          v-model="searchText"
          placeholder="Search"
          :onEnter="false"
        )
      .header__addNewTodo
        BaseInput.header__addNewTodo-input(
          v-model="newTodoDescription"
          @enter="useTodosService.addNewTodo(newTodoPayload, ()=>{inputAddTodo.$el.focus();});"
          placeholder="Take a note"
          ref="inputAddTodo"
        )
    main.main
      ul.todos
        VTodo(
          v-for="(todo) in useTodosService.todos.value"
          :key="todo.id"
          :todo="todo"
          @update="updateTodo(todo)"
          @remove="useTodosService.removeTodo(todo.id)"
        )
    section.actions
      BaseButton(
        v-if="isAnyTodoChecked"
        @click-button="useTodosService.removeAllChecked"
      ) Remove all done notes
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, reactive, ref,
} from '@vue/composition-api';

import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import VTodo from '@/components/Todo.vue';
import useSearch from '@/composables/todos/useSearch';
import useTodos from '@/composables/todos/useTodos';
import { NewTodo } from '@/types/models/newTodo';
import Todo from '@/types/models/todo';

export default defineComponent({
  name: 'App',
  components: {
    BaseButton,
    VTodo,
    BaseInput,
  },
  setup() {
    const useTodosService = useTodos();
    const searchText = ref('');

    const isAnyTodoChecked = computed(() => useTodosService.todos.value.some((todo) => todo.done));

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
      isAnyTodoChecked,
      useTodosService,
      addNewTodo: useTodosService.addNewTodo,
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
.todos {
  list-style-type: none;
  padding-left: 0;
}
</style>
