<template>
  <div class="boardTitle">
    <h2>{{ subCategoryName }}</h2>
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
        <router-link
          :to="`/post/${row.id}`"
          @click="BoardViewRequest(row.id)"
          >{{ row.title }}</router-link
        >
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
      subCategoryName: "",
      status: "",
    };
  },
  created() {
    const pageFromUrl = this.$route.query.page || 1;
    this.currentPage = Number(pageFromUrl);
    this.fetchPosts(this.$route.params.subCategoryId);
    this.checkAdminStatus();
  },
  // 페이지 변경 감시
  watch: {
    "$route.params.subCategoryId": {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // newVal이 유효한 값일 때만 fetchPosts 호출
          this.fetchPosts(newVal);
        }
      },
    },
    "$route.query.page": function (newPage) {
      this.currentPage = Number(newPage) || 1;
      if (this.$route.params.subCategoryId) {
        // subCategoryId가 유효한 값일 때만 fetchPosts 호출
        this.fetchPosts(this.$route.params.subCategoryId);
      }
    },
  },
  methods: {
    // api 요청 : 게시판 렌더링
    async fetchPosts(subCategoryId) {
      try {
        if (!subCategoryId) return;

        const pageFromUrl = this.$route.query.page || 1;
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/api/post?page=${pageFromUrl}&subCategoryId=${subCategoryId}`
        );
        this.subCategoryName = response.data.subCategory.name;
        this.posts = response.data.posts;
        this.meta = response.data.meta;
        this.totalCount = response.data.meta.totalCount;
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    },
    // api 요청: 유저 상태 확인
    async checkAdminStatus() {
      if (!this.getCookie("Authorization")) {
        return; // 쿠키가 없으면 함수 종료
      }

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/api/user/userInfo`,
          {
            withCredentials: true,
          }
        );
        console.log(this.status);
        this.status = response.data.status;
      } catch (error) {
        console.log("미로그인 상태");
      }
    },

    // api 요청 : 조회수
    async BoardViewRequest(postId) {
      const viewedCookie = this.getCookie(`postViewed_${postId}`);
      if (!viewedCookie) {
        try {
          await axios.post(
            `${process.env.VUE_APP_BACKEND_URL}/api/view/post/${postId}`
          );
          this.setCookie(`postViewed_${postId}`, "viewed", 1); // 1일 동안 유효
        } catch (error) {
          console.error("Error sending view request", error);
        }
      }
    },
    // 날짜 데이터
    formatDate(row, column) {
      const date = new Date(row[column.property]);
      return date.toLocaleDateString();
    },
    // 상세페이지 이동
    goToWritePage() {
      if (this.status !== "admin") {
        alert("권한이 없습니다.");
        return;
      }

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

    // 쿠키 설정
    setCookie(name, value, days) {
      let expires = "";
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },

    // 쿠키 가져오기
    getCookie(name) {
      let nameEQ = name + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return c.substring(nameEQ.length, c.length);
      }
      return null;
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
