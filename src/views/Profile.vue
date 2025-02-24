<template>
    <div class="profile">
      <h2>User Profile</h2>
      <div v-if="user">
        <p>Name: {{ user.name }}</p>
        <p v-if="user.firstName != ''">First Name: {{ user.firstName }}</p>
        <p>Email: {{ user.mail }}</p>
        <p>Phone: {{ user.phone }}</p>
        <div v-if="user.wallet">
          <p>Wallet ID: {{ user.wallet.id }}</p>
          <p>Wallet Sold: {{ user.wallet.sold }}</p>
        </div>
        <p>Transactions:</p>
        <ul>
          <li v-for="transaction in user.Transactions" :key="transaction.id">
            <p>Type: {{ transaction.type }}</p>
            <p>Amount: {{ transaction.amount }}</p>
            <p>Date: {{ transaction.date }}</p>
          </li>
        </ul>

      </div>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const user = computed(() => store.state.user);
  const error = ref('');
  
  onMounted(async () => {
    try {
      await store.dispatch('fetchUserProfile');
    } catch (err) {
      error.value = err.response?.data?.error || 'An error occurred';
    }
  });
  </script>
  