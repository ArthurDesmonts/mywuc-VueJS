<!-- PopupForm.vue -->
<template>
    <div class="popup-form">
        <form @submit.prevent="submitForm">
        <input type="text" v-model="formData.name" placeholder="Nom" />
        <input type="email" v-model="formData.email" placeholder="Email"/>
        <button type="submit">Soumettre</button>
        </form>
    </div>
</template>

<script>
export default {
data() {
    return {
    formData: {
        name: '',
        email: ''
    }
    };
},
methods: {
    submitForm() {
    this.$emit('formSubmitted', this.formData);
    this.formData.name = '';
    this.formData.email = '';
    }
}
};
</script>

<style scoped>

.popup-form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
</style>