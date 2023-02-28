<template>
  <select
    class="app-select"
    v-model="selectValue"
  >
    <option
      v-for="option in options"
      :key="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      defailt: () => [],
    },
  },
  computed: {
    selectValue: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.app-select {
  width: 100%;
  height: 40px;
  background: $steel-blue;
  border-radius: 6px;
  color: $white;
  padding: 0 10px;
}
</style>
