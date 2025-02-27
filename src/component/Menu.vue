<template>
    <div class="w-full grid grid-cols-6 gap-4 bg-customWhite-100 p-4">
        <div class="col-1 flex justify-start items-center">
            <h1 v-if="router.currentRoute.value.path != '/'" class="text-2xl font-bold cursor-pointer" @click="router.push('/')">
              <img src="/home-svgrepo-com.svg" class="w-6 h-6 text-black" alt="home" />
            </h1>
        </div>
        <div class="col-start-3 col-end-5 flex justify-center items-center">
            <h1 class="text-customBlue-100 text-center font-customTeko text-3xl leading-tight cursor-default">MyWuc</h1>
        </div>
        <div class="col-start-5 col-end-7 flex justify-end items-center space-x-10">
            <button class="bg-customGrey-200 rounded rounded-full p-2 flex items-center justify-centerp-1" @click="router.push('/dashboard')">
              <img src="/graph-up-svgrepo-com.svg" class="w-6 h-6 text-black" alt="dashboard" />
            </button>
            <button class="bg-customGrey-200 rounded rounded-full p-2 flex items-center justify-centerp-1" @click="router.push('/profile')">
              <img src="/profile-round-1342-svgrepo-com.svg" class="w-6 h-6 text-black" alt="profile"/>
            </button>
            <button class="bg-red-500 rounded rounded-full p-2 flex items-center justify-centerp-1" @click="logout">
              <img src="/session-leave-svgrepo-com.svg" class="w-6 h-6 text-white" alt="logout" />
            </button>
        </div>
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
