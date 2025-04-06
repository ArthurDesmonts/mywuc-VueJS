import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//API requires
import axios from 'axios'

axios.defaults.baseURL = 'https://mywuc.onrender.com/api';

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
