<template>
  <div class="accountTitle">
    <h2>유저 정보</h2>
    <el-tag class="ml-4" type="warning">{{ status }}</el-tag>
  </div>
  <span>name: {{ name }}</span>
  <p>email: {{ email }}</p>
  <el-button v-if="status === 'admin'" type="primary" @click="goToAdminPage"
    >관리자 페이지</el-button
  >
</template>

<script>
import axios from "axios";

export default {
  name: "PageAccount",
  data() {
    return {
      name: "",
      email: "",
      status: "",
    };
  },
  methods: {
    goToAdminPage() {
      this.$router.push("/admin");
    },
  },
  async created() {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/api/user/userInfo`,
        {
          withCredentials: true,
        }
      );
      this.name = response.data.name;
      this.email = response.data.email;
      this.status = response.data.status;
    } catch (error) {
      console.error("Error fetching visitor detail", error);
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.el-button {
  margin-top: 20px;
}

.accountTitle {
  display: flex;
  justify-content: space-between;
}
</style>