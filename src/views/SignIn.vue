<template>
    <div class="sign-in">
      <h2>Sign In</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="mail" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

const mail = ref("");
const password = ref("");

const store = useStore();
const router = useRouter();

async function handleSubmit(){
    try {
        const response = await axios.post('/user/login', {
            mail: mail.value,
            password: password.value
        });
        //console.log(response.data); //token
        await store.dispatch('login', { mail: mail.value, password: password.value });
        router.push('/');
    } catch (error) {
        console.error(error);
    }
}
</script>
  