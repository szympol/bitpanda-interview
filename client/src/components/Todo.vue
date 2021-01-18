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

import { defineComponent } from '@vue/composition-api';

import BaseButton from '@/components/BaseButton.vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import useDateInterval from '@/composables/todos/useDateInterval';

export default defineComponent({
  name: 'VTodo',
  components: { BaseButton, BaseCheckbox },
  props: {
    todo: {
      type: Object,
    },
  },
  setup(props) {
    // fix reactivity issue with updated
    const { timeDiff } = useDateInterval(props.todo.updatedAt);

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
