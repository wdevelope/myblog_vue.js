<template>
  <el-aside>
    <el-scrollbar>
      <!-- 홈 -->
      <el-menu :default-openeds="[]">
        <el-menu-item index="home">
          <template #title>
            <el-icon><HomeFilled /></el-icon>
            <router-link to="/home" class="custom-router-link"
              >Home</router-link
            >
          </template>
        </el-menu-item>

        <!-- 동적으로 생성되는 카테고리 -->
        <el-sub-menu
          v-for="category in categories"
          :key="category.id"
          :index="category.id.toString()"
        >
          <template #title>
            <el-icon><Collection /></el-icon>{{ category.name }}
          </template>

          <!-- 서브카테고리 렌더링 -->
          <el-menu-item-group
            v-for="subCategory in subCategories[category.id]"
            :key="subCategory.id"
          >
            <el-menu-item
              :index="subCategory.id.toString()"
              @click="goToSubCategoryBoard(subCategory.id)"
            >
              {{ subCategory.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!-- 방명록 -->
        <el-menu-item index="visitor">
          <template #title>
            <router-link to="/visitor" class="custom-router-link">
              <el-icon><Avatar /></el-icon>Visitor
            </router-link>
          </template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import axios from "axios";

export default {
  name: "BasicAside",
  data() {
    return {
      categories: [],
      subCategories: {},
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    // api 요청 : 카테고리 가져오기
    async fetchCategories() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/api/category`
        );
        this.categories = response.data.sort((a, b) => a.position - b.position);

        await this.fetchSubCategories();
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    },
    // api 요청 : 서브 카테고리 가져오기
    async fetchSubCategories() {
      try {
        for (let category of this.categories) {
          const response = await axios.get(
            `${process.env.VUE_APP_BACKEND_URL}/api/subCategory/${category.id}`
          );

          this.subCategories[category.id] = response.data.sort(
            (a, b) => a.position - b.position
          );
        }
      } catch (error) {
        console.error("Error fetching subcategories", error);
      }
    },
    goToSubCategoryBoard(subCategoryId) {
      this.$router.push(`/subCategory/${subCategoryId}`);
    },
  },
};
</script>

<style scoped>
.custom-router-link {
  text-decoration: none;
}
</style>