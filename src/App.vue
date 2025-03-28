<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@/assets/tailwind.css'
import Menu from '@/component/Menu.vue'
import { useStore } from 'vuex';
import Footer from '@/component/Footer.vue'
import { onMounted } from 'vue';

const store = useStore();

onMounted(() => {
  store.dispatch('restoreSession').catch(err => {
    console.error('Failed to restore session:', err);
  });
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-customWhite-100">
    <Menu v-if="store.state.user && store.state.isLoggedIn"></Menu>
    <div class="flex-grow pb-16">
      <RouterView></RouterView>
    </div>
    <Footer></Footer>
  </div>
</template>
