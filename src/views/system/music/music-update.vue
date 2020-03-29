<template>
  <div>
    <el-form ref="form" :model="music" label-width="80px" size="mini">
      <el-form-item label="歌曲名" prop="name">
        <el-input v-model="music.name" />
      </el-form-item>
      <el-form-item label="歌手" prop="artist">
        <el-input v-model="music.artist" />
      </el-form-item>
      <el-form-item label="封面" prop="cover">
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
      <el-form-item label="歌曲文件" prop="url">
        <el-upload :action="uploadUrl" :limit="1" :headers="headers" :file-list="fileList" :on-success="uploadMusicSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="歌词" prop="lrc">
        <el-input v-model="music.lrc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import musicApi from '@/api/music'
import { getToken } from '../../../utils/auth'
export default {
  props: {
    music: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      headers: {
        // 上传图片的请求头
        Authorization: getToken()
      },
      imageUrl: this.music.cover, // 图片回显地址
      uploadUrl: process.env.VUE_APP_UPLOAD_URL, // 上传图片接口路径
      fileList: [] // 歌曲文件的文件数组
    }
  },
  // 监听图片的改变
  watch: {
    'music.cover': function(newVal, oldVal) {
      this.imageUrl = newVal
    },
    'music.url': function(newVal, oldVal) {
      this.fileList = [
        { name: this.music.name,
          url: this.music.url
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      // 更新音乐
      musicApi.update(this.music).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeUpdateDialog')
        this.$emit('getMusicList')
      })
    },
    // 关闭对话框
    closeDialog() {
      this.$emit('closeUpdateDialog')
    },
    // 上传文件成功获取其上传路径
    handleAvatarSuccess(res, file) {
      this.$message.success(res.msg)
      this.imageUrl = res.data
      this.music.cover = res.data
    },
    // 歌曲文件上传成功回调
    uploadMusicSuccess(res, fileList) {
      this.$message.success(res.msg)
      this.music.url = res.data
      this.fileList.name = fileList.name
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
