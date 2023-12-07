<template>
  <h2>글쓰기</h2>

  <form @submit.prevent="writeBoard">
    <label for="">제목</label>
    <el-input
      v-model="boards.title"
      maxlength="20"
      placeholder="제목을 입력해주세요"
      show-word-limit
      type="text"
    />

    <label for="">내용</label>
    <el-input
      v-model="boards.content"
      maxlength="1000"
      placeholder="내용을 입력해주세요"
      show-word-limit
      type="textarea"
      :rows="10"
      :autosize="{ minRows: 20, maxRows: 200 }"
    />

    <button type="submit" class="submit-button">작성</button>
  </form>
</template>
    
    <script>
import axios from "axios";

export default {
  name: "PageVisitorWrite",
  data() {
    return {
      boards: {
        title: "",
        content: "",
        subCategoryId: "",
      },
    };
  },
  created() {
    this.boards.subCategoryId = this.$route.query.subCategoryId;
  },
  methods: {
    async writeBoard() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/api/post`,
          this.boards,
          {
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          alert("게시글 작성에 성공했습니다.");
          this.$router.push("/home");
        }
      } catch (error) {
        let errorMessage = "게시글 작성에 실패했습니다.";

        if (error.response && error.response.data) {
          errorMessage = Array.isArray(error.response.data.errorMessage)
            ? error.response.data.errorMessage.join("\n")
            : error.response.data.errorMessage || errorMessage;
        }

        alert(errorMessage);
        console.error(error, "알 수 없는 에러 발생");
      }
    },
  },
};
</script>
<style scoped>
h2 {
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

form * {
  margin-bottom: 10px;
}

form > div > label {
  font-weight: bold;
  margin-bottom: 20px;
}

.submit-button {
  background-color: #459efe;
  border-radius: 5px;
  padding: 10px;
  border: none;
  font-size: 1.2rem;
}
</style>
    