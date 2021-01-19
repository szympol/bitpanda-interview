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
      transition-group(
        name="staggered-fade"
        class="todos"
        tag="ul"
        :css="false"
        @before-enter="useListAnimationService.beforeEnterAnimation"
        @enter="useListAnimationService.enterAnimation"
        @leave="useListAnimationService.leaveAnimation"
      )
        VTodo(
          v-for="(todo) in useTodosService.todos.value"
          :key="todo.id"
          :todo="todo"
          @update="updateTodo(todo)"
          @remove="useTodosService.removeTodo(todo.id)"
        )
    section.actions
      BaseButton.button-remove-all-checked(
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
import useListAnimation from '@/composables/todos/useListAnimation';
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

    const useListAnimationService = useListAnimation();

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
      useListAnimationService,
    };
  },
});
</script>

<style lang="scss">
@import 'src/assets/styles/index';

.container {
  max-width: $max-content-width;
  margin: 0 auto;
  padding: $space-2-3;
}
.todos {
  list-style-type: none;
  padding-left: 0;
  margin:0 0 $space;
}
.actions {
  text-align: right;
}
.button-remove-all-checked {
  padding: $space-1-2;
  color: var(--third-color);
  background-color: var(--bg-content-color);
  border-radius: $radius;
  @include transition(transform);
  &:hover {
    transform: scale(1.02);
  }
}
</style>
