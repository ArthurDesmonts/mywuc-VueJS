<template>
  <div class="flex flex-col h-screen">
    <div class="bg-customWhite-100 p-4 border-2 border-gray-300 m-4 rounded-2xl">
      <h2 class="text-2xl">My Dashboard :</h2>
      <div class="flex flex-row gap-8">
        <div v-if="user" class="ml-4 flex flex-row">
            <div v-if="user.wallet" class=" border border-gray-300 rounded-md m-4 p-4 bg-green-100 text-green-800" :class="user.wallet.sold < 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
              <p class="text-lg font-semibold">Wallet Balance</p>
              <p class="text-2xl">$ {{ user.wallet.sold}}</p>
            </div>
        </div>
        <div v-if="user && user.Transactions && user.Transactions.length > 0" :class="lastTransaction.type === 'DEBIT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
            class="border border-gray-300 rounded-md m-4 p-4 bg-green-100 text-green-800">
            <p class="text-lg font-semibold">Last Transaction :</p>
            <p class="text-2xl text-center">$ {{ lastTransaction.amount }}</p>
            <p class="text-sm text-gray-600">{{ lastTransaction.date }}</p>
          </div>
      </div>
    </div>
    <div class="flex flex-row mt-4 p-4 border-2 border-gray-300 m-4 rounded-2xl">
      <div v-if="user" class="m-4">
        <p class="text-lg font-semibold">Transactions:</p>
        <ul class="border border-gray-300 rounded-md p-2 bg-blue-100 text-blue-800">
          <li v-for="transaction in user.Transactions" :key="transaction.id" 
          :class="transaction.type === 'DEBIT' ? 'bg-green-100' : 'bg-red-100'"
          class="mb-2 p-2 border-b border-gray-200 rounded-md">
          <p class="font-medium">Type: {{ transaction.type }}</p>
          <p>Amount: {{ transaction.amount }}</p>
          <p class="text-sm text-gray-600">Date: {{ transaction.date }}</p>
          </li>
        </ul>
        <div class="flex flex-row gap-1 mt-1 justify-center">
          <button class="bg-customBlue-200 w-full p-1 rounded text-customWhite-100" @click="OpenTransaction()">New transaction</button>
        </div>
      </div>
      <div class="m-4">
        <p class="text-lg font-semibold">Evolution of flows :</p>
        <div class="border border-gray-300 rounded-md p-4 bg-yellow-100 text-yellow-800">
          <p class="text-lg font-semibold">Coming soon</p>
        </div>
      </div>
    </div>
    <TransactionForm v-if="transactionAction" @formSubmitted="handleFormSubmitted"></TransactionForm>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import TransactionForm from '@/component/TransactionForm.vue';

const store = useStore();
const user = computed(() => store.state.user);
const lastTransaction = computed(() => {
  if (user.value && user.value.Transactions && user.value.Transactions.length > 0) {
    return user.value.Transactions[user.value.Transactions.length - 1];
  }
  return null;
});


onMounted(async () => {
try {
  await store.dispatch('fetchUserProfile');
} catch (err) {
  console.error(err);
}
});

/*
  Transaction form management
*/
const transactionAction = ref(false);

const OpenTransaction = () => {
  console.log('Open transaction form');
  transactionAction.value = true;
};

const CloseTransaction = () => {
  console.log('Close transaction form');
  transactionAction.value = false;
};

const handleFormSubmitted = (formData) => {
  let dateReformated = new Date(formData.selectedDate);
  formData.selectedDate = `${dateReformated.getDate()}/${dateReformated.getMonth() + 1}/${dateReformated.getFullYear()}`;
  try {
    store.dispatch('addTransaction', { id: user.value.id, transaction: formData }).then(() => {
      store.dispatch('fetchUserProfile');
    });
  } catch (err) {
    console.error(err);
  }
  CloseTransaction();
};

//catch emit : close


</script>
