<template>
  <div style="margin:15px">
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="page" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input v-model="page.params.username" placeholder="账号" clearable size="mini" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="page.params.name" placeholder="姓名" clearable size="mini" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="page.params.sex" placeholder="性别" clearable size="mini" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="page.params.nickname" placeholder="昵称" clearable size="mini" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="page.params.userEmail" placeholder="邮箱" clearable size="mini" />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="page.params.createdTime" placeholder="创建时间" clearable size="mini" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="getUserList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <!-- 添加类型按钮 -->
    <el-button type="primary" size="mini" class="add-button" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
    <!-- 重置密码按钮 -->
    <el-button type="primary" size="mini" class="add-button" icon="el-icon-refresh-right" @click="resetUserPwd">重置密码</el-button>
    <!-- 后台类型列表 -->
    <el-table :data="page.list" border style="width: 100%" @sort-change="changeSort" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="userId" label="编号" width="100" />
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="nickname" label="昵称" width="100" />
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="sex" label="性别" width="100" sortable="custom">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex ===1" type="success">男</el-tag>
          <el-tag v-else type="danger">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="header" label="头像" width="120px">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.header"
            style="width: 100px; height: 100px"
            :src="scope.row.header"
            :preview-src-list="[scope.row.header]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="userEmail" label="邮箱" />
      <el-table-column prop="createdTime" label="创建时间" sortable="custom" />
      <el-table-column prop="updateTime" label="更新时间" sortable="custom" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary" size="mini">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row.userId)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.userId)">删除</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加" :visible.sync="addDialog">
      <user-add @closeAddDialog="closeAddDialog" @getUserList="getUserList" />
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      :current-page="page.currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 修改用户对话框 -->
    <el-dialog title="修改" :visible.sync="updateDialog">
      <user-update :user="user" @getUserList="getUserList" @closeUpdateDialog="closeUpdateDialog" />
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api/myUser'
import UserAdd from './user-add'
import UserUpdate from './user-update'
export default {
  components: {
    UserAdd,
    UserUpdate
  },
  data() {
    return {
      readDialog: false, // 显示查看用户内容对话框的变量
      updateDialog: false, // 显示修改用户对话框变量
      addDialog: false, // 显示添加用户对话框的变量
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 每一页的用户数
        totalPage: 0, // 默认总页数
        totalCount: 0, // 用户总条数
        sortColumn: '', // 默认排序列为空
        sortMethod: 'asc', // 默认排序方式
        list: [], // 用户数据
        params: {} // 查询参数
      },
      user: {},
      selectUsers: [] // 存放选中的数据
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 分页获取用户列表
    getUserList(page) {
      userApi.list(this.page).then(res => {
        this.page = res.data
      })
    },
    // 删除用户
    handleDelete(id) {
      this.$confirm('是否删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        userApi.delete(id).then(res => {
          this.$message.success('删除成功!')
          this.getUserList()
        })
      })
    },
    // 获取修改用户的信息
    // 打开修改用户对话框
    handleEdit(id) {
      userApi.getUser(id).then(res => {
        this.user = res.data
        this.updateDialog = true
      })
    },
    // 查看用户内容
    handleSee(id) {
      userApi.getUser(id).then(res => {
        this.user = res.data
        this.readDialog = true
      })
    },
    // 获取选择的数据
    handleSelectionChange(val) {
      this.selectUsers = val
    },
    // 重置密码
    resetUserPwd() {
      const userIds = []
      this.selectUsers.forEach(e => {
        userIds.push(e.userId)
      })
      userApi.resetPwd(userIds).then(res => {
        this.$message.success(res.msg)
      })
    },
    // 打开添加用户对话框
    openAddDialog() {
      this.addDialog = true
    },
    // 关闭添加用户对话框
    closeAddDialog() {
      this.addDialog = false
    },
    // 选择每页显示条数时触发
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getUserList()
    },
    // 当前页变动时触发
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getUserList()
    },
    // 关闭修改对话框
    closeUpdateDialog() {
      this.updateDialog = false
    },
    // 按照点赞量等列排序
    changeSort(e) {
      console.log(e.order)
      this.page.sortColumn = e.prop
      if (e.order === null) {
        this.page.sortMethod = 'asc'
      } else {
        this.page.sortMethod = e.order
      }
      this.getUserList()
    }
  }
}
</script>
