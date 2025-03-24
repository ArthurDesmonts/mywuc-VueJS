<!-- PopupForm.vue -->
<template>
    <div class="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <form @submit.prevent="submitForm" class="flex flex-col gap-4 items-center bg-customWhite-100 p-4 rounded-lg">
        <input type="float" v-model="formData.amount" placeholder="Amount" class="text-center rounded"/>
        <DatePicker v-model="formData.selectedDate" :min-date="minDate" :max-date="maxDate" :format="format" placeholder="day/month/year"/>
        <button type="submit" class="bg-customBlue-200 p-1 w-full rounded text-customWhite-100">Send</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const currentDate = ref(new Date());
const minDate = ref(new Date(currentDate.value.getFullYear() - 100, currentDate.value.getMonth(), currentDate.value.getDate()));
const maxDate = ref(currentDate.value);

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


const formData = ref({
    amount: '',
    selectedDate: '',
});

const emit = defineEmits(['formSubmitted']);

const submitForm = () => {
    emit('formSubmitted', formData.value);
}

</script>