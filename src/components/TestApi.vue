<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const message = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('/test'); // Symfony doit avoir une route "/api/test"
    message.value = response.data.message;
  } catch (error) {
    console.error("Erreur API :", error);
  }
});
</script>

<template>
  <div>
    <h1>Test API Symfony</h1>
    <p>{{ message }}</p>
  </div>
</template>
