import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    status: '',
    user: {},
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, { token, user }) {
      state.token = token;
      state.status = 'success';
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.token = '';
      state.status = '';
      state.user = {};
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios.post('http://127.0.0.1:8000/api/user/login', user)
          .then(resp => {
            const token = resp.data.token;
            const userData = resp.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            commit('auth_success', { token, user: userData });
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    },
  },
});
