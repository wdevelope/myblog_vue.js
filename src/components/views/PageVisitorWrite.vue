<template>
  <form @submit.prevent="writeVisitor">
    <h2>글쓰기</h2>

    <label for="">제목</label>
    <el-input
      v-model="visitors.title"
      maxlength="10"
      placeholder="제목을 입력해주세요"
      show-word-limit
      type="text"
    />

    <label for="">방명록</label>
    <el-input
      v-model="visitors.content"
      maxlength="30"
      placeholder="방명록을 입력해주세요"
      show-word-limit
      type="textarea"
    />

    <label for="text">비밀번호</label>
    <el-input
      v-model="visitors.password"
      type="text"
      placeholder="비밀번호를 입력해주세요"
    />

    <div>
      <el-checkbox v-model="visitors.isPrivate">비밀글</el-checkbox>
    </div>
    <button type="submit" class="submit-button">작성</button>
  </form>
</template>
  
  <script>
import axios from "axios";

export default {
  name: "PageVisitorWrite",
  data() {
    return {
      visitors: {
        title: "",
        content: "",
        password: "",
        isPrivate: "",
      },
    };
  },
  methods: {
    async writeVisitor() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/api/visitor`,
          this.visitors,
          {
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          alert("방명록 작성에 성공했습니다.");
          this.$router.push("/visitor");
        }
      } catch (error) {
        let errorMessage = "방명록 작성에 실패했습니다.";

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
<style></style>
  