<template>
  <div>
    <top />
    <div class="container">
      <div class="mb10 clearFloat form">
        <el-col :span="4">
          <el-input
            v-model="form.name"
            placeholder="请输入文章分类名称"
            clearable
            @keyup.native.enter="list(true)"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="list(true)" icon="el-icon-search">搜索</el-button>
        </el-col>
      </div>
      <div class="mb10 clearFloat">
        <el-col :span="1">
          <el-button type="success" icon="el-icon-plus" @click="modal()">添加</el-button>
        </el-col>
      </div>
      <cherish-table
        index
        ref="table"
        pagination
        :operation='operation'
        :prop="prop"
        :getPage="getPage"
        @on-result-change="callback"
      ></cherish-table>
    </div>
    <modal ref="modal" />
  </div>
</template>
<script>
import modal from './modal'
import top from './top'
import { category } from '@api'
const { list, del } = category
export default {
  data () {
    return {
      form: {
        name: ''
      },
      prop: [{ label: 'id', prop: 'id' }, { label: '文章类别', prop: 'name' }],
      getPage: {
        page: 1,
        size: 10,
        data: [],
        total: 0
      },
      operation: {
        width: 200,
        data: [
          { name: '编辑', type: 'primary', icon: 'el-icon-edit' },
          { name: '删除', type: 'danger', icon: 'el-icon-delete' }
        ]
      }
    }
  },
  components: { top, modal },
  created () {
    this.list()
  },
  methods: {
    // 添加文章分类弹窗
    modal (data = '') {
      this.$refs.modal.open(data)
    },
    // 获取文章类别
    async list (flag) {
      if (flag) this.getPage.page = 1
      const { data, total } = await list({ ...this.getPage, ...this.form })
      this.getPage = { ...this.getPage, data, total }
      this.$refs.table.hideLoading()
    },
    // table回调
    callback (type, data) {
      switch (type) {
        case 'page':
          this.getPage = { ...this.getPage, ...data }
          this.list()
          break
        case 'operation':
          if (data.type === '编辑') return this.modal(data.data)
          else if (data.type === '删除') return this.del(data.data.id)
      }
    },
    // 删除文章分类
    async del (id) {
      if (!await this.$confirm('此操作将删除该文章类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(_ => false)) return
      await del(id)
      this.list()
    }
  }
}
</script>
