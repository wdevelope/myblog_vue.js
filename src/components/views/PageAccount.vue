<template>
  <div class="account-box">
    <h2>유저 정보</h2>
    <span
      >name: {{ name
      }}<el-tag class="ml-4" type="warning">{{ status }}</el-tag></span
    >
    <span>email: {{ email }}</span>
    <el-button v-if="status === 'admin'" type="primary" @click="goToAdminPage"
      >관리자 페이지</el-button
    >
  </div>
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
  margin-bottom: 50px;
}

.el-button {
  margin-top: 20px;
}

.account-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 10px;
}

.account-box > span {
  font-size: 1.2rem;
  color: rgb(63, 63, 63);
}

.el-tag {
  margin-left: 5px;
}
</style>