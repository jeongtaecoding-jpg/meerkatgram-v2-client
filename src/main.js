import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/router.js'
import { createPinia } from 'pinia';

createApp(App)
.use(router)
.use(createPinia())
.mount('#app');


// 프론트에서 로그아웃 처리

// 1. `로그아웃` 버튼클릭

// 2. AJAX 로그아웃 API 호출(Actions)
//  2-1. 정상 처리
// 	- AuthStore 초기화(로그아웃)
//  2-2. 실패 시
// 	- AuthStore 초기화(로그아웃)

// 3. 로그아웃 정상처리 후, 메인화면 출력
