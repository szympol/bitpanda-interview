<template lang="pug">
  li.todos__element(
    v-if="todo.description"
  )
    BaseCheckbox(
      @update="$emit('update')"
      :value="todo.done"
    )
    p.todos__element-text {{todo.description}}
    BaseButton(
      v-if="todo.done"
      @click-button="$emit('remove')"
    ) X
    span {{timeDiff}}
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
  .todos__element {
    display:flex;
    align-items: center;
    > * {
      margin: 10px;
    }
  }
</style>
