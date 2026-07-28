<script setup>
import { useRouter } from 'vue-router';   // 화면 이동(라우팅)을 위한 객체
import MyButton from '../../components/buttons/MyButton.vue';
import { usePostCreateStore } from '../../store/post/usePostCreateStore.js';
import { useFileStore } from '../../store/file/useFileStore.js'; //

const router = useRouter();
const poststore = usePostCreateStore();   // 게시글 내용과 최종 제출을 담당하는 스토어
const fileStore = useFileStore();   // 사진 업로드 전용 스토어

// 1. 사용자가 사진을 고르자마자 실행되는 함수 (선착순 업로드)
const onFileChange = async (event) => {
  const file = event.target.files[0];   // 선택한 파일의 실제 데이터를 가져옴
  if (!file) return;

  // 서버에서 받아온 결과물(uploadedUrl)
  // 파일을 백엔드로 던져서 저장된 진짜 URL(String)을 받아옴
  const uploadedUrl = await fileStore.postImage(file);
  
  if (uploadedUrl) {
    // 가장 중요한 부분! 받아온 URL 글자만 postStore의 image 변수에 쏙 넣어둠
    // 만약 uploadedUrl이 객체라면, 여기서 알맹이만 쏙 빼서 저장!
    // (스토어에서 이미 res.data.data.fileUri를 반환했다면 그냥 uploadedUrl만 넣으면 돼)
    poststore.image = typeof uploadedUrl === 'string' ? uploadedUrl : uploadedUrl.data.fileUri;
  }
};

// 2. 'Write' 버튼을 눌렀을 때
const writePost = async () => {
  try {
    // postStore에 담긴 글(content)과 URL(image)을 서버로 날린다.
    const isSuccess = await poststore.createPost(); 

    if (isSuccess) {
      alert('게시글이 성공적으로 작성되었습니다!');
      poststore.content = '';     // 다음 작성을 위해 폼 비우기
      poststore.image = '';
      router.push('/posts');    // 게시판 목록 화면으로 사용자 이동
    }
  } catch (error) {
    alert('작성 실패!'); // (에러 세부 처리는 기존 코드처럼 하면 돼)
  }
};
</script>


<template>
  <form @submit.prevent="writePost">
    <div class="container">
      <textarea v-model="poststore.content" placeholder="내용을 입력하세요"></textarea>

      <input type="file" accept="image/*" @change="onFileChange">
      
      <p v-if="poststore.image" style="color: blue;">이미지가 성공적으로 첨부되었습니다.</p>

    <MyButton
    :btn-type="'submit'"
    :color="'gray'"
    :size="'middle'"
    :content="'Write'"
   ></MyButton>

    </div>
  </form>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

textarea {
  width: 800px;
  height: 500px;
  font-size: 20px;
}
</style>
