<script setup>
import { onMounted, ref, watch } from "vue";
import { Chart, registerables } from "chart.js";
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps(['walletId']);

Chart.register(...registerables);

const chart = ref(null);
const transactionPerMonth = ref([]);

onMounted(() => {
    store.dispatch('fetchUserDebitMonthly', { id: props.walletId })
        .then(response => {
            if (response && Array.isArray(response.transactions)) {
                transactionPerMonth.value = response.transactions;
                createChart();
            } else {
                console.error('Expected an array of transactions but got:', response);
            }
        })
        .catch(err => {
            console.error('Error fetching transactions per month:', err);
        });
});

const createChart = () => {
    if (transactionPerMonth.value) {
        const ctx = chart.value.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Monthly Expenses',
                    data: transactionPerMonth.value.map(value => Math.abs(value)),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        console.error('transactionPerMonth is not an array:', transactionPerMonth.value);
    }
};
</script>

<template>
  <div class="flex justify-center w-full bg-blue-100 border border-customGrey-500 rounded p-4 mt-2">
    <canvas class="w-full h-64" ref="chart"></canvas>
  </div>
</template>
