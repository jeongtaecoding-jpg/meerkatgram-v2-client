import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";

export const usePostShowStore = defineStore('postShowStore', () => {
  // 1. State
  const post = ref(null);

  // 2. Getters   

  // 3. Actions
  const getPost = async (id) => {
    try {
      const url = `/api/posts/${id}`;
      const result = await myAxios.get(url);

      post.value = result.data.data;
    } catch (error) {
      throw error;
    }
  }

  const clearPostShow = () => {
    post.value = null;
  }

  const deletePost = async (id) => {
    try {
      const url = `/api/posts/${id}`;

      const result = await myAxios.delete(url);
    } catch (error) {
      throw error;
    }
  }

  return {
    post,
    getPost,
    clearPostShow,
    deletePost
  }
});
