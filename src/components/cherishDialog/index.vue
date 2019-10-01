<template>
  <el-dialog :append-to-body='appendToBody' :width="width" :title="title" :visible.sync="show" :close-on-click-modal="false">
      <slot/>
    <div slot="footer" class="dialog-footer">
      <el-button v-for="(item,index) in bottom" :type="item.type" :key="index" @click="$emit(item.methods)">{{item.name}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'cherishDialog',
  data () {
    return { show: false }
  },
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '1000px'
    },
    title: {
      type: String,
      default: ''
    },
    bottom: {
      type: Array,
      default () {
        return [
          {
            name: '取 消',
            methods: 'cancel',
            type: ''
          },
          {
            name: '确 定',
            methods: 'confirm',
            type: 'primary'
          }]
      }
    }
  }
}
</script>
