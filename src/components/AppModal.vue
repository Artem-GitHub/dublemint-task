<template>
  <div
    v-if="showModal"
    class="app-modal"
    @click="hideModal"
  >
    <div
      class="app-modal__content"
      @click.stop
    >
      <div class="app-modal__heading">
        <h3 class="app-modal__title">
          <slot name="title"/>
        </h3>

        <button
          class="app-modal__close"
          type="button"
          @click="hideModal"
        >
          &#10006;
        </button>
      </div>

      <div class="app-modal__body">
        <slot name="body"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showModal: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue);
      },
    },
  },
  methods: {
    hideModal() {
      this.showModal = false;
      this.$emit('hide-modal');
    },
  },
};
</script>

<style lang="scss" scoped>
.app-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background: #00000050;
  padding: 20px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &__content {
    flex-basis: 300px;
    border-radius: 6px;
    background: $sky-blue;
    padding: 10px 20px 20px;
  }

  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__title {
    color: $white;
  }

  &__close {
    width: 20px;
    height: 20px;
    color: $white;
    background: transparent;
  }
}
</style>
