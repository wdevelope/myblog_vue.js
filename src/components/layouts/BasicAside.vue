<template>
  <el-aside width="200px" class="main-aside">
    <el-scrollbar>
      <!-- 홈 -->
      <el-menu :default-openeds="[]">
        <el-menu-item index="1">
          <template #title>
            <el-icon><message /></el-icon>
            <router-link to="/home">Home</router-link>
          </template>
        </el-menu-item>
        <!-- 게시판 -->
        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>Category 1
          </template>
          <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="2-1">Option 1</el-menu-item>
            <el-menu-item index="2-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="2-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="2-4">
            <template #title>Option 4</template>
            <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <!-- 방명록 -->
        <el-menu-item index="3">
          <template #title>
            <router-link to="/visitor">
              <el-icon><setting /></el-icon>Visitor
            </router-link>
          </template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
export default {
  name: "BasicAside",
  methods: {},
};
</script>

<style scoped>
</style>