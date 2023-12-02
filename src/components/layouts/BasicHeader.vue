<template>
  <h1>w-life daily</h1>
  <div>
    <router-link to="/login">
      <el-button type="Login" round>Login</el-button>
    </router-link>
    <router-link to="/register">
      <el-button type="Register" round>Register</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "BasicHeader",
};
</script>

<style scoped>
</style>