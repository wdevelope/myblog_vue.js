<template class="visitor-detail-box">
  <span class="visitor-title"> {{ title }} </span>
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
        <el-button type="danger" class="ml-2" @click="deleteVisitor"
          >delete</el-button
        >
      </div>
    </template>
    <div class="visitor-content" v-if="!editing">
      {{ content }}
    </div>
    <div v-else>
      <el-input
        type="textarea"
        v-model="editableContent"
        rows="4"
        placeholder="Please input your content"
      ></el-input>
      <el-button type="success" class="edit-button" @click="patchVisitor"
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
    // api 요청 : 방명록 수정
    async patchVisitor() {
      try {
        const visitorId = this.$route.params.visitorId;
        await axios.patch(
          `${process.env.VUE_APP_BACKEND_URL}/api/visitor/${visitorId}`,
          {
            content: this.editableContent,
          },
          {
            withCredentials: true,
          }
        );
        this.content = this.editableContent;
        this.editing = false;
        alert("방명록 수정 완료.");
      } catch (error) {
        console.error("방명록 수정 서버에러", error);
        alert("방명록 수정 권한이 없습니다.");
      }
      this.content = this.editableContent;
      this.editing = false;
    },
    // api 요청 : 게시글 삭제
    async deleteVisitor() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        try {
          const visitorId = this.$route.params.visitorId;
          await axios.delete(
            `${process.env.VUE_APP_BACKEND_URL}/api/visitor/${visitorId}`,
            {
              withCredentials: true,
            }
          );
          alert("방명록이 삭제되었습니다.");
          this.$router.go(-1);
        } catch (error) {
          console.error("방명록 삭제 서버에러", error);
          alert("방명록 삭제에 실패했습니다.");
        }
      }
    },
  },
  async created() {
    try {
      const visitorId = this.$route.params.visitorId;
      const response = await axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/api/visitor/${visitorId}`
      );
      this.title = response.data.title;
      this.content = response.data.content;
      this.author = response.data.user.name;
      const date = new Date(response.data.createdAt);
      this.createdAt = date.toLocaleDateString();
    } catch (error) {
      console.error("Error fetching visitor detail", error);
    }
  },
};
</script>
<style scoped>
.visitor-title {
  font-weight: bold;
  font-size: 1.5rem;
}
.visitor-content {
  margin: 30px;
  white-space: pre-wrap;
}

.el-page-header {
  margin-top: 20px;
}

.el-tag {
  margin-right: 5px;
}

.edit-button {
  margin-top: 7px;
}
</style>