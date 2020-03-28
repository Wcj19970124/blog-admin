<template>
  <div>
    <el-form ref="form" :model="admin" label-width="80px" size="mini">
      <el-form-item label="密码" prop="password">
        <el-input v-model="admin.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import adminApi from '@/api/admin'
export default {
  props: {
    admin: {
      type: Object,
      default: null
    }
  },
  methods: {
    // 点击取消，关闭对话框
    closeDialog() {
      this.$emit('closeUpdateDialog')
    },
    // 修改密码
    onSubmit() {
      adminApi.updatePwd(this.admin).then(res => {
        this.admin.password = null
        this.$message.success(res.msg)
        this.$emit('closeUpdateDialog')
      })
    }
  }
}
</script>
