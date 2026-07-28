import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";
import MyError from "../pages/errors/myError.vue";
import Login from "../pages/auth/Login.vue";
import { useAuthStore } from "../store/auth/useAuthStore.js";
import PostShow from "../pages/posts/PostShow.vue";
import Registration from "../pages/auth/Registration.vue";
import PostCreate from "../pages/posts/PostCreate.vue";

const setMeta = (isAuthenticated, isGuestOnly) => {
  return {
    isAuthenticated,
    isGuestOnly,
  }
}

const routes = [
  {
    path: '/',
    redirect: '/posts',
    meta: setMeta(false, false),
  },
  // 인증 관련
  {
    path: '/login',
    component: Login,
    meta: setMeta(false, true),
  },
  {
    path: '/registration',
    component: Registration,
    meta: setMeta(false, true),
  },
  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex,
    meta: setMeta(false, false),
  },
  {
    path: '/posts/:id',
    component: PostShow,
    meta: setMeta(true, false),
  },
  {
    path: '/posts/create',
    component: PostCreate,
    meta: setMeta(true, false),
  },
  // 에러 관련
  {
    path: '/error',
    component: MyError,
    meta: setMeta(false, false),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이션 가드
router.beforeEach(async (to, from, next) => {   // to : 내가 이동할 라우트 정보  , from : 내가 이동하기 전 라우트 정보, next : 다음 라우터로 이동하게 해주는 함수
  // authStore
  const authStore = useAuthStore();

  // accessToken(인증)이 없을 때, 토큰 재발급 시도해주는 처리기
  if(!authStore.isLoggedIn && !authStore.isReissued) {   // 로그인 상태가 아니고, 토큰 재발급이 안된 상태라면
    try {
      await authStore.reissue();
    } catch(error) {  
      // alert('로그인 기간이 만료되었습니다. \n다시 로그인 해 주십시오.');
      // return next('/login');   // 위쪽의 async 절의 next
    }
  } 

  // 인증이 필요한 페이지인데, 로그인이 안된 경우 로그인페이지로 이동
  if(to.meta.isAuthenticated && !authStore.isLoggedIn) {
    return next('/login');
  }

  // 게스트만 접근 가능한 페이지인데, 로그인 중인 경우 메인페이지로 이동
  if(to.meta.isGuestOnly && authStore.isLoggedIn) {
    return next('/');
  }

  // 나머지는 통과
  next();

});

export default router;
