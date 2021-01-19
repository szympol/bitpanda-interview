<template lang="pug">
  input.input(
    @input="$emit('input',$event.target.value)"
    @keyup.enter="enter"
    @keyup.esc="leave"
    type="text"
    :placeholder="placeholder"
    ref="inputRef"
  )
</template>

<script lang="ts">

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'BaseInput',
  emits: ['enter', 'leave'],
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    onEnter: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const inputRef = ref<HTMLInputElement>();

    const clearText = ():void => {
      context.emit('input', '');
      if (!!inputRef && !!inputRef.value) {
        inputRef.value.value = '';
      }
    };

    return {
      inputRef,
      enter: ():void => {
        if (!props.onEnter) return;

        context.emit('enter');
        clearText();
      },
      leave: ():void => {
        clearText();
      },
    };
  },
});
</script>

<style scoped>
</style>
