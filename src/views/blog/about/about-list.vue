<template>
  <div style="margin:15px">
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="page" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="page.params.aboutTitle" placeholder="关于我的标题" clearable size="mini" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="getAboutList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <!-- 添加类型按钮 -->
    <el-button type="primary" size="mini" class="add-button" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
    <!-- 后台类型列表 -->
    <el-table :data="page.list" border style="width: 100%" @sort-change="changeSort">
      <el-table-column prop="aboutId" label="编号" show-overflow-tooltip />
      <el-table-column prop="aboutTitle" label="标题" show-overflow-tooltip />
      <el-table-column prop="aboutRead" label="阅读数" width="100" sortable="custom" />
      <el-table-column prop="createdTime" label="创建时间" sortable="custom" />
      <el-table-column prop="updateTime" label="更新时间" sortable="custom" />
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
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row.aboutId)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.aboutId)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-if="scope.row.enable === 0" icon="el-icon-circle-check" size="mini" type="success" @click="enable(scope.row.aboutId)">启用</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-if="scope.row.enable === 1" icon="el-icon-circle-close" size="mini" type="warning" @click="disable(scope.row.aboutId)">弃用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加关于我的对话框 -->
    <el-dialog title="添加" :visible.sync="addDialog">
      <about-add @closeAddDialog="closeAddDialog" @getAboutList="getAboutList" />
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
    <!-- 修改关于我的对话框 -->
    <el-dialog title="修改" :visible.sync="updateDialog">
      <about-update :about="about" @getAboutList="getAboutList" @closeUpdateDialog="closeUpdateDialog" />
    </el-dialog>
  </div>
</template>

<script>
import aboutApi from '@/api/about'
import AboutAdd from './about-add'
import AboutUpdate from './about-update'
export default {
  components: {
    AboutAdd,
    AboutUpdate
  },
  data() {
    return {
      updateDialog: false, // 显示修改关于我的对话框变量
      addDialog: false, // 显示添加关于我的对话框的变量
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 每一页的关于我的条数
        totalPage: 0, // 默认总页数
        totalCount: 0, // 关于我的总条数
        sortColumn: '', // 默认排序列为空
        sortMethod: 'asc', // 默认排序方式
        list: [], // 关于我的数据
        params: {} // 查询参数
      },
      about: {}
    }
  },
  created() {
    this.getAboutList()
  },
  methods: {
    // 分页获取关于我的列表
    getAboutList(page) {
      aboutApi.list(this.page).then(res => {
        this.page = res.data
      })
    },
    // 删除关于我的
    handleDelete(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        aboutApi.delete(id).then(res => {
          this.$message.success('删除成功!')
          this.getAboutList()
        })
      })
    },
    // 获取修改关于我的的信息
    // 打开修改关于我的对话框
    handleEdit(id) {
      aboutApi.getAbout(id).then(res => {
        this.about = res.data
        this.updateDialog = true
      })
    },
    // 启用
    enable(id) {
      this.$confirm('是否启用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        aboutApi.enable(id).then(res => {
          this.$message.success(res.msg)
          this.getAboutList()
        })
      })
    },
    // 弃用
    disable(id) {
      this.$confirm('是否启用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        aboutApi.disable(id).then(res => {
          this.$message.success(res.msg)
          this.getAboutList()
        })
      })
    },
    // 打开添加关于我的对话框
    openAddDialog() {
      this.addDialog = true
    },
    // 关闭添加关于我的对话框
    closeAddDialog() {
      this.addDialog = false
    },
    // 选择每页显示条数时触发
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getAboutList()
    },
    // 当前页变动时触发
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getAboutList()
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
      this.getAboutList()
    }
  }
}
</script>
