<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <h1>Login</h1>

    <input
      type="email"
      v-model="loginInfo.email"
      placeholder="Email"
      required
      class="input-field"
    />
    <input
      type="password"
      v-model="loginInfo.password"
      placeholder="Password"
      required
      class="input-field"
    />
    <button type="submit" class="submit-button">Login</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "PageLogin",
  data() {
    return {
      loginInfo: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/api/user/login`,
          this.loginInfo,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          alert("로그인에 성공했습니다.");
          this.$store.dispatch("login");
          this.$router.push("/home");
        } else {
          alert(response.data.errorMessage || "로그인에 실패했습니다.");
        }
      } catch (error) {
        alert("로그인이 실패했습니다.");
        console.error(error, "알 수 없는 에러 발생");
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}
.login-form {
  flex-direction: column;
  padding: 20px;
  max-width: 300px;
  margin: auto;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  padding: 10px 20px;
  color: white;
  background-color: #4286f4;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #3066be;
}
</style>