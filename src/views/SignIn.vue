<template>
    <div class="sign-in">
      <h2>Sign In</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const error = ref('');
  const store = useStore();
  const router = useRouter();

export default {
    setup() {
        const handleSubmit = async () => {
            try {
                await store.dispatch('auth/signIn', { email: email.value, password: password.value });
                router.push('/profile');
            } catch (err) {
                error.value = 'Failed to sign in. Please check your credentials.';
            }
        };

        return {
            email,
            password,
            error,
            handleSubmit
        };
    }
};
  </script>
  