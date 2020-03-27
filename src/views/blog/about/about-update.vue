<template>
  <div>
    <el-form ref="form" :model="about" label-width="80px" size="mini">
      <el-form-item label="标题" prop="aboutTitle">
        <el-input v-model="about.aboutTitle" />
      </el-form-item>
      <el-form-item label="内容" prop="aboutContent">
        <tinymce :id="about.aboutId" v-model="about.aboutContent" />
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
  props: {
    about: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods: {
    onSubmit() {
      // 更新关于我的
      aboutApi.update(this.about).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeUpdateDialog')
        this.$emit('getAboutList')
      })
    },
    // 关闭对话框
    closeDialog() {
      this.$emit('closeUpdateDialog')
    }
  }
}
</script>
