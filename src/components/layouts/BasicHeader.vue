<template>
  <router-link to="/home" class="custom-router-link">
    <h1>w-life daily</h1>
  </router-link>
  <div>
    <router-link v-if="!isLoggedIn" to="/login">
      <el-button type="Login" round>Login</el-button>
    </router-link>
    <router-link v-if="!isLoggedIn" to="/register">
      <el-button type="Register" round>Register</el-button>
    </router-link>

    <router-link v-if="isLoggedIn" to="/logout">
      <el-button type="Logout" @click="logout" round>Logout</el-button>
    </router-link>
    <router-link v-if="isLoggedIn" to="/account">
      <el-button type="Account" round>Account</el-button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BasicHeader",
  computed: {
    // VueX 스토어의 상태를 계산된 속성으로 가져옴.
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    // 로그인 상태 확인 (쿠키)
    async checkLoginStatus() {
      try {
        if (!this.isLoggedIn()) {
          return; // 로그인하지 않은 상태라면 함수 종료
        }

        await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/api/user/check`,
          // 쿠키 사용 설정
          {
            withCredentials: true,
          }
        );
        this.$store.dispatch("login");
      } catch (error) {
        console.log("미로그인 상태");
      }
    },
    // 로그아웃
    async logout() {
      try {
        await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/api/user/logout`,
          {},
          {
            withCredentials: true,
          }
        );
        alert("로그아웃 성공!");
        this.$store.dispatch("logout");
        this.$router.push("/login");
      } catch (error) {
        console.error("Error during logout", error);
        alert("로그아웃 실패");
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: white;
}
h1:hover {
  scale: 1.1;
}
.custom-router-link {
  text-decoration: none;
}

.el-button {
  margin-left: 5px;
}
</style>