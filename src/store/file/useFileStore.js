import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

export const useFileStore = defineStore('fileStore', () => {
  // State 

  // Getters

  // Actions

  
  // 이미지 파일을 서버에 올리고 URL을 받아오는 함수
  const uploadProfile = async (file) => {
    try {
      const url = '/api/auth/files/profiles';


      // Form Data 생성
      const data = new FormData();
      data.append('file', file);

      // Content-type 변경
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const res = await myAxios.post(url, data, config);
      return res.data.data.fileUri;

    } catch (error) {
      console.error(error);
      return null;
    }
  }

    // 1. 게시글 이미지 업로드 함수
  const uploadPost = async (file) => {
    try {
      //  최종 제출 주소와 겹치면 안 됨! 파일 업로드 전용 주소로 변경!
      const url = '/api/posts/files/images'; // (백엔드에 이 주소가 없다면 만들어야 해)

      const data = new FormData();
      data.append('file', file); // 백엔드가 받는 파라미터명과 맞춰야 함 (보통 file로 많이 씀)
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const res = await myAxios.post(url, data, config);
      
      // 백엔드가 돌려준 이미지 URL 문자열 반환
      return res.data.data.fileUri;

    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      return null;
    }
  }

  // 만든 함수는 반드시 return 해줄 것!
  return {
    uploadProfile,
    uploadPost, // 드디어 밖으로 나갈 수 있게 됨!
  }
});
