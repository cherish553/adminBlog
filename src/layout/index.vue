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
<style lang="less">
.el-header{
 background-color:rgba(0,0,0,.3);
}
.el-header,
.el-footer {
  display: flex;
  justify-content:flex-start;
  align-items: center;
  // background-color: #b3c0d1;
  color: #333;
  text-align: center;
  // line-height: 60px;
}

.el-aside {
  background-color:rgba(0,0,0,.3);
  // background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container {
  height: 100%;
}
// .el-container{}
</style>
