<template>
  <div class="flex flex-col h-screen">
    <div class="bg-customWhite-100 p-4 border-2 border-gray-300 m-4 rounded-2xl">
      <h2 class="text-2xl">My Dashboard :</h2>
      <div class="flex flex-row gap-8">
        <div v-if="user" class="ml-4 flex flex-row">
          <div v-if="user.wallet" class="border border-gray-300 rounded-md m-4 p-4" :class="user.wallet.sold < 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
            <p class="text-lg font-semibold">Wallet Balance</p>
            <p class="text-2xl">$ {{ user.wallet.sold }}</p>
          </div>
        </div>
        <div v-if="user && user.Transactions && user.Transactions.length > 0" :class="lastTransaction.type === 'CREDIT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="border border-gray-300 rounded-md m-4 p-4">
          <p class="text-lg font-semibold">Last Transaction :</p>
          <p class="text-2xl text-center">$ {{ lastTransaction.amount }}</p>
          <p class="text-sm text-gray-600">{{ shortedDate(lastTransaction.date) }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-row mt-4">
      <div v-if="user" class="m-4 border-2 border-gray-300 p-4 rounded-2xl">
        <div class="flex flex-row gap-1 justify-center">
          <p class="text-lg font-semibold">Transactions:</p>
          <select v-model="selectedDateLimitation" name="dateLimitation" id="dateLimitation" class="border border-gray-300 rounded-md p-1 bg-blue-100 text-blue-800 mb-2" @change="updateTransactions">
            <option value="All">All Time</option>
            <option value="LastMonth">Last Month</option>
            <option value="LastWeek">Last Week</option>
            <option value="Today">Today</option>
          </select>
        </div>
        <ul class="border border-gray-300 rounded-md p-2 bg-blue-100 text-blue-800 overflow-y-auto" style="max-height: 290px;">
          <li v-for="transaction in filteredTransactionList" :key="transaction.id" :class="transaction.type === 'CREDIT' ? 'bg-green-100' : 'bg-red-100'" class="mb-2 p-2 border-b border-gray-200 rounded-md">
            <p class="font-medium">{{ transaction.type }}</p>
            <p>Amount: {{ transaction.amount }}</p>
            <p class="text-sm text-gray-600">Date: {{ shortedDate(transaction.date) }}</p>
          </li>
        </ul>
        <div class="flex flex-row gap-1 mt-1 justify-center">
          <button class="bg-customBlue-200 w-full p-1 rounded text-customWhite-100" @click="OpenTransaction()">New transaction</button>
        </div>
      </div>
      <div class="m-4 border-2 border-gray-300 p-4 rounded-2xl">
        <p class="text-lg font-semibold">Evolution of flows :</p>
        <div class="rounded-md">
          <CashFlowGraph :transactions="filteredTransactionList" :lastAmount="lastAmount" :key="transactionKey"></CashFlowGraph>
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
import CashFlowGraph from '@/component/CashFlowGraph.vue';

const store = useStore();
const user = computed(() => store.state.user);
const transactionKey = ref(0);

const lastTransaction = computed(() => {
  if (user.value && user.value.Transactions && user.value.Transactions.length > 0) {
    return user.value.Transactions[0];
  }
  return null;
});

const transactionList = computed(() => {
  if (user.value && user.value.Transactions) {
    return user.value.Transactions;
  }
  return [];
});

const firstTransaction = computed(() => {
  if (user.value && user.value.Transactions && user.value.Transactions.length > 0) {
    return user.value.Transactions[user.value.Transactions.length - 1];
  }
  return null;
});

const filteredTransactionList = ref([]);
const selectedDateLimitation = ref('All');
const lastAmount = ref();

onMounted(async () => {
  try {
    await store.dispatch('fetchUserProfile');
    filteredTransactionList.value = transactionList.value;
    lastAmount.value = firstTransaction.value.amount;
  } catch (err) {
    console.error(err);
  }
});

const transactionAction = ref(false);

const OpenTransaction = () => {
  transactionAction.value = true;
};

const CloseTransaction = () => {
  transactionAction.value = false;
};

const handleFormSubmitted = (formData) => {
  let dateReformated = new Date(formData.selectedDate);
  formData.selectedDate = `${dateReformated.getDate()}/${dateReformated.getMonth() + 1}/${dateReformated.getFullYear()}`;
  try {
    store.dispatch('addTransaction', { id: user.value.id, transaction: formData }).then(() => {
      store.dispatch('fetchUserProfile').then(() => {
        updateTransactions({ target: { value: selectedDateLimitation.value } });
        transactionKey.value += 1;
      });
    });
  } catch (err) {
    console.error(err);
  }
  CloseTransaction();
};

const shortedDate = (date) => {
  let dateReformated = new Date(date);
  return `${dateReformated.getDate()}/${dateReformated.getMonth() + 1}/${dateReformated.getFullYear()}`;
};

/**
 * Update the transaction list and last amount of wallet during a time frame change
 * @param event 
 */
function updateTransactions(event) {
  let dateLimitation = event.target.value;
  let dateLimit = new Date();
  if (dateLimitation === 'All') {
    filteredTransactionList.value = transactionList.value;
    if(lastAmount.value != firstTransaction.value.amount){
      lastAmount.value = null;
    }
  } else {
    if (dateLimitation === 'LastMonth') {
      dateLimit.setMonth(dateLimit.getMonth() - 1);
    } else if (dateLimitation === 'LastWeek') {
      dateLimit.setDate(dateLimit.getDate() - 7);
    } else if (dateLimitation === 'Today') {
      dateLimit.setHours(0, 0, 0, 0);
    }

    filteredTransactionList.value = transactionList.value.filter(transaction => {
      let dateTransaction = new Date(transaction.date);
      return dateTransaction >= dateLimit;
    });
    lastAmount.value = sumsOfTransactionsAtIndex(indexOfPreviousTransaction(filteredTransactionList.value));
  }
}

/**
 * @Return the index of the last transaction in @transactionList
 * But the index is out side the @params array @list
 * Work as an entry point for other function
 * @param list 
 */
function indexOfPreviousTransaction(list) {
  let filteredList = [...list];
  let pivotElement = filteredList.reverse()[0];
  return transactionList.value.indexOf(pivotElement) + 1;
}

/**
 * Calculate the Amount of the wallet before a specific @index in the @transactionList attribut
 * @param index 
 */
function sumsOfTransactionsAtIndex(index){
  let amountList = [...transactionList.value].slice(index).reverse();
  let sums = 0;
  for(let i = 0; i < amountList.length; i++){
    sums += amountList[i].amount;
  }
  return sums; 
}
</script>
