<template>
  <cherish-dialog width='400px'  @cancel='cancel' @confirm='confirm' ref="modal" :title="title">
    <el-form :rules="rules" :model="form" ref="form" label-width="80px">
      <el-form-item label="文章名称" prop="name">
        <el-input placeholder="文章名称" v-model.trim="form.name"></el-input>
      </el-form-item>
    </el-form>
  </cherish-dialog>
</template>
<script>
import { dialog } from '@/mixins'
import { category } from '@api'
const { add, update } = category
export default {
  name: 'editCategory',
  mixins: [dialog],
  computed: {
    title () {
      if (this.id) return '编辑文章类别'
      return '添加文章类别'
    }
  },
  data () {
    return {
      rules: {
        name: [{ required: true, message: '请输入文章类别', trigger: 'blur' }]
      },
      form: {
        name: ''
      },
      id: ''
    }
  },
  methods: {
    // 清空数据
    clear () {
      this.id = ''
      for (const item in this.form) {
        this.form[item] = ''
      }
    },
    // 编辑
    edit (data) {
      this.id = data.id
      this.form.name = data.name
    },
    // 进入页面触发
    open (data) {
      this.clear()
      this.show()
      if (data) return this.edit(data)
      this.id = ''
    },
    // 编辑文章类别
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
      this.$refs.form.validate(valid => valid === false ? '' : this.id === '' ? this.add() : this.update())
    }
  }
}
</script>
