<template>
    <div class="w-screen flex justify-center">
        <div class="h-screen w-full flex flex-col items-center justify-center">
            <div class="p-4 rounded bg-gray-300">
                <h1 class="text-4xl font-bold text-center mb-2 font-customTeko">Sign Up</h1>
                <form class="flex flex-col items-center justify-center">
                    <input ref="name" type="text" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Name">
                    <input ref="firstName" type="text" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="First name">
                    <input ref="mail" type="email" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Email">
                    <input ref="phone" type="text" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Phone">
                    <input ref="pass" type="password" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Password">
                    <input ref="passConf" type="password" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Confirm Password">
                    <button class="p-2 m-2 w-64 bg-black font-white text-white rounded font-customPlayfair">Ready to start!</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


const name = ref(null);
const firstName = ref(null);
const mail = ref(null);
const phone = ref(null);
const pass = ref(null);
const passConf = ref(null);

//TODO : Implement the sign up logic


</script>
