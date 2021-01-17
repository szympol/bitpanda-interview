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
                  @keypress="todosService.addNewTodo(newTodoPayload, $refs.inputAddTodo.$el)"
                  placeholder="Take a note"
                  ref="inputAddTodo"
                )
            li.todos__element(
                v-for="(todo, index) in todosService.todos.value"
                :key="todo._id"
            )
                div.container-todo
                    span {{todo}}
                    button.update(
    @click="todosService.updateTodo(todo._id,{done: !todo.done, description: todo.description})"
                    ) Update
                    button.remove(
                        @click="todosService.removeTodo(todo._id)"
                    ) Remove
        button.deleteChecked(
            type='text'
            @click="todosService.removeAllChecked"
        )   Remove all done todos
</template>

<script lang="ts">
/* eslint-disable */
import { NewTodo } from '@/types/index';
import { defineComponent, ref, computed, reactive } from '@vue/composition-api';
import BaseInput from '@/components/BaseInput.vue';
import useTodos from '@/composables/useTodos';
import useSearch from '@/composables/useSearch';
/* eslint-enable */

export default defineComponent({
  name: 'App',
  components: {
    BaseInput,
  },
  setup() {
    const todosService = useTodos();

    const searchText = ref('');

    useSearch(searchText, todosService.getTodos);

    const inputAddTodo = ref();
    const newTodoDescription = ref('');
    const newTodoPayload: NewTodo = reactive({
      description: computed((): string => newTodoDescription.value),
    });

    return {
      todosService,
      newTodoDescription,
      newTodoPayload,
      searchText,
      inputAddTodo,
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
