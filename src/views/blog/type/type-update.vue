<template>
  <div>
    <el-form ref="form" :model="type" label-width="80px">
      <el-form-item label="类型名称">
        <el-input v-model="type.typeName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import typeApi from '@/api/type'
export default {
  props: {
    type: {
      type: Object,
      default: null
    }
  },
  methods: {
    onSubmit() {
      typeApi.update(this.type).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeUpdateDrawer')
        this.$emit('getTypeList')
      })
    },
    closeDialog() {
      this.$emit('closeUpdateDrawer')
    }
  }
}
</script>
