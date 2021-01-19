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

<style lang="scss" scoped>
@import 'src/assets/styles/index';
input[type=text] {
  width: 100%;
  outline: 0;
  @include transition(border);
}
.header__search-input {
  margin-bottom: $space;
  border: 2px solid var( --bg-search-color);
  border-radius: $radius;
  padding: $space-1-2 $space-1-2 $space-1-2 calc(#{$space} * 2);
  font-weight: 300;
  color: var(--third-color);
  background-color: var( --bg-search-color);
  background-image: url('../assets/svgs/search-icon.svg');
  background-position: left $space-1-2 center;
  background-repeat: no-repeat;
  &:focus {
    border: 2px solid var(--third-color);
  }
}
.header__addNewTodo-input {
  border: $border;
  border-radius: $radius $radius 0 0;
  padding: $padding;
  color: var(--add-note-color);
  background-color: var(--bg-add-color);
  background-image: url('../assets/svgs/diagonal-lines.svg');
  background-position: right $space center;
  background-repeat: no-repeat;
  &:focus {
    border: 1px solid var(--third-color);
  }
}
</style>
