<template>
  <div class="app-checkbox">
    <input
      :id="checkboxId"
      class="app-checkbox__input"
      :name="checkboxName"
      type="checkbox"
    >

    <label
      :for="checkboxId"
      class="app-checkbox__label"
    >
      <slot/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'AppCheckbox',
  props: {
    checkboxName: {
      type: String,
      required: true,
    },
    checkboxId: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.app-checkbox {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  &__input {
    display: none;

    &:checked ~ .app-checkbox__label:after {
      content: "";
      display: block;
      width: 10px;
      height: 10px;
      background-color: $steel-blue;
      border-radius: 2px;
      position: absolute;
      top: 3px;
      left: 3px;
    }
  }

  &__label {
    color: $white;
    line-height: 15px;
    margin-left: 26px;

    &:before {
      content: "";
      display: block;
      width: 16px;
      height: 16px;
      background: $white;
      border: 1px solid $steel-blue;
      border-radius: 4px;
      cursor: pointer;
      position: absolute;
      left: 0;
    }
  }
}
</style>
