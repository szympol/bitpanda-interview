<template lang="pug">
  #app.todo-app
    main {{ message }}
      ul.todos
        li.todo(
            v-for="(todo, index) in todos"
            :key="todo._id"
        )
          div.container
            span {{todo}}
            button.update(
              @click="updateTodo(todo._id, {done: !todo.done, description: todo.description})"
              ) Update
            button.remove(@click="removeTodo(todo._id)") Remove
      input(
         type="text"
         v-model="newTodoDescription"
         placeholder="Take a todo"
         @keypress.enter="addNewTodo(newTodoPayload)"
      )
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
import useTodos from './composables/useTodos';
import { NewTodo, Todo } from './types/index';
/* eslint-enable */

export default defineComponent({
  name: 'App',
  setup() {
    /* eslint-disable */
    const { todos, addNewTodo, removeTodo, updateTodo } = useTodos();
    /* eslint-enable */
    const newTodoDescription = ref('');
    const newTodoPayload: NewTodo = reactive({
      description: computed((): string => newTodoDescription.value),
    });

    return {
      message: 'Todo list should be here',
      todos,
      newTodoDescription,
      newTodoPayload,
      addNewTodo,
      removeTodo,
      updateTodo,
    };
  },
});
</script>

<style lang="scss">
@import 'src/assets/styles/index';

.todo-app {
  text-align: center;
}
</style>
