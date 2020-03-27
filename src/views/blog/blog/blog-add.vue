<template>
  <div>
    <el-form ref="form" :model="blog" label-width="80px" size="mini">
      <el-form-item label="博客标题" prop="blogTitle">
        <el-input v-model="blog.blogTitle" />
      </el-form-item>
      <el-form-item label="封面" prop="blogImage">
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
      <el-form-item label="博客类型" prop="blogType">
        <el-select v-model="blog.blogType" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in typeList"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="blogContent">
        <tinymce ref="content" v-model="blog.blogContent" />
      </el-form-item>
      <el-form-item label="备注" prop="blogRemark">
        <el-input v-model="blog.blogRemark" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import blogApi from '@/api/blog'
import Tinymce from '@/components/Tinymce/index'
import { getToken } from '../../../utils/auth'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      headers: {
        // 上传图片的请求头
        Authorization: getToken()
      },
      imageUrl: '', // 图片回显地址
      uploadUrl: process.env.VUE_APP_UPLOAD_URL, // 上传图片接口路径
      blog: {},
      typeList: this.$store.getters.typeList
    }
  },
  created() {
    console.log(this.$store.getters.typeList)
  },
  methods: {
    onSubmit() {
      // 保存博客
      blogApi.add(this.blog).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeAddDialog')
        this.$emit('getBlogList')
        // 清空表单
        this.$refs['form'].resetFields()
        // 清空图片
        this.imageUrl = ''
        // 清空富文本框内容
        this.$refs.content.setContent('')
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
      this.blog.blogImage = res.data
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
