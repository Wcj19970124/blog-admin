<template>
  <div style="margin:15px">
    <el-form ref="form" :model="admin" label-width="80px" size="mini">
      <el-form-item label="账号" prop="username">
        <el-input v-model="admin.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-button type="primary" @click="updatePwd">修改密码</el-button>
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
      <el-form-item label="昵称" prop="name">
        <el-input v-model="admin.name" />
      </el-form-item>
      <el-form-item label="签名" prop="signature">
        <el-input v-model="admin.signature" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="updateAdmin">修改</el-button>
      </el-form-item>
    </el-form>

    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="updateDialog">
      <admin-update-pwd :admin="admin" @closeUpdateDialog="closeUpdateDialog" />
    </el-dialog>
  </div>
</template>

<script>
import adminApi from '@/api/admin'
import { getToken } from '@/utils/auth'
import AdminUpdatePwd from './admin-update-pwd'
export default {
  components: {
    AdminUpdatePwd
  },
  data() {
    return {
      updateDialog: false, // 显示修改密码对话框变量
      headers: {
        // 上传图片的请求头
        Authorization: getToken()
      },
      uploadUrl: process.env.VUE_APP_UPLOAD_URL, // 上传图片接口路径
      admin: {},
      imageUrl: '' // 图片回显地址
    }
  },
  // 监听图片的改变
  watch: {
    'admin.header': function(newVal, oldVal) {
      this.imageUrl = newVal
    }
  },
  created() {
    this.getAdminInfo()
  },
  methods: {
    getAdminInfo() {
      adminApi.getInfo().then(res => {
        this.admin = res.data
      })
    },
    // 上传文件成功获取其上传路径
    handleAvatarSuccess(res, file) {
      this.$message.success(res.msg)
      this.imageUrl = res.data
      this.admin.header = res.data
    },
    // 修改管理员基本信息
    updateAdmin() {
      adminApi.update(this.admin).then(res => {
        this.$message.success(res.msg)
      })
    },
    // 修改管理员密码
    updatePwd() {
      this.updateDialog = true
    },
    // 关闭修改密码弹窗
    closeUpdateDialog() {
      this.updateDialog = false
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
