import { defineStore } from "pinia";
import { ref } from "vue"; 
import myAxios from "../../api/myAxios";

export const usePostCreateStore = defineStore('postCreateStore', () => {
  // 1. State

  // 2. Getters

  // 3. Actions
  const store = async (storeData) => {
    try {
      const url = `/api/posts`;
      const result = await myAxios.post(url, storeData);

      return result.data.data;
    } catch (error) {
      throw error;
    }
  }

  return {
    store,
  }
});

