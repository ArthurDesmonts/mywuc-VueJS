<template>
    <div class="flex h-screen flex-col items-center justify-center">
        <div class="flex w-full h-3/4 justify-between px-16 cursor-default">
            <div id="titleFrame" class="w-2/5 flex items-center justify-center animate__fadeIn titleFrame">
                <div>
                    <h1 class="text-customBlack-100 text-center font-customInknut text-6xl leading-tight">
                        Control your wallet with
                    </h1>
                    <h1 class="text-customBlue-100 text-center font-customInknut text-6xl leading-tight">
                        Mywuc
                    </h1>
                </div>
            </div>
            <div class="w-1/2 flex justify-center animate__zoomIn ">
                <img src="/wallet_homepage_picture.png" alt="Wallet" class="w-full max-w-[500px] h-auto object-contain">
            </div>
        </div>
        
        <div class="animate__fadeIn w-screen max-w-4xl mx-16 text-customBlack-200 cursor-default">
            <hr class="border-t-2 border-customBlack-200 mb-2">
            <div id="subTitle" class=" w-full max-w-4xl text-center ">
                <h2 class="font-customInknut text-4xl font-mono font-medium">
                    Mywuc is a simple and intuitive way to manage your wallet
                </h2>
            </div>
            <hr class="border-t-2 border-customBlack-200 mt-2">
        </div>

        <div class="w-full h-1/4 my-6 flex items-center justify-center cursor-default">
            <button class="bg-customBlack-100 text-white px-8 py-2 rounded-md font-customInknut text-xl animate__zoomIn" @click="goToSignIn">
                Get Started
            </button>
        </div>

        
        <div class="w-full h-1/4 flex flex-row items-center justify-center animate__fadeIn cursor-default">
            <hr class="flex-grow border-t-2 border-customBlack-200 mx-16">
            <p class="featureTitle font-customInknut text-6xl mx-6"> Features </p>
            <hr class="flex-grow border-t-2 border-customBlack-200 mx-16">
        </div>

        <div class="flex flex-wrap items-center justify-center my-8 animate__fadeIn">
            <div class="w-full sm:w-1/2 lg:w-1/4 flex flex-col items-center justify-center p-4">
            <h3 class="font-customInknut text-2xl font-mono font-medium">Simple</h3>
            <p class="text-center">A simple and intuitive way to manage your wallet.</p>
            </div>
            <div class="w-full sm:w-1/2 lg:w-1/4 flex flex-col items-center justify-center p-4">
            <h3 class="font-customInknut text-2xl font-mono font-medium">Pleasant</h3>
            <p class="text-center">A pleasant interface to visualize your budget management.</p>
            </div>
            <div class="w-full sm:w-1/2 lg:w-1/4 flex flex-col items-center justify-center p-4">
            <h3 class="font-customInknut text-2xl font-mono font-medium">Easy</h3>
            <p class="text-center">A simple interface that allows you minimal effort to use it.</p>
            </div>
            <div class="w-full sm:w-1/2 lg:w-1/4 flex flex-col items-center justify-center p-4">
            <h3 class="font-customInknut text-2xl font-mono font-medium">Complete</h3>
            <p class="text-center">Essential tools gathered on a single page to stay in control.</p>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .animate__fadeIn {
        animation: fadeIn 2s;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .animate__zoomIn {
        animation: zoomIn 1s;
    }

    @keyframes zoomIn {
        0% {
            transform: scale(0.8);
        }
        100% {
            transform: scale(1);
        }
    }
</style>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToSignIn = () => {
    router.push('/login');
}
</script>