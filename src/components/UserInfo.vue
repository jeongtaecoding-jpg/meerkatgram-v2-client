<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth/useAuthStore';

const authStore = useAuthStore();
const router = useRouter();
const postStatisticsStore = usePostStatisticsStore();

const redirectPostcreate = () => {
  router.push(`/posts/create`);
}
</script>


<template>
<div>
<!-- 로그인 했을 때 프로필의 이미지가 표시되려면 백엔드(인텔리제이)의 storage => profiles 안의 이미지를 참조해야 한다. -->
 <!-- 참고로 회원가입을 하면 자동으로 백엔드에 들어와짐(file이라 적힌 클래스, 인터페이스 등 참조) -->
 <div
 class="container"
 v-if="authStore.isLoggedIn && authStore.userInfo"
 >
  <div class="profile-box">
    <div
     class="bg-image-circle profile"
     :style="{backgroundImage: `url(${authStore.userInfo.profile})`}"
    ></div>
  </div>

  <div class="info-box">
    <div class="nick">{{ authStore.userInfo.nick }}</div>
    <div class="write-count">posts : {{ postStatisticsStore.postCount }}</div>
    <div class="redirect-box">
      <div 
        class="bg-image-square redirect-icon-posts-index"
        style="background-image: url('./icons/free-icon-gallery-833281.png');"
      ></div>
      <div 
          class="bg-image-square redirect-icon-posts-create"
          @click="redirectPostcreate()"
          style="background-image: url('./icons/free-icon-plus-sign-3114793.png');"
      ></div>
      <div class="bg-image-square redirect-icon-posts-info"
          style="background-image: url('./icons/free-icon-person-2815428tt.png');"
      ></div>
    </div>
  </div>
 </div>
 <hr>
</div>

</template>


<style scoped>

.container {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5px;
}

.info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.redirect-icon-posts-create {
  cursor: pointer;
}

.redirect-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

</style>
