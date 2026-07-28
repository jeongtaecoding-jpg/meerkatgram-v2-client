<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import MyButton from '../../components/buttons/MyButton.vue';
import { usePostIndexStore } from '../../store/post/usePostIndexStore.js';
import { useRouter } from 'vue-router';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';

// ----------------스토어(usePostIndexStore)로 이관 start-----------------------

// const posts = ref([]);
// const isLastPage = ref(false);
// let currentPage = 0;

// 함수
// const getPostPagination = async (page = 1) => {
//  // 마지막 페이지가 아닐 경우만 실행
//   if(!isLastPage.value) {
//     try {
//     const url = '/api/posts';
//     const params = {
//       page,
//     };

//     const res = await myAxios.get(url, { params });
//     const data = res.data.data;
//     isLastPage.value = data.lastPage;
//     posts.value.push(...data.posts);

//     currentPage++;

//     console.log(posts.value);

//     } catch(error) {
//       console.error(error);
//     }
//   }
// }

// ----------------스토어(usePostIndexStore)로 이관 end-----------------------
const router = useRouter();
const postIndexStore = usePostIndexStore();
const myErrorStore = useMyErrorStore();

const getPagination = async (page = 1) => {
  try {
    await postIndexStore.getPostPagination(page);
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
}

const getNextPage = async () => {
  await getPagination(postIndexStore.getNextPageNumber);
}

const redirectShow = (id) => {
  router.push(`/posts/${id}`);
}

// 라이프 사이클
onBeforeMount(getPagination);
onBeforeUnmount(postIndexStore.clearPostIndex);        // 로그인 등 다른 화면으로 넘어가면 기존의 데이터를 초기화한다.
</script>


<template>
  <div class="card-container">
    <div
    v-for="item in postIndexStore.items" 
    :key="item.id"
    class="card"
    :style="{backgroundImage: `url(${item.image})`}"
    @click="redirectShow(item.id)"
    ></div>
  </div>
  <MyButton
    v-if="!postIndexStore.isLastPage"
    :color="'gray'"
    :size="'big'"
    :content="'Show more posts from jeongtae'"
    @click="getNextPage()"
  />
</template>


<style scoped>
.card-container {
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

}
.card {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
</style>
