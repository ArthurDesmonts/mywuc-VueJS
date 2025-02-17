<template>
    <div class="w-screen flex justify-center">
        <div class="h-screen w-full flex flex-col items-center justify-center">
            <div class="p-4 rounded bg-gray-300">
                <h1 class="text-4xl font-bold text-center mb-2 font-customTeko">Sign Up</h1>
                <form class="flex flex-col items-center justify-center">
                    <input type="text" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Name">
                    <input type="text" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="First name">
                    <input type="email" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Email">
                    <input type="text" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Phone">
                    <input type="password" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Password">
                    <input type="password" class="p-2 m-2 w-64 border border-gray-400 rounded" placeholder="Confirm Password">
                    <button class="p-2 m-2 w-64 bg-blue-500 text-white rounded font-customPlayfair">Ready to start!</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
</script>
