<template>
  <div>
    <el-form ref="form" :model="about" label-width="80px" size="mini">
      <el-form-item label="标题" prop="aboutTitle">
        <el-input v-model="about.aboutTitle" />
      </el-form-item>
      <el-form-item label="内容" prop="aboutContent">
        <tinymce ref="content" v-model="about.aboutContent" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import aboutApi from '@/api/about'
import Tinymce from '@/components/Tinymce/index'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      about: {}
    }
  },
  methods: {
    onSubmit() {
      // 保存关于我的
      aboutApi.add(this.about).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeAddDialog')
        this.$emit('getAboutList')
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
      this.about.aboutImage = res.data
    }
  }
}
</script>
