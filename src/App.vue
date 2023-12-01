<template>
  <el-container class="main">
    <!-- 헤더 -->
    <el-header><BasicHeader /></el-header>
    <!--메인 -->
    <el-container>
      <el-aside><BasicAside /></el-aside>
      <el-container>
        <el-main><slot></slot></el-main>
      </el-container>
    </el-container>
    <!-- 푸터 -->
  </el-container>
</template>

<script>
import BasicHeader from "./components/layouts/BasicHeader.vue";
import BasicAside from "./components/layouts/BasicAside.vue";

export default {
  name: "App",
  components: { BasicHeader, BasicAside },
};
</script>

<style>
.el-header {
  background: linear-gradient(to right, #373b44, #4286f4);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main {
  height: 100%;
}
</style>
