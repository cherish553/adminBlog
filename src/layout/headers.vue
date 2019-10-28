<template>
  <div class="flex w100">
    <h2 class="floatLeft">李可凡的个人博客后台管理</h2>
    <div class="floatRight">
      <el-dropdown class="mr20">
        <el-button  type="primary" size="mini">
          选择主题
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changeMode(0)"><img class="dropdownImg" src="../assets/image/back.jpg" alt=""></el-dropdown-item>
          <el-dropdown-item @click.native="changeMode(1)"><img class="dropdownImg" src="../assets/image/back1.jpg" alt=""></el-dropdown-item>
          <el-dropdown-item @click.native="changeMode(2)"><img class="dropdownImg" src="../assets/image/back2.jpeg" alt=""></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i v-if='!full' class="white el-icon-zoom-in fs mr20" @click="fullScreen"></i>
      <i v-else class="white el-icon-zoom-out fs mr20" @click="exitScreen"></i>
      <!-- <el-popover  popper-class="center" placement="bottom" width="0" trigger="click">
        <el-button class="mr20" slot="reference" size="mini" type="danger">选择模式</el-button>
      </el-popover>-->
      <el-popover popper-class="center" placement="bottom" width="150" trigger="click">
        <el-button @click="layout" size="mini" type="danger">退出登录</el-button>
        <p slot="reference" style="color:white">你好 {{name}}</p>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import cookie from '@common/cookie'
export default {
  data () {
    return {
      full: false
    }
  },
  computed: {
    ...mapState({
      name: state => state.user.name
    })
  },
  methods: {
    ...mapActions([
      'setMode'
    ]),
    // 退出登录
    layout () {
      cookie.delCookie('name')
      cookie.delCookie('token')
      this.$jump('login')
    },
    // 修改主题
    changeMode (index) {
      this.setMode(index)
    },
    // 全屏
    fullScreen () {
      this.full = true
      const el = document.documentElement
      const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen
      if (typeof rfs !== 'undefined' && rfs) rfs.call(el)
    },
    // 退出全屏
    exitScreen () {
      this.full = false
      if (document.exitFullscreen) document.exitFullscreen()
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen()
      else if (document.msExitFullscreen) document.msExitFullscreen()
    }
  }
}
</script>
