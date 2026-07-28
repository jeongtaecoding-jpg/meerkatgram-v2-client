import { defineStore } from "pinia";
import { ref } from "vue"; 
import myAxios from "../../api/myAxios";

export const usePostStatisticsStore = defineStore('postStatisticsStore', () => {
  // 1. State (상태)
  const postCount = ref(0);

  // 2. Getters (상태를 가공해서 내보내는 함수)

  // 3. Actions (Getters가 아님! 상태를 바꾸거나 API를 쏘는 함수)
  const getUserPostCount = async () => {
    try {
      const url = `/api/posts/statistics/user-post-count`; // 백엔드에 이 주소가 없다면 만들어야 해

      const response = await myAxios.get(url);
      postCount.value = response.data.data.postCount;
    } catch (error) {
      console.error(error);
      postCount.value = '-';
    }
  }

  return { 
    // state 
    postCount,

    // getters

    // Actions
    getUserPostCount
  };

});

