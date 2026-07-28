import { defineStore } from "pinia";
import { computed, ref } from "vue";
import myAxios from "../../api/myAxios";
import { useMyErrorStore } from "../error/useMyErrorStore";

export const usePostIndexStore = defineStore('postIndexStore', () => {
    // 1. State (ref)
    const items = ref([]);
    const isLastPage = ref(false);
    const currentPage = ref(0);

    // 2. Getters (computed)  
    const getNextPageNumber = computed(() => currentPage.value + 1);
    

    // 3. Actions (function)
    const clearPostIndex = () => {
      items.value = [];
      isLastPage.value = false;
      currentPage.value = 0;
    }

    const getPostPagination = async (page = 1) => {
      // 마지막 페이지가 아닐 경우만 실행
      if(!isLastPage.value) {
        try {
              //  url 을 칠 때  api / posts(인텔리제이의 PostController.java 에서 나온 것들) 중  하나라도 오타나지 않게 주의!!
          const url = '/api/posts';
          const params = {
            page,
          };

          const res = await myAxios.get(url, { params });
          const data = res.data.data;
          isLastPage.value = data.lastPage;
          items.value.push(...data.posts);

          currentPage.value++;

        } catch(error) {
          console.error(error);
          throw error;
        }
      }
    }

    return {
      // state
      items,
      isLastPage,

      // getters
      getNextPageNumber,

      // actions
      clearPostIndex,
      getPostPagination,
    }
  }
);

