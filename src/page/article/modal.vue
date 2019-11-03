<template>
  <cherish-dialog width="1200px" @cancel="cancel" @confirm="confirm" ref="modal" :title="title">
    <el-form :rules="rules" :model="form" ref="form" label-width="80px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="文章名称" prop="name">
            <el-input clearable placeholder="文章名称" v-model.trim="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="文章标题" prop="title">
            <el-input clearable placeholder="文章标题" v-model.trim="form.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="文章标签" prop="tagId">
            <el-cascader :options="tag" v-model="form.tagId" :props="props" clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="文章类别" prop="categoryId">
            <el-select v-model="form.categoryId" placeholder="请选择文章类别">
              <el-option
                v-for="item in category"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                clearable
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文章内容" prop="inner">
            <mavon-editor v-model="form.inner" ref="md" @imgAdd="imgAdd" @imgDel="imgDel" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </cherish-dialog>
</template>
<script>
import * as qiniu from 'qiniu-js'
import { data } from './mixins'
import { dialog } from '@/mixins'
import { article, user } from '@api'
const { getToken, delFile } = user
const { add, search, update } = article
export default {
  name: 'editCategory',
  mixins: [dialog, data],
  computed: {
    title () {
      if (this.id) return '编辑文章'
      return '添加文章'
    }
  },
  provide () {
    return {
      super: this
    }
  },
  data () {
    return {
      pos: '',
      rules: {
        name: [{ required: true, message: '请输入文章名称', trigger: 'blur' }],
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        inner: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
        tagId: [{ required: true, message: '请选择标签', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择类别', trigger: 'blur' }]
      },
      form: {
        name: '',
        title: '',
        categoryId: '',
        tagId: [],
        inner: ''
      },
      id: ''
    }
  },
  methods: {
    // 图片删除
    async imgDel (file) {
      await delFile(file[1].name)
    },
    // 图片上传
    async imgAdd (pos, file) {
      this.pos = pos
      const observable = qiniu.upload(file, file.name, await this.getToken())
      observable.subscribe(this.next, this.err, this.com)
    },
    // 下一步
    next (res) {},
    // 错误
    err (res) {},
    // 完成图片上传
    com (res) {
      if (res.code === 614) return this.$message.error('此照片已存在')
      this.$refs.md.$img2Url(this.pos, `${this.$url}${res.key}`)
      this.$message.success('上传成功')
    },
    // 获取上传的token
    async getToken () {
      const token = await getToken()
      return token
    },
    // 清空数据
    clear () {
      this.id = ''
      for (const item in this.form) {
        this.form[item] = ''
      }
    },
    // 根据id查询文章详情
    async search () {
      const { id, tagName, ...rest } = await search(this.id)
      const tagId = tagName.map(item => item.tagId)
      this.form = {
        ...rest,
        tagId
      }
    },
    // 编辑
    edit (id) {
      this.id = id
      this.search()
    },
    // 进入页面触发
    open (id) {
      this.clear()
      this.show()
      if (id) return this.edit(id)
      this.id = ''
    },
    // 编辑文章
    async update () {
      if (await update({ ...this.form, id: this.id })) return this.success()
    },
    // 添加文章分类
    async add () {
      if (await add(this.form)) return this.success()
    },
    // 添加或编辑文章成功
    success () {
      this.$parent.list()
      this.cancel()
    },
    // 用户点击了确认
    confirm () {
      this.$refs.form.validate(valid =>
        valid === false ? '' : this.id === '' ? this.add() : this.update()
      )
    }
  }
}
</script>
