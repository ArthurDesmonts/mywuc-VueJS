<template>
    <div class="w-screen flex justify-center">
        <div class="h-screen w-full flex flex-col items-center justify-center">
            <div class="p-4 rounded bg-gray-300">
                <div class="grid grid-cols-3">
                    <router-link to="/" class="text-2xl font-bold text-center font-customTeko grid-1 text-center font-bold">&#8592;</router-link>
                    <h1 class="text-4xl font-bold text-center mb-2 font-customTeko grid-2">Sign In</h1>
                </div>
                <form class="flex flex-col items-center justify-center" @submit.prevent="handleSubmit">
                    <input v-model="mail" required type="email" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Email" autocomplete="email">
                    <input v-model="password" required type="password" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Password" autocomplete="current-password">
                    <div class="flex items-center justify-center gap-2">
                        <p>No account yet ? : </p>
                        <router-link to="/signup" class="text-blue-500">Sign Up</router-link>
                    </div>
                    <button :disabled="!mail || !password" type="submit" class="p-2 m-2 w-64 bg-black text-white rounded font-customPlayfair" :class="{'opacity-50 cursor-not-allowed': !mail || !password}">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const mail = ref('');
const password = ref('');

const store = useStore();
const router = useRouter();

async function handleSubmit() {
  try {
    await store.dispatch('login', { mail: mail.value, password: password.value });
    router.push('/');
  } catch (err) {
    console.error(err);
  }
}
</script>
