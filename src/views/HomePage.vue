<template>
    <div class="flex h-screen flex-col items-center justify-center">
        <div class="flex w-full h-3/4 justify-between px-16">
            <div id="titleFrame" class="w-2/5 flex items-center justify-center animate__fadeIn titleFrame">
                <h1 class="text-customBlack-100 text-center font-customInknut text-6xl leading-tight">
                    Control your wallet with Mywuc
                </h1>
            </div>
            <div class="w-1/2 flex justify-center animate__zoomIn ">
                <img src="/wallet_homepage_picture.png" alt="Wallet" class="w-full max-w-[500px] h-auto object-contain">
            </div>
        </div>
        
        <div class="animate__fadeIn">
            <hr class="w-full max-w-4xl border-t-2 border-customBlack-100 mb-2">

            <div id="subTitle" class=" w-full max-w-4xl text-center ">
                <h2 class="text-customBlack-100 font-customInknut text-4xl font-mono font-medium">
                    Mywuc is a simple and intuitive way to manage your wallet
                </h2>
            </div>

            <hr class="w-full max-w-4xl border-t-2 border-customBlack-100 mt-2">
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
