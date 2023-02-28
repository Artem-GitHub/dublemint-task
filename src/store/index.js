import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    currencies: {},
    formExchangeRates: {},
    exchangeRates: {},
    defaultLocalCurrencies: ['USD', 'EUR', 'UAH', 'GBP', 'CNY', 'CAD'],
    localCurrencies: [],
  },
  mutations: {
    setCurrencies(state, data) {
      state.currencies = data;
    },

    setFormExchangeRates(state, data) {
      state.formExchangeRates = data;
    },

    setExchangeRates(state, data) {
      state.exchangeRates = data;
    },

    setLocalCurrencies(state, data) {
      state.localCurrencies = [...state.defaultLocalCurrencies, ...data];
    },
  },
  actions: {
    async getCurrencies({ commit }) {
      try {
        const { data, status } = await axios.get('/currencies.json');

        if (status === 200) {
          commit('setCurrencies', data);
          return data;
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async getFormExchangeRates({ commit }, params) {
      try {
        const { data, status } = await axios.get('/convert_from.json', { params });

        if (status === 200) {
          commit('setFormExchangeRates', data);
          return data;
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async getExchangeRates({ commit }, params) {
      try {
        const { data, status } = await axios.get('/convert_from.json', { params });

        if (status === 200) {
          commit('setExchangeRates', data);
          return data;
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    getLocalCurrencies({ commit }) {
      try {
        const localCurrencies = JSON.parse(localStorage.getItem('localCurrencies')) || [];
        commit('setLocalCurrencies', localCurrencies);
        return localCurrencies;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    addLocalCurrencies({ commit }, payload) {
      try {
        const localCurrencies = JSON.parse(localStorage.getItem('localCurrencies')) || [];
        const newLocalCurrencies = [...localCurrencies, ...payload];
        localStorage.setItem('localCurrencies', JSON.stringify(newLocalCurrencies));
        commit('setLocalCurrencies', newLocalCurrencies);
        return newLocalCurrencies;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
  getters: {
    formExchangeRatesList(state) {
      return state.formExchangeRates.to;
    },

    exchangeRatesList(state) {
      return state.exchangeRates.to?.map((rate) => ({
        quotecurrency: rate.quotecurrency,
        mid: rate.mid.toFixed(2),
      }));
    },

    currenciesList(state) {
      return state.currencies.currencies;
    },
  },
});
