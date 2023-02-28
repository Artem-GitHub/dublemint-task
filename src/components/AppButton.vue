<template>
  <button
    class="app-button"
    :class="{ 'app-button--disabled': disabled }"
    :type="buttonType"
    :disabled="disabled"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    buttonType: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.app-button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $white;
  padding: 10px;
  border-radius: 6px;
  white-space: nowrap;
  transition: ease 0.3s background;

  &:not(:hover) {
    background: $steel-blue;
  }

  &:hover {
    background: $steel-blue-hover;
  }

  &--disabled {
    &:not(:hover) {
      background: $steel-blue-disabled;
    }

    &:hover {
      background: $steel-blue-disabled;
    }
  }
}
</style>
