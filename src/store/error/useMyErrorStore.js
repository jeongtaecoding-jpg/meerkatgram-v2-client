import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyErrorStore = defineStore('myErrorStore', () => {
  // 1. State (ref 정의)
  const isError = ref(false);
  const errorCode = ref('');
  const errorMsg = ref('');

  // 2. Getters (computed 정의)


  // 3. Actions (function (일반 함수) 정의)

  const setErrorInfo = (error) => {

                                      // respnse 등의 오타 주의!!!!!! 

    const errorData = error.response?.data || {code: 'UNKNOWN_ERROR', message: '예기치 못한 에러가 발생했습니다.'};  
    // response에 데이터(data)가 있는 지 없는지 검사하고, 있으면 data 반환 / 없으면 code, message 반환

    errorCode.value = errorData.code;
    errorMsg.value = errorData.message;
    isError.value = true;
  }

  const clearErrorInfo = () => {
    errorCode.value = '';
    errorMsg.value = '';
    isError.value = false;
  }

  return {
    isError,
    errorCode,
    errorMsg,
    setErrorInfo,
    clearErrorInfo,
  }
});
