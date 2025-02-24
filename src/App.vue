<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@/assets/tailwind.css'
import Menu from '@/views/Menu.vue'
import { useStore } from 'vuex';

const store = useStore();
</script>

<template>
  <Menu v-if="store.state.token != ''"></Menu>
  <div class="bg-customWhite-100">
    <RouterView></RouterView>
  </div>
</template>
