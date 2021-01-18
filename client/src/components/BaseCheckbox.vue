<template lang="pug">
  label
    input.checkbox(
      @change="$emit('update')"
      type="checkbox"
      :checked="value"
    )
    span
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

  $checkbox-color: grey;
  $checkmark-color: white;
  label {
    position: relative;
  }
  span {
    width: 16px;
    height: 16px;
    border: 1px solid $checkbox-color;
    display: inline-block;
    border-radius: 50%;
    transition: all linear 0.3s;
    &:after {
      content: "";
      position: absolute;
      top: -1px;
      left: 6px;
      border-bottom: 2px solid $checkmark-color;
      border-right: 2px solid $checkmark-color;
      height: 9px;
      width: 4px;
      transform: rotate(45deg);
      visibility: hidden;
    }
  }
  input {
    display: none;
    &:checked ~ span {
      background: $checkbox-color;
      &:after {
        visibility: visible;
      }
    }
  }

</style>
