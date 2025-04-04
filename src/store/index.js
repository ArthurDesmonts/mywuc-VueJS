import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    status: '',
    user: {},
    isLoggedIn: false,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, { token, user }) {
      state.token = token;
      state.status = 'success';
      state.user = user;
      state.isLoggedIn = true;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.token = '';
      state.status = '';
      state.user = {};
      state.isLoggedIn = false;
    },
    set_user(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios.post('/user/login', user)
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
    restoreSession({ commit }) {
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          axios.get('/user/me')
            .then(resp => {
              commit('auth_success', { token, user: resp.data });
              resolve(resp);
            })
            .catch(err => {
              commit('auth_error');
              localStorage.removeItem('token');
              reject(err);
            });
        } else {
          reject(new Error('No token found'));
        }
      });
    },
    fetchUserProfile({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/user/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(resp => {
            commit('set_user', resp.data);
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addTransaction({}, { id, transaction }) {
      return new Promise((resolve, reject) => {
      axios.post(`/wallet/transaction/add/${id}`, transaction, {
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(resp => {
        resolve(resp);
        })
        .catch(err => {
        reject(err);
        });
      });
    },
    removeTransaction({}, { id, transaction }) {
      return new Promise((resolve, reject) => {
        axios.delete(`/wallet/transaction/remove/${id}`, {
          data: transaction,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
      });
    },
    fetchUserDebitMonthly({}, { id }) {
      return new Promise((resolve, reject) => {
        axios.get(`/wallet/transaction/debit/month/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(resp => {
            resolve(resp.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    fetchUserCreditMonthly({}, { id }) {
      return new Promise((resolve, reject) => {
        axios.get(`/wallet/transaction/credit/month/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(resp => {
            resolve(resp.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }  
  },
});
