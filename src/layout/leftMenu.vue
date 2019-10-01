<template>
  <el-menu active-text-color="#409EFF" class="el-menu-vertical-demo">
    <!-- @open="handleOpen"
    @close="handleClose"-->
    <el-menu-item index="1-1" @click="jump('article-index')">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>文章管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="1-2" @click="jump('category-index')">
      <template slot="title">
        <i class="el-icon-tickets"></i>
        <span>文章类别</span>
      </template>
    </el-menu-item>
    <el-menu-item index="1-3" @click="jump('tag-index')">
      <template slot="title">
        <i class="el-icon-collection-tag"></i>
        <span>标签类别</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  methods: {
    jump (name) {
      if (!(this.$route.name === name)) this.$jump(name)
    }
  }
}
</script>
