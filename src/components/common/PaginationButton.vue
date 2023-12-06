<template>
  <div class="pagination">
    <button @click="prevPageRange" :disabled="startPage === 1">Prev</button>
    <button
      v-for="page in paginationButtons"
      :key="page"
      @click="changePage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
    <button
      @click="nextPageRange"
      :disabled="startPage + pageSize > totalPages"
    >
      Next
    </button>
  </div>
</template>
  
  <script>
export default {
  name: "PaginationButton",
  props: {
    totalPages: Number,
    currentPage: Number,
    pageSize: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      startPage: 1,
    };
  },
  computed: {
    paginationButtons() {
      const endPage = Math.min(
        this.startPage + this.pageSize - 1,
        this.totalPages
      );
      return Array.from(
        { length: endPage - this.startPage + 1 },
        (_, i) => i + this.startPage
      );
    },
  },
  methods: {
    changePage(page) {
      this.$emit("page-changed", page);
    },
    setStartPage(page) {
      this.startPage = page;
    },
    prevPageRange() {
      const newStartPage = Math.max(this.startPage - this.pageSize, 1);
      if (newStartPage !== this.startPage) {
        this.setStartPage(newStartPage);
        this.changePage(newStartPage);
      }
    },
    nextPageRange() {
      const newStartPage = Math.min(
        this.startPage + this.pageSize,
        this.totalPages
      );
      if (newStartPage !== this.startPage) {
        this.setStartPage(newStartPage);
        this.changePage(newStartPage);
      }
    },
  },
};
</script>
  
  <style scoped>
.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.pagination button {
  border: 1px solid #ddd;
  padding: 5px 10px;
  margin: 0 5px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #f5f5f5;
}

.pagination .active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
  