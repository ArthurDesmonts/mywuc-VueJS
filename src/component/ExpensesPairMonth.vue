<script setup>
import { onMounted, ref, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const chart = ref(null);

/**
 * Create bar chart of expenses every month during the past year
 * Objects : [ 'monthIndex' : 'totalOfExpenses'][12]
 * @param arrayOfTransactions 
 */
const walletFlow = (arrayOfTransactions) => {
};


</script>

<template>
  <div class="flex justify-center w-full bg-blue-100 border border-customGrey-500 rounded p-4 mt-2">
    <canvas class="w-full h-64" ref="chart"></canvas>
  </div>
</template>
