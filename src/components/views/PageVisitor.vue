<template>
  <h2>방명록</h2>
  <el-button type="primary" @click="goToWritePage">글쓰기</el-button>
  <el-table :data="visitors" class="table-responsive" style="width: 1000px">
    <el-table-column prop="index" label="번호" width="80">
      <template #default="{ $index }">
        {{ visitors.length - $index }}
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
  <el-pagination
    small
    layout="prev, pager, next"
    :total="50"
    class="pagination"
  />
</template>

<script>
import axios from "axios";

export default {
  name: "PageVisitor",
  data() {
    return {
      visitors: [],
    };
  },
  methods: {
    formatDate(row, column) {
      const date = new Date(row[column.property]);
      return date.toLocaleDateString();
    },
    goToWritePage() {
      this.$router.push("/visitor/write"); // 글쓰기 페이지로 이동
    },
  },
  async created() {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/api/visitor`
      );
      this.visitors = response.data;
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>