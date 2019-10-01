<template>
  <div class="flex">
    <el-pagination
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="getPage.page"
      :page-size="parseInt(getPage.size)"
      layout="total, prev, pager, next, jumper"
      :total="getPage.total"
    ></el-pagination>
      <!-- :page-sizes="[10, 20, 30, 40]" -->
  </div>
</template>
<script>
export default {
  name: 'cherishPagination',
  props: {
    getPage: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    sizeChange (val) {
      this.$emit('on-result-change', 'page', { page: 1, size: val })
    },
    pageChange (val) {
      this.$emit('on-result-change', 'page', {
        page: val,
        size: this.getPage.size
      })
    }
  }
}
</script>
