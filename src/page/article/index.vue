<template>
  <div>
    <top />
    <div class="container">
      <div class="mb10 clearFloat form">
        <el-col :span="4">
          <el-input
            v-model="form.name"
            placeholder="请输入文章名称"
            clearable
            @keyup.native.enter="list(true)"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            v-model="form.title"
            placeholder="请输入文章标题"
            clearable
            @keyup.native.enter="list(true)"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-select clearable v-model="form.categoryId" placeholder="请选择文章类别">
            <el-option
              v-for="item in category"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              clearable
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-cascader
            placeholder="请选择文章标签"
            :options="tag"
            v-model="form.tagId"
            :props="props"
            clearable
          ></el-cascader>
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
        :operation="operation"
        :prop="prop"
        :getPage="getPage"
        @on-result-change="callback"
      >
        <el-table-column
          show-overflow-tooltip
          prop="status"
          label="文章标签"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.tagName" :key="item.tagName">{{item.tagName}}</el-tag>
            <!-- {{scope.row.tagName}} -->
          </template>
        </el-table-column>
         <el-table-column show-overflow-tooltip prop="status" label="上架" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.show!==0"  type="danger">已上架</el-tag>
            <el-tag v-else >隐藏</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===1">普通文章</el-tag>
            <el-tag v-else type="danger">精品文章</el-tag>
          </template>
        </el-table-column>
      </cherish-table>
    </div>
    <modal ref="modal" />
  </div>
</template>
<script>
import modal from './modal'
import top from './top'
import { data } from './mixins'
import { article, tag, category } from '@api'
const { list, del, changeStatus } = article
const { all: allTag } = tag
const { all: allCategory } = category
export default {
  mixins: [data],
  data () {
    return {
      form: {
        name: '',
        categoryId: '',
        tagId: [],
        title: '',
        show: true
      },
      prop: [
        { label: 'id', prop: 'id' },
        { label: '文章名称', prop: 'name' },
        { label: '文章标题', prop: 'title' },
        { label: '文章类别', prop: 'categoryName' }
      ],
      getPage: {
        page: 1,
        size: 10,
        data: [],
        total: 0
      },
      operation: {
        width: 400,
        data: [
          { name: '切换上架', type: 'success', icon: 'el-icon-setting' },
          { name: '切换状态', type: 'warning', icon: 'el-icon-setting' },
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
  mounted () {
    this.allCategory()
    this.allTag()
  },
  methods: {
    // 获取所有文章类别
    async allCategory () {
      const data = await allCategory()
      this.$refs.modal.category = data
      this.category = data
    },
    // 获取所有的文章标签
    async allTag () {
      const data = await allTag()
      this.$refs.modal.tag = data
      this.tag = data
    },
    // 添加文章分类弹窗
    modal (id = '') {
      this.$refs.modal.open(id)
    },
    // 获取文章类别
    async list (flag) {
      if (flag) this.getPage.page = 1
      const { page, size } = this.getPage
      const { data, total } = await list({ page, size, ...this.form })
      this.getPage = { ...this.getPage, data, total }
      this.$refs.table.hideLoading()
    },
    // table回调
    callback (type, { type: types, data, page, size }) {
      switch (type) {
        case 'page':
          this.getPage = { ...this.getPage, size, page }
          this.list()
          break
        case 'operation':
          if (types === '编辑') return this.modal(data.id)
          else if (types === '删除') return this.del(data.id)
          else if (types === '切换状态') return this.changeStatus(data)
          else if (types === '切换上架') return this.changeShow(data)
      }
    },
    // 切换文章状态
    async changeStatus ({ id, status }) {
      await changeStatus({ id, status: status === 1 ? 2 : 1 })
      this.list()
    },
    // 切换文章是否显示
    async changeShow ({ id, show }) {
      await changeStatus({ id, show: show === 1 ? 0 : 1 })
      this.list()
    },
    // 删除文章分类
    async del (id) {
      if (
        !(await this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(_ => false))
      ) {
        return
      }
      await del(id)
      this.list()
    }
  }
}
</script>
