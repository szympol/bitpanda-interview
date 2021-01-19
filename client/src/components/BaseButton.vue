<template lang="pug">
  button.button(
    @click="$emit('click-button')"
  )
    slot

</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BaseButton',
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
  .button {
    background-color: transparent;
    border: none;
    outline: 0;
    color: white;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }
</style>
