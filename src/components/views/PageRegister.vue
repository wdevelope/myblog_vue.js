<template>
  <form @submit.prevent="register">
    <h1>Register</h1>

    <input
      type="email"
      v-model="registerInfo.email"
      placeholder="Email"
      required
      class="input-field"
    />
    <input
      type="name"
      v-model="registerInfo.name"
      placeholder="name"
      required
      class="input-field"
    />
    <input
      type="password"
      v-model="registerInfo.password"
      placeholder="Password"
      required
      class="input-field"
    />

    <input
      type="password"
      id="confirmPassword"
      v-model="registerInfo.confirmPassword"
      placeholder="Confirm Password"
      required
      class="input-field"
    />
    <button type="submit" class="submit-button">회원가입</button>
  </form>
</template>
  
  <script>
import axios from "axios";

export default {
  name: "PageRegister",
  data() {
    return {
      registerInfo: {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/api/user/register`,
          this.registerInfo,
          {
            withCredentials: true,
          }
        );

        if (response.status === 201) {
          alert("회원가입에 성공했습니다.");
          this.$router.push("/login");
        } else {
          alert(response.data.errorMessage || "회원가입에 실패했습니다.");
        }
      } catch (error) {
        alert("회원가입이 실패했습니다.");
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
form {
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