<template lang="pug">
  #app.todo-app
    main {{ message }}
      ul.todos
        li.todo(
            v-for="(todo, index) in todos"
        ) {{todo}}
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

/* eslint-disable */
import useTodos from './composables/useTodos';
/* eslint-enable */

export default defineComponent({
  name: 'App',
  setup() {
    const newTodoDescription = ref('Text');
    const { todos, updateTodo } = useTodos();

    setTimeout(() => {
      console.log('trigger');
      updateTodo('6001a40ea68242001357114c', { done: true });
    }, 10000);

    return {
      message: 'Todo list should be here',
      todos,
      newTodoDescription,
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
