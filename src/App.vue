<template>
  <div id="app" :class="mode===0?'bgi':mode===1?'bgi1':'bgi2'" >
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      url: '@/assets/image/back.jpg'
    }
  },
  created () {
    this.setUser()
    this.setMode()
  },
  methods: {
    ...mapActions([
      'setUser',
      'setMode'
    ])
  },
  computed: {
    ...mapState({
      mode: state => state.user.mode
    })
  }
}
</script>
<style lang="less">
  @import "./assets/css/common.less";
</style>
