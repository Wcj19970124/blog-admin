<template>
  <div>
    <el-form ref="form" :model="user" label-width="80px" size="mini">
      <el-form-item label="账号" prop="username">
        <el-input v-model="user.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" type="password" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="user.name" />
      </el-form-item>
      <el-form-item label="头像" prop="header">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="user.sex" :label="1">男</el-radio>
        <el-radio v-model="user.sex" :label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="user.nickname" />
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="user.userEmail" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userApi from '@/api/myUser'
import { getToken } from '../../../utils/auth'
export default {
  data() {
    return {
      headers: {
        // 上传图片的请求头
        Authorization: getToken()
      },
      imageUrl: '', // 图片回显地址
      uploadUrl: process.env.VUE_APP_UPLOAD_URL, // 上传图片接口路径
      user: {
        sex: 1
      }
    }
  },
  methods: {
    onSubmit() {
      // 保存用户
      userApi.add(this.user).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeAddDialog')
        this.$emit('getUserList')
        // 清空表单
        this.$refs['form'].resetFields()
        // 清空图片
        this.imageUrl = ''
      })
    },
    // 关闭对话框
    closeDialog() {
      this.$emit('closeAddDialog')
    },
    // 上传文件成功获取其上传路径
    handleAvatarSuccess(res, file) {
      this.$message.success(res.msg)
      this.imageUrl = res.data
      this.user.header = res.data
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
