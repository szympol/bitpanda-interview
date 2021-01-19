<template lang="pug">
  li.todo-wrapper
    BaseCheckbox.todo__checkbox(
      @update="$emit('update')"
      :value="todo.done"
    )
    div.todo__content.font-weight--extra-light
      p.todo__content-text {{todo.description}}
        span.todo__content-caption - {{timeDiff}}
    BaseButton.todos__element-button(
      v-if="todo.done"
      @click-button="$emit('remove')"
    ) X
</template>

<script lang="ts">

import { defineComponent, PropType, watch } from '@vue/composition-api';

import BaseButton from '@/components/BaseButton.vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import useDateInterval from '@/composables/todos/useDateInterval';
import Todo from '@/types/models/todo';

export default defineComponent({
  name: 'VTodo',
  components: { BaseButton, BaseCheckbox },
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  setup(props) {
    const { timeDiff, getLastUpdateTime } = useDateInterval(props.todo.updatedAt);

    watch(():string => props.todo.updatedAt, (currentUpdateTime):void => {
      getLastUpdateTime(currentUpdateTime);
    });

    return {
      timeDiff,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'src/assets/styles/index';
  .todo-wrapper {
    display: flex;
    align-items: center;
    padding: $space-1-3 $space;
    background-color:var(--bg-content-color);
    border: $border;
    &:last-of-type {
      border-radius: 0 0 $radius $radius;
    }
  }
  .todo__checkbox {
    margin-right: $space-1-2;
  }
  .todos__element-button {
    margin-left: auto;
  }
  .todo__content {
    display: flex;
    align-items: center;
    color: var(--secondary-color);
    &-text {
      margin: $space 0;
    }
    &-caption {
      font-size: calc(1rem * 0.625);
      margin-left: $space-1-4;
    }
  }
</style>
