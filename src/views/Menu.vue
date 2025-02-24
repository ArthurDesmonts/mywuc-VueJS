<template>
    <div class="w-full flex items-center justify-center bg-red-500">
        <button @click="logout">Logout</button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
  
const store = useStore();
const router = useRouter();

const logout = async () => {
    try {
      await store.dispatch('logout');
      router.push('/');
    } catch (err) {
      error.value = err.response?.data?.error || 'An error occurred';
    }
}
</script>
