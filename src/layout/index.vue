<template>
  <el-container>
    <el-header>
      <headers />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <left-menu />
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import leftMenu from './leftMenu'
import headers from './headers'
export default {
  components: {
    leftMenu,
    headers
  }
}
</script>
