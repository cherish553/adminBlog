<template>
  <div class="w100 h100 flexCenter">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2 class="center white">李可凡个人博客管理后台</h2>
      </div>
      <el-form class="whiteLabel" :rules="rules" :model="form" ref="form" label-width="70px">
        <el-form-item label="用户名" prop="userName">
          <el-input @keyup.enter.native="submit('form')" v-model.trim="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input @keyup.enter.native="submit('form')" type="password" v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('form')">确认登录</el-button>
          <!-- <el-button @click="reset('form')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { user } from '@api'
import cookie from '@common/cookie'
const { login } = user
export default {
  data () {
    return {
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      form: {
        userName: '',
        passWord: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'setUser'
    ]),
    // 登录
    async login () {
      try {
        const { token, name } = await login({
          ...this.form,
          passWord: this.$md5(this.form.passWord)
        })
        cookie.setCookie('name', name)
        cookie.setCookie('token', token)
        this.setUser()
        this.$jump('article-index')
      } catch (err) {
        console.log(err)
      }
    },
    // 提交表单
    submit (ref) {
      this.$refs[ref].validate(valid => (valid === true ? this.login() : ''))
    },
    // 重置表单
    reset (ref) {
      this.$refs[ref].resetFields()
    }
  }
}
</script>
