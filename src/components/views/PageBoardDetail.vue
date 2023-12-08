<template class="board-detail-box">
  <span class="board-title"> {{ title }} </span>
  <el-page-header @back="goBack" :icon="ArrowLeft">
    <template #content>
      <div class="flex items-center">
        <el-tag>작성자</el-tag>
        <span> {{ author }} | {{ createdAt }}</span>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="primary" class="ml-2" @click="editContent"
          >Edit</el-button
        >
        <el-button type="danger" class="ml-2" @click="deletePost"
          >delete</el-button
        >
      </div>
    </template>
    <div class="board-content" v-if="!editing">
      {{ content }}
    </div>
    <div v-else>
      <el-input
        type="textarea"
        v-model="editableContent"
        rows="4"
        placeholder="Please input your content"
      ></el-input>
      <el-button type="success" @click="patchPost" class="edit-button-board"
        >Save</el-button
      >
    </div>
  </el-page-header>
</template>
    
    
    <script>
import axios from "axios";

export default {
  name: "PageVisitorDeatil",
  data() {
    return {
      title: "",
      content: "",
      author: "",
      createdAt: "",
      editing: false,
      editableContent: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    editContent() {
      this.editableContent = this.content; // 현재 내용을 편집 가능한 내용으로 설정
      this.editing = true;
    },
    // api 요청 : 게시글 수정
    async patchPost() {
      try {
        const postId = this.$route.params.postId;
        await axios.patch(
          `${process.env.VUE_APP_BACKEND_URL}/api/post/${postId}`,
          {
            content: this.editableContent,
          },
          {
            withCredentials: true,
          }
        );
        this.content = this.editableContent;
        this.editing = false;
        alert("게시글 수정 완료.");
      } catch (error) {
        console.error("게시글 수정 서버에러", error);
        alert("게시글 수정 권한이 없습니다.");
      }
      this.content = this.editableContent;
      this.editing = false;
    },
    // api 요청 : 게시글 삭제
    async deletePost() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        try {
          const postId = this.$route.params.postId;
          await axios.delete(
            `${process.env.VUE_APP_BACKEND_URL}/api/post/${postId}`,
            {
              withCredentials: true,
            }
          );
          alert("게시글이 삭제되었습니다.");
          this.$router.go(-1);
        } catch (error) {
          console.error("Error deleting visitor", error);
          alert("게시글 삭제에 실패했습니다.");
        }
      }
    },
  },
  // api 요청 : 게시글 랜더링
  async created() {
    try {
      const postId = this.$route.params.postId;
      const response = await axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/api/post/${postId}`
      );
      this.title = response.data.title;
      this.content = response.data.content;
      const date = new Date(response.data.createdAt);
      this.createdAt = date.toLocaleDateString();
      this.author = response.data.user.name;
    } catch (error) {
      console.error("Error fetching visitor detail", error);
    }
  },
};
</script>
  <style scoped>
.board-title {
  font-weight: bold;
  font-size: 1.5rem;
}
.board-content {
  margin: 30px;
}

.el-page-header {
  margin-top: 20px;
}

.el-tag {
  margin-right: 5px;
}

.board-content {
  margin: 30px;
  white-space: pre-wrap;
}

.edit-button-board {
  margin-top: 7px;
}
</style>