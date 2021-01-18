<template lang="pug">
  input.input(
    @input="$emit('input',$event.target.value)"
    @keyup.enter="$emit('enter')"
    type="text"
    :placeholder="placeholder"
  )
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BaseInput',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>
