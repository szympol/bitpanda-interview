<template lang="pug">
  input.input(
    @input="$emit('input',$event.target.value)"
    @keypress.enter="$emit('keypress')"
    type="text"
    :placeholder="placeholder"
  )
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from '@vue/composition-api';
/* eslint-enable */

export default defineComponent({
  name: 'BaseInput',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  //   emits: ['update:newTodoDescription'],
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>
