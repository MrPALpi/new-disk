import './index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './providers/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

export { app }
