<template>
    <div class="w-screen flex justify-center">
      <div class="h-screen w-full flex flex-col items-center justify-center">
        <div class="p-4 rounded bg-gray-300">
          <div class="grid grid-cols-3">
              <router-link to="/" class="text-2xl font-bold text-center font-customTeko grid-1 text-center font-bold">&#8592;</router-link>
              <h1 class="text-4xl font-bold text-center mb-2 font-customTeko grid-2">Sign In</h1>
          </div>
          <form class="flex flex-col items-center justify-center" @submit.prevent="handleSubmit">
            <div>
                <p v-if="errorDetected" class="px-4 mx-2 w-64 rounded bg-red-500 radius-2 text-center">{{ error }}</p>
            </div>
            <input v-model="name" type="text" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Name*">
            <input v-model="firstName" type="text" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="First name">
            <input v-model="mail" type="email" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Email*">
            <input v-model="phone" type="text" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Phone*">
            <input v-model="password" type="password" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Password*">
            <input v-model="passConf" type="password" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Confirm Password*">
            <button :disabled="!mail || !password || !name || !phone || !passConf" type="submit" class="p-2 m-2 w-64 bg-black font-white text-white rounded font-customPlayfair" :class="{'opacity-50 cursor-not-allowed': !mail || !password || !name || !phone || !passConf}">Ready to start!</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import axios from 'axios';
  
  const name = ref('');
  const firstName = ref('');
  const mail = ref('');
  const phone = ref('');
  const password = ref('');
  const passConf = ref('');
  const error = ref("");
  const errorDetected = ref(false);
  
  const store = useStore();
  const router = useRouter();
  
  async function handleSubmit() {
    try {
      if (password.value !== passConf.value) {
        return;
      }
      const response = await axios.post("http://127.0.0.1:8000/api/user/create", {
        name: name.value,
        firstName: firstName.value,
        mail: mail.value,
        phone: phone.value,
        password: password.value,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await store.dispatch('login', { mail: mail.value, password: password.value });
      router.push('/');
    } catch (err) {
      console.error(err);
      error.value = "An error occurred / user already exists";
      errorDetected.value = true;
    }
  }
  </script>
  