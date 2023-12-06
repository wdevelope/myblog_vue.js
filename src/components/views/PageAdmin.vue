<template>
  <div class="adminTitle">
    <h2>관리자 페이지</h2>
    <el-tag class="ml-2" type="warning">admin</el-tag>
  </div>
  <!-- 카테고리 생성 폼 -->
  <div class="adminTitle">
    <h3>카테고리 생성</h3>
  </div>
  <el-form @submit.prevent="createCategory">
    <el-form-item label="카테고리 이름">
      <el-input
        v-model="categoryForm.name"
        placeholder="카테고리 이름"
      ></el-input>
    </el-form-item>
    <el-form-item label="카테고리 위치">
      <el-input-number
        v-model="categoryForm.position"
        :min="1"
        placeholder="위치"
      ></el-input-number>
    </el-form-item>
    <el-button type="primary" native-type="submit">카테고리 생성</el-button>
  </el-form>
  <br />
  <!-- 서브카테고리 생성 폼 -->
  <div class="adminTitle">
    <h3>서브 카테고리 생성</h3>
  </div>
  <el-form @submit.prevent="createSubCategory">
    <el-form-item label="카테고리 이름">
      <el-input
        v-model="subCategoryForm.categoryName"
        placeholder="카테고리 이름"
      ></el-input>
    </el-form-item>
    <el-form-item label="서브카테고리 이름">
      <el-input
        v-model="subCategoryForm.name"
        placeholder="서브카테고리 이름"
      ></el-input>
    </el-form-item>
    <el-form-item label="서브카테고리 위치">
      <el-input-number
        v-model="subCategoryForm.position"
        :min="1"
        placeholder="위치"
      ></el-input-number>
    </el-form-item>
    <el-button type="primary" native-type="submit">서브카테고리 생성</el-button>
  </el-form>
</template>
  
  <script>
import axios from "axios";

export default {
  name: "PageAdmin",
  data() {
    return {
      categoryForm: {
        name: "",
        position: 1,
      },
      subCategoryForm: {
        categoryName: "",
        name: "",
        position: 1,
      },
    };
  },
  methods: {
    // API 호출: 카테고리 생성
    async createCategory() {
      try {
        await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/api/category`,
          this.categoryForm,
          {
            withCredentials: true,
          }
        );
        alert("카테고리가 생성되었습니다.");
      } catch (error) {
        alert("카테고리 생성 실패");
        console.error("카테고리 생성 실패", error);
      }
    },
    // API 호출: 서브카테고리 생성
    async createSubCategory() {
      try {
        await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/api/subCategory`,
          this.subCategoryForm,
          {
            withCredentials: true,
          }
        );
        alert("서브카테고리가 생성되었습니다.");
      } catch (error) {
        alert("서브카테고리 생성 실패");
        console.error("서브카테고리 생성 실패", error);
      }
    },
  },
};
</script>
  
  <style scoped>
h3 {
  margin-bottom: 20px;
  margin-top: 20px;
}

h2 {
  margin-bottom: 20px;
}
.adminTitle {
  display: flex;
  justify-content: space-between;
}

.el-input {
  margin: 10px;
}
</style>
  