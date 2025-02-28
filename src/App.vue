<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@/assets/tailwind.css'
import Menu from '@/component/Menu.vue'
import { useStore } from 'vuex';
import Footer from '@/component/Footer.vue'

const store = useStore();
</script>

<template>
  <Menu v-if="store.state.status == 'success' || store.state.token !=''"></Menu>
  <div class="bg-customWhite-100">
    <RouterView></RouterView>
  </div>
  <Footer></Footer>
</template>
