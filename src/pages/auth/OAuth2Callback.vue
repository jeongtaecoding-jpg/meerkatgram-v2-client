<script setup>
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { usePostStatisticsStore } from '../../store/post/usePostStatisticsStore';
import { useMyErrorStore } from '../../store/error/useMyErrorStore';

const authStore = useAuthStore();
const postStatisticsStore = usePostStatisticsStore();
const myErrorStore = useMyErrorStore();
const route = useRoute();
const router = useRouter();

onBeforeMount(async () => {
  try {
    const {code, message} = route.query;
    
    if(!code) {
      await authStore.reissue();
      postStatisticsStore.getUserPostCount();
      return router.replace('/');
    } else if(code == 'E32') {
      alert('다른 방식으로 이미 가입된 회원입니다.')
      return router.replace('/login');
    } else {
      throw myErrorStore.createErrorRedirection(code, message);
    }

  } catch (error) {
    myErrorStore.setErrorInfo(error);
    return router.replace('/error');
  }
});
</script>


<template>

</template>


<style>

</style>
