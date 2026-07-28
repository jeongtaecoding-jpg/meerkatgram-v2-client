<script setup>
import { reactive, ref } from 'vue';
import MyButton from '../../components/buttons/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';
import { useFileStore } from '../../store/file/useFileStore.js';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import { useRouter } from 'vue-router';
import registrationValidator from '../../util/validator/domain/auth/registrationValidator.js';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';

const router = useRouter();
const fileStore = useFileStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();

const preview = ref(null);
const selectedFile = ref(null);
const registrationData = reactive({
  email: '',
  password: '',
  passwordChk: '',
  nick: '',
  profile: '',
});

const handleSubmit = async () => {
  // 유효성 검사(양식이 틀리면 아래 try문에 못가게 되고 프론트엔드 선에서 걸리기 때문에 devtool network에도 나오는 게 없음)
  const validationList = [
    registrationValidator.email(registrationData.email),
    registrationValidator.password(registrationData.password),
    registrationValidator.passwordChk(registrationData.password, registrationData.passwordChk),
    registrationValidator.nick(registrationData.nick),
    registrationValidator.profile(registrationData.profile),
  ];

  const errorList = validationList.filter(val => val);

  if(errorList.length > 0) {
    alert(errorList.join('\n'));  // join : 여러 문자열을 하나로 합치는 것
    return;
  }

  try {
    await authStore.registration(registrationData);
    alert("회원가입에 성공했습니다.");
    router.replace('/login');
  } catch(error) {
    const data = error.response.data;
    if(data.code === 'E11') {
      alert(data.data);
    } else if(data.code === 'E21') {
      alert('잘못된 양식입니다.');
    } else {
      myErrorStore.setErrorInfo(error);
      router.replace('/error');
    }
  }
}

const handleChangeProfile = async (e) => {
  const file = e.target.files[0];  // 한 개가 아닌 여러 개가 배열의 형태

  if(file) {
    if(preview.value) {
      // 기존에 생성된 메모리 URL이 있다면 해제 (메모리 누수 방지)
      URL.revokeObjectURL(preview.value);  
    }

    // API 서버에 파일 저장 요청
    const fileUri = await fileStore.uploadProfile(file);

    if(fileUri) {
      registrationData.profile = fileUri;  //회원가입할 때 보낼 데이터

      selectedFile.value = file;
  
      // 파일 객체를 브라우저에서 접근 가능한 임시 URL로 변환
      preview.value = URL.createObjectURL(file);    
    }

  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <MyInput
      :type="'email'"
      :placeholder="'Email'"
      :readonly="false"
      :required="true"
      v-model="registrationData.email"
    ></MyInput>

    <MyInput
      :type="'password'"
      :placeholder="'Password'"
      :readonly="false"
      :required="true"
      v-model="registrationData.password"
    ></MyInput>

    <MyInput
      :type="'password'"
      :placeholder="'PasswordChk'"
      :readonly="false"
      :required="true"
      v-model="registrationData.passwordChk"
    ></MyInput>

    <MyInput
      :btnType="'text'"
      :placeholder="'Nick'"
      :readonly="false"
      :required="true"
      v-model="registrationData.nick"
    ></MyInput>

    <div 
      class="preview"
      v-if="preview"   
      :style="{backgroundImage: `url(${preview})`}"
      ></div> 
<!-- 데이터 바인딩 : HTML 요소와 Vue 인스턴스의 데이터를 동적으로 연결(Data Binding)하는 기능 -->

    <input
      type="file" 
      accept="image/*"
      @change="handleChangeProfile"
      >

    <MyButton
      :btnType="'submit'"
      :color="'black'"
      :size="'middle'"
      :content="'Sign Up'"
    ></MyButton>

  </form>
</template>

<style scoped>
form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.preview {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
</style>
