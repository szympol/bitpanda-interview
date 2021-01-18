<template lang="pug">
  button(
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

<style scoped>
</style>
