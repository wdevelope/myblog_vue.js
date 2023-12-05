<template>
  <el-page-header @back="goBack" :icon="ArrowLeft">
    <template #content>
      <div class="flex items-center">
        <span class="text-large"> {{ title }} </span>
        <el-avatar
          :size="32"
          class="mr-3"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="mr-2" style="color: var(--el-text-color-regular)">
          {{ author }}
        </span>
        <el-tag>작성자</el-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="primary" class="ml-2">Edit</el-button>
      </div>
    </template>
    <div>
      {{ content }}
    </div>
  </el-page-header>
</template>
  
  
  <script>
import axios from "axios";

export default {
  name: "PageVisitorDeatil",
  data() {
    return {
      title: "",
      content: "",
      author: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  async created() {
    try {
      const visitorId = this.$route.params.visitorId;
      const response = await axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/api/visitor/${visitorId}`
      );
      this.title = response.data.title;
      this.content = response.data.content;
      this.author = response.data.user.name;
    } catch (error) {
      console.error("Error fetching visitor detail", error);
    }
  },
};
</script>
<style scoped>
.text-large {
  margin-right: 100px;
  margin-left: 50px;
}
</style>