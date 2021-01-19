<template lang="pug">
  label.checkbox-wrapper
    input.checkbox(
      @change="$emit('update')"
      type="checkbox"
      :checked="value"
    )
    span.checkbox__icon
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BaseCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import 'src/assets/styles/index';

  .checkbox-wrapper {
    position: relative;
    height: $checkbox-size;
    width: $checkbox-size;
    cursor: pointer;
  }
  .checkbox__icon {
    width: inherit;
    height: inherit;
    border: 1px solid var(--bg-color);
    display: inline-block;
    border-radius: 50%;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right:0;
      visibility: hidden;
      background-image: url('../assets/svgs/checked.svg');
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
  .checkbox {
    display: none;
    &:checked ~ .checkbox__icon {
      &:after {
        visibility: visible;
      }
    }
  }

</style>
