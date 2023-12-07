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
        <el-button type="primary" class="ml-2">Edit</el-button>
      </div>
    </template>
    <div class="board-content">
      {{ content }}
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
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
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
</style>