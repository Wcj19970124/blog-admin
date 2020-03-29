<template>
  <div style="margin:15px">
    <!-- 添加类型按钮 -->
    <el-button type="primary" size="mini" class="add-button" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
    <!-- 后台类型列表 -->
    <el-table :data="linkList" border style="width: 100%">
      <el-table-column prop="linkId" label="编号" width="100px" />
      <el-table-column prop="linkName" label="链接名" />
      <el-table-column prop="linkUrl" label="链接地址" />
      <el-table-column prop="createdTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary" size="mini">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row.linkId)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.linkId)">删除</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加类型抽屉 -->
    <el-drawer title="添加" :visible.sync="addDialog">
      <link-add @closeAddDialog="closeAddDialog" @getLinkList="getLinkList" />
    </el-drawer>
    <!-- 修改友情链接对话框 -->
    <el-drawer title="修改" :visible.sync="updateDialog">
      <link-update :link="link" @getLinkList="getLinkList" @closeUpdateDialog="closeUpdateDialog" />
    </el-drawer>
  </div>
</template>

<script>
import linkApi from '@/api/link'
import LinkAdd from './link-add'
import LinkUpdate from './link-update'
export default {
  components: {
    LinkAdd,
    LinkUpdate
  },
  data() {
    return {
      updateDialog: false, // 显示修改友情链接对话框变量
      addDialog: false, // 显示添加友情链接对话框的变量
      linkList: [],
      link: {}
    }
  },
  created() {
    this.getLinkList()
  },
  methods: {
    // 分页获取友情链接列表
    getLinkList() {
      linkApi.list().then(res => {
        this.linkList = res.data
      })
    },
    // 删除友情链接
    handleDelete(id) {
      this.$confirm('是否删除该友情链接?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        linkApi.delete(id).then(res => {
          this.$message.success(res.msg)
          this.getLinkList()
        })
      })
    },
    // 获取修改友情链接的信息
    // 打开修改友情链接对话框
    handleEdit(id) {
      linkApi.getLink(id).then(res => {
        this.link = res.data
        this.updateDialog = true
      })
    },
    // 打开添加友情链接对话框
    openAddDialog() {
      this.addDialog = true
    },
    // 关闭添加友情链接对话框
    closeAddDialog() {
      this.addDialog = false
    },
    // 关闭修改对话框
    closeUpdateDialog() {
      this.updateDialog = false
    }
  }
}
</script>
