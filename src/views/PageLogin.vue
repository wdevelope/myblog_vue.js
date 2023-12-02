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
        await axios.post(
          "http://localhost:3000/api/user/login",
          this.loginInfo
        );

        // 로그인 성공 처리

        // 예: 토큰 저장, 홈페이지로 리디렉션 등
      } catch (error) {
        // 에러 처리
        // 예: 사용자에게 에러 메시지 표시
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