<template lang="pug">
  li.todo
    BaseCheckbox.todo__checkbox(
      @update="$emit('update')"
      :value="todo.done"
    )
    div.todo__content.font-weight--extra-light(
      :class="{'isChecked': todo.done}"
    )
      p.todo__content-text {{todo.description}}
        span.todo__content-caption - {{timeDiff}}
    BaseButton.todos__element-button(
      v-if="todo.done"
      @click-button="$emit('remove')"
    )
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="7.57715" y1="15.3625" x2="7.57715" y2="0.434816" stroke="#A3A3A3"/>
        <line x1="0.0771484" y1="7.93481" x2="14.9432" y2="7.93481" stroke="#A3A3A3"/>
      </svg>
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
  .todo {
    display: flex;
    align-items: center;
    padding: $space-1-3 $space;
    background-color:var(--bg-content-color);
    border: $border;
    @include transition(transform);
    &:last-of-type {
      border-radius: 0 0 $radius $radius;
    }
    &:hover {
      transform: scale(1.02);
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
    color: var(--prime-color);
    @include transition(color);
    &-text {
      margin: $space 0;
      .isChecked & {
        color: var(--secondary-color);
        text-decoration: line-through;
      }
    }
    &-caption {
      font-size: calc(1rem * 0.625);
      margin-left: $space-1-4;
      color: var(--secondary-color);
    }
  }
  .todos__element-button {
    svg {
      transform: rotate(45deg);
      @include transition(transform);
      &:hover {
        transform: rotate(315deg)
      }
    }
  }
</style>
