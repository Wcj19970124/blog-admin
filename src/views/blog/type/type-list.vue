<template>
  <div style="margin:15px">
    <!-- 添加类型按钮 -->
    <el-button type="primary" size="mini" class="add-button" icon="el-icon-plus" @click="openAddDrawer">添加</el-button>
    <!-- 后台类型列表 -->
    <el-table :data="typeList" border style="width: 100%">
      <el-table-column prop="typeId" label="编号" />
      <el-table-column prop="typeName" label="类型名称" />
      <el-table-column prop="typeBlogCount" label="博客数" />
      <el-table-column prop="enable" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enable === 1" type="success">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary" size="mini">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row.typeId)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.typeId)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-if="scope.row.enable === 0" icon="el-icon-circle-check" size="mini" type="success" @click="enable(scope.row.typeId)">启用</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-if="scope.row.enable === 1" icon="el-icon-circle-close" size="mini" type="warning" @click="disable(scope.row.typeId)">弃用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加类型抽屉 -->
    <el-drawer title="添加类型" :visible.sync="drawer">
      <type-add @closeAddDrawer="closeAddDrawer" @getTypeList="getTypeList" />
    </el-drawer>
    <!-- 修改类型弹框 -->
    <el-dialog title="编辑" :visible.sync="updateDrawer">
      <type-update :type="type" @closeUpdateDrawer="closeUpdateDrawer" @getTypeList="getTypeList" />
    </el-dialog>
  </div>
</template>

<script>
import typeApi from '@/api/type'
import TypeAdd from './type-add'
import TypeUpdate from './type-update'
export default {
  components: {
    TypeAdd,
    TypeUpdate
  },
  data() {
    return {
      updateDrawer: false, // 显示修改弹框变量
      type: {}, // 分类
      drawer: false, // 显示添加抽屉变量
      typeList: [] // 类型数组
    }
  },
  created() {
    this.getTypeList()
  },
  methods: {
    getTypeList() {
      // 获取后台类型列表
      typeApi.listBack().then(res => {
        this.typeList = res.data
      })
    },
    handleEdit(id) {
      // 修改类型
      typeApi.getType(id).then(res => {
        this.type = res.data
        this.updateDrawer = true
      })
    },
    handleDelete(id) {
      // 删除类型
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        typeApi.delete(id).then(res => {
          this.$message.success('删除成功!')
          this.getTypeList()
        })
      })
    },
    // 启用类型
    enable(id) {
      this.$confirm('是否启用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        typeApi.enable(id).then(res => {
          this.$message.success(res.msg)
          this.getTypeList()
        })
      })
    },
    // 弃用类型
    disable(id) {
      this.$confirm('是否启用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        typeApi.disable(id).then(res => {
          this.$message.success(res.msg)
          this.getTypeList()
        })
      })
    },
    // 打开添加抽屉
    openAddDrawer() {
      this.drawer = true
    },
    // 关闭抽屉
    closeAddDrawer() {
      this.drawer = false
    },
    // 关闭修改弹框
    closeUpdateDrawer() {
      this.updateDrawer = false
    }
  }
}
</script>
