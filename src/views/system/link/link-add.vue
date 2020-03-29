<template>
  <div>
    <el-form ref="form" :model="link" label-width="80px" size="mini">
      <el-form-item label="链接名" prop="linkName">
        <el-input v-model="link.linkName" />
      </el-form-item>
      <el-form-item label="连接地址" prop="linkUrl">
        <el-input v-model="link.linkUrl" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import linkApi from '@/api/link'
export default {
  data() {
    return {
      link: {}
    }
  },
  methods: {
    onSubmit() {
      // 保存友情链接
      linkApi.add(this.link).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeAddDialog')
        this.$emit('getLinkList')
        // 清空表单
        this.$refs['form'].resetFields()
      })
    },
    // 关闭对话框
    closeDialog() {
      this.$emit('closeAddDialog')
    }
  }
}
</script>
