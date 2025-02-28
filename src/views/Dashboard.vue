<template>
    <div class="flex flex-col h-screen">
      <div class="bg-customWhite-100 p-4">
        <h2 class="text-2xl">My Dashboard</h2>
        <div v-if="user" class="ml-4 flex flex-row">
            <div v-if="user.wallet" class=" border border-gray-300 rounded-md m-4 p-4 bg-green-100 text-green-800" :class="user.wallet.sold < 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
            <p class="text-lg font-semibold">Wallet Balance</p>
            <p class="text-2xl">$ {{ user.wallet.sold}}</p>
            </div>
        </div>
      </div>
      <div class="flex flex-row mt-4 p-4">
        <div v-if="user" class="m-4">
          <p class="text-lg font-semibold">Last Transactions:</p>
          <ul class="border border-gray-300 rounded-md p-2 bg-blue-100 text-blue-800">
            <li v-for="transaction in user.Transactions" :key="transaction.id" 
            :class="transaction.type === 'DEBIT' ? 'bg-green-100' : 'bg-red-100'"
            class="mb-2 p-2 border-b border-gray-200 rounded-md">
          <p class="font-medium">Type: {{ transaction.type }}</p>
          <p>Amount: {{ transaction.amount }}</p>
          <p class="text-sm text-gray-600">Date: {{ transaction.date }}</p>
            </li>
          </ul>
        </div>
        <div>
          <p class="m-4">Evolution of flows :</p>
          <div class="border border-gray-300 rounded-md p-4 bg-yellow-100 text-yellow-800">
            <p class="text-lg font-semibold">Coming soon</p>
          </div>
        </div>
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
  