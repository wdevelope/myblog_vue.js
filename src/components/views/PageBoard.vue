<template>
  <div class="boardTitle">
    <h2>게시판</h2>
    <el-button type="primary" @click="goToWritePage">글쓰기</el-button>
  </div>

  <el-table :data="posts" class="table-responsive" style="width: 100%">
    <el-table-column prop="index" label="번호" width="80">
      <template #default="{ $index }">
        {{ calculateIndex($index) }}
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

  <Pagination
    :total-pages="meta.totalPages"
    :current-page="currentPage"
    @page-changed="changePage"
  />
</template>

<script>
import axios from "axios";
import Pagination from "../common/PaginationButton.vue";

export default {
  name: "pageBoard",
  components: {
    Pagination,
  },
  data() {
    return {
      posts: [],
      meta: {
        totalPages: 0,
        currentPage: 1,
        totalCount: 0,
        pageSize: 15,
      },
    };
  },
  created() {
    const pageFromUrl = this.$route.query.page || 1;
    this.currentPage = Number(pageFromUrl);
    this.fetchPosts(this.$route.params.subCategoryId);
  },
  // 페이지 변경 감시
  watch: {
    "$route.params.subCategoryId": {
      immediate: true,
      handler(newVal) {
        this.fetchPosts(newVal);
      },
    },
    "$route.query.page": function (newPage) {
      this.currentPage = Number(newPage) || 1;
      this.fetchPosts(this.$route.params.subCategoryId);
    },
  },
  methods: {
    // api 요청 : 게시판 렌더링
    async fetchPosts(subCategoryId) {
      try {
        const pageFromUrl = this.$route.query.page || 1;
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/api/post?page=${pageFromUrl}&subCategoryId=${subCategoryId}`
        );

        this.posts = response.data.posts;
        this.meta = response.data.meta;
        this.totalCount = response.data.meta.totalCount;
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    },
    // 날짜 데이터
    formatDate(row, column) {
      const date = new Date(row[column.property]);
      return date.toLocaleDateString();
    },
    // 상세페이지 이동
    goToWritePage() {
      const subCategoryId = this.$route.params.subCategoryId;
      this.$router.push({ path: "/board/write", query: { subCategoryId } });
    },
    // 페이지 변경
    changePage(page) {
      this.currentPage = page;
      this.fetchPosts(this.$route.params.subCategoryId);
      this.$router.push({
        path: this.$route.path,
        query: { page: page.toString() },
      });
    },
    // 게시글 번호 index 계산
    calculateIndex(index) {
      return this.totalCount - (this.currentPage - 1) * 15 - index;
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
</style>
