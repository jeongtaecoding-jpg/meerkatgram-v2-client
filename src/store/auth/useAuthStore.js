import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";
import { useMyErrorStore } from "../error/useMyErrorStore";

export const useAuthStore = defineStore('authStore', () => {
  // 1. State
  const isLoggedIn = ref(false);
  const accessToken = ref('');
  const userInfo = ref(null);
  const isReissued = ref(false);

  // 2. Getter  
  
  
  // 3. Actions
  const clearAuthStore = () => {
    isLoggedIn.value = false;
    accessToken.value = '';
    userInfo.value = null;
    isReissued.value = false;
  }

  const login = async (loginForm) => {
    try {
      const url = '/api/auth/login';

      const res = await myAxios.post(url, loginForm);
      const data = res.data.data;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;
      isReissued.value = false;
    } catch(error) {
      console.error(error);

      throw error;
    }
  }

  const reissue = async () => {   // async와 await는 한 몸이니 무조건 깜빡하지 말기!
    try {
      const url = '/api/auth/reissue-token';
      const res = await myAxios.post(url);
      const data = res.data.data;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;
      isReissued.value = false;
    } catch(error) {
      console.error(error.response);   // 토큰에 이상이 생겼을 때 테스트하기위한 콘솔에러(로그인 다시 하면 해결됨!)
      clearAuthStore();
    } finally {
      isReissued.value = true;
    }
  }

  const logout = async () => {
    try {
      const url = '/api/auth/logout';

      await myAxios.post(url);
    } catch(error) {
      console.error(error);
    } finally {
      clearAuthStore();
    }
  }

  const registration = async (data) => {
    try {
      const url = '/api/auth/registration';

      await myAxios.post(url, data);
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    // State
    isLoggedIn,
    accessToken,
    userInfo,
    isReissued,

    // Getters

    // Actions
    login,
    reissue,
    logout,
    registration,
  }
});
