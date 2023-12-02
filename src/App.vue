<template>
  <div>
    <el-container>
      <!-- 헤더 -->
      <el-header><BasicHeader /></el-header>
      <el-container>
        <!-- 사이드 -->
        <el-aside width="200px"><BasicAside /></el-aside>
        <el-container class="main-container">
          <el-main> <router-view></router-view> </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BasicHeader from "./components/layouts/BasicHeader.vue";
import BasicAside from "./components/layouts/BasicAside.vue";

export default {
  name: "App",
  components: { BasicHeader, BasicAside },
};
</script>

<style scoped>
.el-header {
  background: linear-gradient(to right, #373b44, #4286f4);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-container {
  height: 100vh;
}
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
