<template>
  <div class="home">
    <conversion-form/>
    <exchange-rates/>
  </div>
</template>

<script>
import ConversionForm from '@/components/ConversionForm.vue';
import ExchangeRates from '@/components/ExchangeRates.vue';

export default {
  name: 'Home',
  components: {
    ConversionForm,
    ExchangeRates,
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  background: $gunmetal;
  padding: 100px 20px 20px;
}
</style>
