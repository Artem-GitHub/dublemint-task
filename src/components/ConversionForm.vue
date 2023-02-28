<template>
  <div class="conversion-form">
    <div class="conversion-form__inputs-wrapper">
      <app-select
        v-model="originalCurrencySelect"
        :options="defaultSelectCurrencies"
      />

      <app-input-field
        v-model="originalCurrencyValue"
        :field-name="'original-currency'"
        :field-placeholder="'0'"
        @input="setOriginalCurrencyValue"
      />

      <div class="conversion-form__output">
        <span class="conversion-form__output-currency">
          {{ desiredCurrencySelect }}
        </span>

        <span class="conversion-form__output-value">
          {{ desiredResult.toString() }}
        </span>
      </div>
    </div>

    <div class="conversion-form__inputs-wrapper">
      <app-select
        v-model="desiredCurrencySelect"
        :options="defaultSelectCurrencies"
      />

      <app-input-field
        v-model="desiredCurrencyValue"
        :field-name="'desired-currency'"
        :field-placeholder="'0'"
        @input="setDesiredCurrencyValue"
      />

      <div class="conversion-form__output">
        <span class="conversion-form__output-currency">
          {{ originalCurrencySelect }}
        </span>

        <span class="conversion-form__output-currency">
          {{ originalResult.toString() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppInputField from '@/components/AppInputField.vue';
import AppSelect from '@/components/AppSelect.vue';

export default {
  name: 'ConversionForm',
  components: {
    AppInputField,
    AppSelect,
  },
  data() {
    return {
      /** Replaced BTC, ETH, BNB, XRP with CNY, CAD, AUD, JPY
      as API does not give these currencies */
      defaultSelectCurrencies: ['USD', 'EUR', 'UAH', 'GBP', 'CNY', 'CAD', 'AUD', 'JPY'],
      originalCurrencySelect: 'USD',
      desiredCurrencySelect: 'EUR',
      originalCurrencyValue: null,
      desiredCurrencyValue: null,
      valueLimitInUsd: 10000,
      inputsPattern: /^\d+(\.\d+)?\.?$/,
    };
  },
  mounted() {
    this.$store.dispatch('getFormExchangeRates', {
      from: this.originalCurrencySelect,
      to: this.defaultSelectCurrencies.join(','),
    });
  },
  computed: {
    ...mapGetters(['formExchangeRatesList']),
    usdCurrencyRate() {
      return this.formExchangeRatesList?.find((item) => item.quotecurrency === 'USD').mid;
    },

    originalCurrencyRate() {
      return this.formExchangeRatesList
        ?.find((item) => item.quotecurrency === this.originalCurrencySelect).mid;
    },

    desiredCurrencyRate() {
      return this.formExchangeRatesList
        ?.find((item) => item.quotecurrency === this.desiredCurrencySelect).mid;
    },

    originalResult() {
      return Math.ceil((+this.desiredCurrencyValue / this.desiredCurrencyRate) * 100) / 100 || 0;
    },

    desiredResult() {
      return Math.floor(+this.originalCurrencyValue * this.desiredCurrencyRate * 100) / 100 || 0;
    },

    originalAboveLimit() {
      return (this.usdCurrencyRate / this.originalCurrencyRate)
        * +this.originalCurrencyValue > this.valueLimitInUsd;
    },

    desiredAboveLimit() {
      return (this.usdCurrencyRate / this.desiredCurrencyRate)
        * +this.desiredCurrencyValue > this.valueLimitInUsd;
    },
  },
  watch: {
    originalCurrencySelect(newValue) {
      this.$store.dispatch('getFormExchangeRates', {
        from: newValue,
        to: this.defaultSelectCurrencies.join(','),
      });
    },
  },
  methods: {
    setOriginalCurrencyValue(event) {
      const value = event?.target?.value;

      if (!this.inputsPattern.test(value) || this.originalAboveLimit) {
        this.originalCurrencyValue = this.originalCurrencyValue
          .slice(0, (value.length - 1));
      }
    },

    setDesiredCurrencyValue(event) {
      const value = event?.target?.value;

      if (!this.inputsPattern.test(value) || this.desiredAboveLimit) {
        this.desiredCurrencyValue = this.desiredCurrencyValue
          .slice(0, (value.length - 1));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.conversion-form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  row-gap: 10px;
  background: $sky-blue;
  border-radius: 6px;
  margin: 0 auto;
  padding: 20px;

  @include media-breakpoint-up(xs) {
    flex-direction: row;
    column-gap: 10px;
  }

  &__inputs-wrapper {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    row-gap: 10px;
  }

  &__output {
    margin-top: 10px;
    padding: 0 10px;

    &-currency, &-value {
      line-height: 15px;
      color: $white;
    }

    &-currency {
      margin-right: 10px;
    }
  }
}
</style>
