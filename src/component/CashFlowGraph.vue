<script setup>
import { onMounted, ref, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps(['transactions', 'lastAmount']);
const chart = ref(null);
const walletAmount = ref(new Map());

const localTransactions = ref([]);
const lastWalletAmount = ref();

/**
 * Create the map of points for the graph
 * Objects : [ 'date' : 'amount']
 * @param arrayOfTransactions 
 */
const walletFlow = (arrayOfTransactions) => {
  let transactionMap = new Map();
  arrayOfTransactions.forEach((transaction) => {
    let date = new Date(transaction.date);
    let key = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    if (transactionMap.size === 0) {
      if (lastWalletAmount.value != null){
        let startkey = `${date.getDate() - 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
        transactionMap.set(startkey, lastWalletAmount.value);
      }
      transactionMap.set(key, lastWalletAmount.value + transaction.amount);
    } else {
      let previousAmount = transactionMap.get(Array.from(transactionMap.keys()).pop());
      transactionMap.set(key, previousAmount + transaction.amount);
    }
  });
  return transactionMap;
};

/**
 * Create the graph
 */
const createChart = () => {
  if (chart.value) {
    const ctx = chart.value.getContext("2d");
    if (chart.value.chart) {
      chart.value.chart.destroy();
    }
    chart.value.chart = new Chart(ctx, {
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
};

/**
 * Update props values on time frame changes
 */
watch(() => props.transactions, (newTransactions) => {
  localTransactions.value = [...newTransactions];
  lastWalletAmount.value = props.lastAmount;
  walletAmount.value = walletFlow(localTransactions.value.reverse());
  createChart();
});

onMounted(() => {
  if (props.transactions && props.lastAmount) {
    localTransactions.value = [...props.transactions];
    lastWalletAmount.value = props.lastAmount;
    walletAmount.value = walletFlow(localTransactions.value.reverse());
    createChart();
  }
});
</script>

<template>
  <div class="flex justify-center w-full bg-blue-100 border border-customGrey-500 rounded p-4 mt-2">
    <canvas class="w-full h-64" ref="chart"></canvas>
  </div>
</template>
