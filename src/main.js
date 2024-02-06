import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import '@/assets/css/bootstrap.min.css'

//index.html의 id인 app에 마운트가 되도록 하는 코드
// createApp(App).mount('#app')

const app = createApp(App);

//vue application에서 전역적으로 기능을 사용할 경우, 아래와 같이 use문법을 사용한다.
app.use(router);
app.mount('#app');