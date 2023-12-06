<template>
  <div class="visitorTitle">
    <h2>방명록</h2>
    <el-button type="primary" @click="goToWritePage">글쓰기</el-button>
  </div>
  <el-table :data="visitors" class="table-responsive" style="width: 100%">
    <el-table-column prop="index" label="번호" width="80">
      <template #default="{ $index }">
        {{ calculateIndex($index) }}
      </template>
    </el-table-column>
    <el-table-column label="제목">
      <template #default="{ row }">
        <router-link :to="`/visitor/${row.id}`">{{ row.title }}</router-link>
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
  name: "PageVisitor",
  components: {
    Pagination,
  },
  data() {
    return {
      visitors: [],
      meta: {
        totalPages: 0,
        currentPage: 1,
        totalCount: 0,
      },
    };
  },
  methods: {
    // 날짜 설정
    formatDate(row, column) {
      const date = new Date(row[column.property]);
      return date.toLocaleDateString();
    },

    // 방명록 상세 페이지 이동
    goToWritePage() {
      this.$router.push("/visitor/write"); // 글쓰기 페이지로 이동
    },

    // api 호출 : 방명록 랜더링
    async fetchVisitors(page) {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/api/visitor?page=${page}`
        );
        this.visitors = response.data.visitors;
        this.meta = response.data.meta;
        this.totalCount = response.data.meta.totalCount;
      } catch (error) {
        console.error("Error fetching visitors", error);
      }
    },

    // 페이지 변경
    changePage(page) {
      this.currentPage = page;
      this.fetchVisitors(page);
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
  // 실시간 변경 감지
  watch: {
    "$route.query.page": function (newPage) {
      this.currentPage = Number(newPage) || 1;
      this.fetchVisitors(this.currentPage);
    },
  },
  created() {
    const pageFromUrl = this.$route.query.page || 1;
    this.currentPage = Number(pageFromUrl);
    this.fetchVisitors(this.currentPage);
  },
};
</script>


<style scoped>
h2 {
  margin-bottom: 30px;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.visitorTitle {
  display: flex;
  justify-content: space-between;
}
</style>