<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const chart = ref(null);
const store = useStore();
const walletAmount = ref([]);
const user = computed(() => store.state.user);

async function userData() {
  try {
    await store.dispatch('fetchUserProfile');
    console.log(user.value);
    if (user!== null) {
        const transactions = user.value.Transactions.reverse();
        walletAmount.value = walletFlow(transactions);
    }
    createChart();
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
    userData();
});

const walletFlow = (arrayOfTransactions) => {
  let transactionMap = new Map();
  arrayOfTransactions.forEach((transaction) => {
    let date = new Date(transaction.date);
    let key = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    if(transactionMap.size == 0) {
      transactionMap.set(key, transaction.amount);
    } else {
      let previousAmount = transactionMap.get(Array.from(transactionMap.keys()).pop());
      transactionMap.set(key, previousAmount + transaction.amount);
    }
  });
  return transactionMap;
}

function createChart() {
  const ctx = chart.value.getContext("2d");
  chart.value = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from(walletAmount.value.keys()),
      datasets: [
        {
          label: "Cash Flow",
          data: Array.from(walletAmount.value.values()),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
</script>

<template>
  <div class="flex justify-center w-full bg-blue-100 border border-customGrey-500 rounded p-4 mt-2">
    <canvas class="w-full h-64" ref="chart"></canvas>
  </div>
</template>