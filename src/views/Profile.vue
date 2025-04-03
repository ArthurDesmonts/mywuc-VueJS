<template>
    <div class="m-4"  v-if="user">
        <div class="w-full border border-gray-200 p-4 rounded-2xl bg-customWhite-100 filter drop-shadow-2xl mb-4">
          <h2>User Profile</h2>
            <p>Name: {{ user.name }}</p>
            <p v-if="user.firstName != ''">First Name: {{ user.firstName }}</p>
            <p>Email: {{ user.mail }}</p>
            <p>Phone: {{ user.phone }}</p>
            <div v-if="user.wallet">
              <p>Wallet ID: {{ user.wallet.id }}</p>
              <p>Wallet Sold: {{ user.wallet.sold }}</p>
            </div>
        </div>
        <div class="border border-gray-200 p-4 rounded-2xl bg-customWhite-100 filter drop-shadow-2xl" @click="dropDownTransactionList()">
          <div class="flex flex-row justify-center gap-8" v-show="!dropDownList">
            <p>Transaction List</p>
            <span>▼</span>
          </div>
          <ul v-show="dropDownList" class="border border-gray-200 rounded-md p-2 bg-blue-100 text-blue-800 overflow-y-auto">
            <li v-for="transaction in user.Transactions" :key="transaction.id" :class="transaction.type === 'CREDIT' ? 'bg-green-100' : 'bg-red-100'" class="mb-2 p-2 border-b border-gray-200 rounded-md flex flex-row justify-between">
              <p>Type: {{ transaction.type }}</p>
              <p>Amount: {{ transaction.amount }}</p>
              <p>Date: {{ transaction.date }}</p>
            </li>
          </ul>
        </div>
    </div>
    <p v-if="error">{{ error }}</p>
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

  const dropDownList = ref(false);
  const dropDownTransactionList = () => {
    dropDownList.value = !dropDownList.value;
  }

  </script>
  