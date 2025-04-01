<script setup>
import { onMounted, ref, watch } from "vue";
import { Chart, registerables } from "chart.js";
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps(['walletId']);

Chart.register(...registerables);

const chart = ref(null);
const chartInstance = ref(null);
const debitPerMonth = ref([]);
const creditPerMonth = ref([]);

onMounted(() => {
    if (props.walletId) {
        updateChart();
    }
});

watch(() => props.walletId, (newVal, oldVal) => {
    if (newVal) {
        updateChart();
    }
});

const updateChart = async () => {
    try {
        const [debitResponse, creditResponse] = await Promise.all([
            store.dispatch('fetchUserDebitMonthly', { id: props.walletId }),
            store.dispatch('fetchUserCreditMonthly', { id: props.walletId })
        ]);

        if (debitResponse?.transactions && creditResponse?.transactions) {
            debitPerMonth.value = debitResponse.transactions;
            creditPerMonth.value = creditResponse.transactions;
            
            if (chartInstance.value) {
                chartInstance.value.destroy();
            }
            createChart();
        }
    } catch (err) {
        console.error('Error fetching transactions per month:', err);
    }
};

const createChart = () => {
    if (debitPerMonth.value && creditPerMonth.value) {
        const ctx = chart.value.getContext('2d');
        chartInstance.value = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Monthly Expenses',
                        data: debitPerMonth.value.map(value => Math.abs(value)),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Monthly Income',
                        data: creditPerMonth.value,
                        backgroundColor: 'rgba(0, 153, 51, 0.2)',
                        borderColor: 'rgba(0, 153, 51, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
};
</script>

<template>
  <div class="flex justify-center w-full bg-blue-100 border border-customGrey-500 rounded p-4 mt-2">
    <canvas class="w-full h-64" ref="chart"></canvas>
  </div>
</template>
