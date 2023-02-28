<template>
  <input
    class="app-input-field"
    v-model="fieldValue"
    :type="fieldType"
    :name="fieldName"
    :placeholder="fieldPlaceholder"
  />
</template>

<script>
export default {
  name: 'AppInputField',
  props: {
    modelValue: {
      type: [String, Number],
      default: null,
    },
    fieldType: {
      type: String,
      default: 'text',
    },
    fieldName: {
      type: String,
      required: true,
    },
    fieldPlaceholder: {
      type: String,
      default: null,
    },
  },
  computed: {
    fieldValue: {
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
.app-input-field {
  height: 40px;
  border-radius: 6px;
  padding: 0 10px;
  background: white;
}
</style>
