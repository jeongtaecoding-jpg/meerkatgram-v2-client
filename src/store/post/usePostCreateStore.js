import { defineStore } from "pinia";
import { ref } from "vue"; 
import myAxios from "../../api/myAxios";

export const usePostCreateStore = defineStore('postCreateStore', () => {
  // 1. State (상태)
  // 컴포넌트와 양방향으로 묶인(v-model) 상태값
  const content = ref('');
  const image = ref('');

  // 2. Actions (Getters가 아님! 상태를 바꾸거나 API를 쏘는 함수)


  // 글과 URL을 묶어서 최종 생성하는 함수
  const createPost = async () => {
    try {
      // 로컬 스토리지에 숨겨둔 내 여권(JWT 토큰)을 꺼내옴
      const token = localStorage.getItem('accessToken'); 

      // 최종 목적지 API로 데이터 쏘기
      const response = await myAxios.post('/api/posts/create', {
        content: content.value,
        image: image.value
      }, {
        headers: {
          // 문지기(Filter) 통과를 위해 헤더에 여권 제시
          Authorization: `Bearer ${token}` 
        }
      });

      // 백엔드에서 정상 처리(code: "00")가 오면 true를 반환
      if (response.data.code === '00') {
        return true; 
      }
      return false;

    } catch (error) {
      // Pinia에서 직접 alert를 띄우지 않고, 에러를 UI 컴포넌트로 던져버림 (중요!)
      throw error; 
    }
  };

  // 3. 컴포넌트에서 쓸 수 있도록 반드시 return!
  return { 
    content, 
    image, 
    createPost 
  };
});
