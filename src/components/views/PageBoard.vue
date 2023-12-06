<template>
  <div class="boardTitle">
    <h2>게시판</h2>
    <el-button type="primary" @click="goToWritePage">글쓰기</el-button>
  </div>
  <el-table :data="posts" class="table-responsive" style="width: 100%">
    <el-table-column prop="index" label="번호" width="80">
      <template #default="{ $index }">
        {{ posts.length - $index }}
      </template>
    </el-table-column>
    <el-table-column label="제목">
      <template #default="{ row }">
        <router-link :to="`/post/${row.id}`">{{ row.title }}</router-link>
      </template>
    </el-table-column>
    <el-table-column prop="user.name" label="작성자" width="100" />
    <el-table-column
      prop="createdAt"
      label="작성일"
      width="150"
      :formatter="formatDate"
    />
    <el-table-column prop="views" label="조회수" width="80" />
  </el-table>
  <el-pagination
    small
    layout="prev, pager, next"
    :total="meta.totalPages"
    class="pagination"
  />
</template>

<script>
import axios from "axios";

export default {
  name: "pageBoard",
  data() {
    return {
      posts: [],
      meta: {},
    };
  },
  created() {
    this.fetchPosts(this.$route.params.subCategoryId);
  },
  watch: {
    // 라우트 파라미터 변경 감지
    "$route.params.subCategoryId": {
      immediate: true,
      handler(newVal) {
        this.fetchPosts(newVal);
      },
    },
  },
  methods: {
    async fetchPosts(subCategoryId) {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/api/post?page=1&subCategoryId=${subCategoryId}`
        );
        this.posts = response.data.posts;
        this.meta = response.data.meta;
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    },
    formatDate(row, column) {
      const date = new Date(row[column.property]);
      return date.toLocaleDateString();
    },
    goToWritePage() {
      this.$router.push("/visitor/write"); // 글쓰기 페이지로 이동
    },
  },
};
</script>

<style scoped>
.boardTitle {
  display: flex;
  justify-content: space-between;
}

h2 {
  margin-bottom: 30px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>