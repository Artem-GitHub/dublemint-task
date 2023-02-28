<template>
  <app-modal
    v-model="showModal"
    @hide-modal="hideModal"
  >
    <template #title>
      Add new currencies
    </template>

    <template #body>
      <div class="add-currency-modal">
        <app-input-field
          :field-name="'search'"
          :placeholder="'Search'"
          @input="searchCurrency"
        />

        <ul class="currency-list">
          <li
            v-for="currency in filteredCurrenciesList"
            :key="currency.iso"
            class="currency-list__item"
          >
            <app-checkbox
              :checkbox-id="currency.iso"
              :checkbox-name="currency.iso"
              @input="selectCurrency($event, currency.iso)"
            >
              {{ currency.iso }}
            </app-checkbox>
          </li>
        </ul>

        <app-button
          @click="addSelectedCurrencies"
          :disabled="!selectedCurrencies.length"
        >
          Add
        </app-button>
      </div>
    </template>
  </app-modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AppModal from '@/components/AppModal.vue';
import AppInputField from '@/components/AppInputField.vue';
import AppButton from '@/components/AppButton.vue';
import AppCheckbox from '@/components/AppCheckbox.vue';

export default {
  name: 'AddCurrencyModal',
  components: {
    AppModal,
    AppInputField,
    AppButton,
    AppCheckbox,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    currencySelected: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedCurrencies: [],
      searchValue: '',
    };
  },
  computed: {
    ...mapState(['localCurrencies']),
    ...mapGetters(['currenciesList']),
    filteredCurrenciesList() {
      return this.currenciesList?.filter((currency) => (
        currency.iso.toLowerCase().includes(this.searchValue.toLowerCase())
          && !this.localCurrencies.includes(currency.iso)
      ));
    },
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
      this.selectedCurrencies = [];
      this.searchValue = '';
    },

    searchCurrency(event) {
      this.searchValue = event.target.value;
    },

    selectCurrency(event, value) {
      if (event.target.checked) {
        this.selectedCurrencies.push(value);
      } else {
        const index = this.selectedCurrencies.findIndex((currency) => currency === value);
        this.selectedCurrencies.splice(index, 1);
      }
    },

    async addSelectedCurrencies() {
      await this.$store.dispatch('addLocalCurrencies', this.selectedCurrencies);

      await this.$store.dispatch('getExchangeRates', {
        from: this.currencySelected,
        to: this.localCurrencies.join(','),
      });

      this.showModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-currency-modal {
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 10px;
}

.currency-list {
  display: flex;
  flex-direction: column;
  max-height: 180px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: $steel-blue;
    border-radius: 3px;
  }

  &__item {
    display: flex;
    align-items: center;
    min-height: 40px;
    column-gap: 10px;
    border-bottom: 1px solid $steel-blue;
  }
}
</style>
