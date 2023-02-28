<template>
  <div class="exchange-rates">
    <div class="exchange-rates__actions">
      <app-select
        v-model="originalCurrencySelect"
        :options="defaultSelectCurrencies"
      />

      <div class="exchange-rates__buttons">
        <app-button
          class="exchange-rates__button"
          @click="showModal = true"
        >
          Add
        </app-button>

        <app-button
          class="exchange-rates__button"
          @click="updateExchangeRates"
          :disabled="Boolean(updateTimeout)"
        >
          Update
        </app-button>
      </div>
    </div>

    <ul class="exchange-rates__list">
      <li
        v-for="rate in exchangeRatesList"
        :key="rate.quotecurrency"
        class="exchange-rates__list-item"
      >
        <span class="exchange-rates__list-currency">
          {{ rate.quotecurrency }}
        </span>

        <span class="exchange-rates__list-value">
          {{ rate.mid }}
        </span>
      </li>
    </ul>
  </div>

  <add-currency-modal
    v-model="showModal"
    :currency-selected="originalCurrencySelect"
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AppSelect from '@/components/AppSelect.vue';
import AppButton from '@/components/AppButton.vue';
import AddCurrencyModal from '@/components/AddCurrencyModal.vue';

export default {
  name: 'ExchangeRates',
  components: {
    AppSelect,
    AddCurrencyModal,
    AppButton,
  },
  data() {
    return {
      defaultSelectCurrencies: ['USD', 'EUR', 'UAH'],
      originalCurrencySelect: 'USD',
      showModal: false,
      updateTimeout: null,
    };
  },
  async mounted() {
    await this.$store.dispatch('getLocalCurrencies');

    this.$store.dispatch('getExchangeRates', {
      from: this.originalCurrencySelect,
      to: this.localCurrencies.join(','),
    });

    this.$store.dispatch('getCurrencies');
  },
  computed: {
    ...mapState(['localCurrencies']),
    ...mapGetters(['exchangeRatesList']),
  },
  watch: {
    originalCurrencySelect(newValue) {
      this.$store.dispatch('getExchangeRates', {
        from: newValue,
        to: this.localCurrencies.join(','),
      });
    },
  },
  methods: {
    updateExchangeRates() {
      if (this.updateTimeout) return;

      this.$store.dispatch('getExchangeRates', {
        from: this.originalCurrencySelect,
        to: this.localCurrencies.join(','),
      });

      this.updateTimeout = setTimeout(() => {
        this.updateTimeout = null;
        return true;
      }, 5000);
    },
  },
};
</script>

<style lang="scss" scoped>
.exchange-rates {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  column-gap: 10px;
  background: $sky-blue;
  border-radius: 6px;
  margin: 20px auto auto;
  padding: 20px;

  &__actions {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    @include media-breakpoint-up(xs) {
      flex-direction: row;
      column-gap: 10px;
    }
  }

  &__buttons {
    display: flex;
    column-gap: 10px;
    justify-content: space-between;
  }

  &__button {
    flex: 1;

    @include media-breakpoint-up(xs) {
      min-width: 80px;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @include media-breakpoint-up(xs) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    &-item {
      display: flex;
      align-items: center;
      height: 40px;
      color: $white;
      padding: 0 10px;
    }

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
