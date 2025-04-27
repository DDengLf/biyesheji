import './assets/main.css'

import { createApp } from 'vue'
import 'vant/lib/index.css';
import App from './App.vue'
import router from './router'
import TlbsMap from 'tlbs-map-vue';
import Vant from 'vant';
const app = createApp(App)

app.use(router)
app.use(TlbsMap)
app.use(Vant)
app.mount('#app')
