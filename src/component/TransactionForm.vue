<!-- PopupForm.vue -->
<template>
    <div class="popup-form">
        <form @submit.prevent="submitForm">
        <input type="text" v-model="formData.amount" placeholder="Amount" />
        <DatePicker v-model="formData.selectedDate" :min-date="minDate" :max-date="maxDate" :format="format"/>
        <button type="submit">Soumettre</button>
        </form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
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

<style scoped>

.popup-form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
</style>