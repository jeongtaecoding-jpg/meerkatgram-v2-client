<script setup>
import { useRouter } from 'vue-router';   // 화면 이동(라우팅)을 위한 객체
import MyButton from '../../components/buttons/MyButton.vue';
import { usePostCreateStore } from '../../store/post/usePostCreateStore.js';
import { useFileStore } from '../../store/file/useFileStore.js'; //
import { reactive, ref, watch } from 'vue';
import { usePostShowStore } from '../../store/post/usePostShowStore.js';
import MyTextarea from '../../components/input/MyTextarea.vue';
import MyFileInput from '../../components/input/MyFileInput.vue';
import { usePostStatisticsStore } from '../../store/post/usePostStatisticsStore.js';

const router = useRouter();
const fileStore = useFileStore();
const postCreateStore = usePostCreateStore();
const postShowStore = usePostShowStore();
const postStatisticsStore = usePostStatisticsStore();

const preview = ref(null);
const selectedFile = ref(null);

const storeData = reactive({
  content: '',
  image:'',
});

const handleSubmit = async () => {
  try {
    storeData.image = await fileStore.uploadPost(selectedFile.value);
    if(!storeData.image) {
      alert("파일 업로드 실패");
      return;
    }
    const result = await postCreateStore.store(storeData);
    postStatisticsStore.incrementPostCount();
    router.replace(`/posts/${result.id}`);
  } catch (error) {
    alert('게시글 생성 실패');
  }
}

// 파일 변경 감시자
watch(selectedFile, async () => {
  if(selectedFile.value) {
    if(preview.value) {
      // 기존에 생성된 메모리 URL이 있다면 해제 (메모리 누수 방지)
      URL.revokeObjectURL(preview.value);
    }

      // 파일 객체를 브라우저에서 접근 가능한 임시URL로 변환
      preview.value = URL.createObjectURL(selectedFile.value);
    }
  }
);

</script>


<template>
<form @submit.prevent="handleSubmit">
  <MyTextarea
    :placeholder="'내용 작성'"
    :readonly="false"
    :required="true"
    v-model="storeData.content"
  ></MyTextarea>

  <MyFileInput
    :required="true"
    v-model="selectedFile"
  ></MyFileInput>

  <div
    class="preview"
    v-if="preview"
    :style="{backgroundImage: `url(${preview})`}"
  ></div>

  <MyButton
    :btn-type="'submit'"
    :content="'Write'"
    :color="'gray'"
    :size="'middle'"
  ></MyButton>
</form>
</template>


<style scoped>
form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.preview {
  width: 100%;
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
</style>
