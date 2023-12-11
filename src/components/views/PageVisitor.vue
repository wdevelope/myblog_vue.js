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
        <span v-if="row.isPrivate">🔒</span>
        <a @click.prevent="handleClick(row)">{{ row.title }}</a>
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
        status: "",
      },
    };
  },
  methods: {
    // 방명록 제목 클릭 이벤트
    async handleClick(row) {
      if (row.isPrivate) {
        const password = prompt("비밀번호를 입력하세요.");
        if (password) {
          await this.visitorPasswordCheck(row.id, password);
        }
      } else {
        const visitorCookie = this.getCookie(`visitorViewed_${row.id}`);
        if (!visitorCookie) {
          await this.visitorViewRequest(row.id);
          this.setCookie(`visitorViewed_${row.id}`, "viewed", 1); // 1일 동안 유효
        }
        this.$router.push(`/visitor/${row.id}`);
      }
    },

    // api 요청 : 조회수
    async visitorViewRequest(visitorId) {
      try {
        await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/api/view/visitor/${visitorId}`
        );
      } catch (error) {
        console.error("Error sending view request", error);
      }
    },

    // api 요청: 유저 상태 확인
    async checkAdminStatus() {
      if (!this.getCookie("authToken")) {
        return; // 쿠키가 없으면 함수 종료
      }

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/api/user/userInfo`,
          {
            withCredentials: true,
          }
        );
        this.status = response.data.status;
      } catch (error) {
        console.log("미로그인 상태");
      }
    },

    // api 요청 : 비밀번호 체크
    async visitorPasswordCheck(visitorId, password) {
      try {
        await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/api/visitor/${visitorId}/password`,
          { password }
        );
        this.visitorViewRequest(visitorId);
        this.$router.push(`/visitor/${visitorId}`);
      } catch (error) {
        console.error("Error sending view request", error);
        alert("비밀번호가 틀렸습니다.");
      }
    },

    // 날짜 설정
    formatDate(row, column) {
      const date = new Date(row[column.property]);
      return date.toLocaleDateString();
    },

    // 방명록 글쓰기 페이지로 이동
    goToWritePage() {
      if (this.status !== "user") {
        alert("로그인을 해주세요.");
        return;
      }

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
    this.checkAdminStatus();
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

a {
  color: blue;
  text-decoration: underline;
}

a:hover {
  cursor: pointer;
}
</style>