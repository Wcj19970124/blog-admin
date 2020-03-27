<template>
  <div style="margin:15px">
    <!-- 添加类型按钮 -->
    <el-button type="primary" size="mini" class="add-button" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
    <!-- 后台类型列表 -->
    <el-table :data="page.list" border style="width: 100%">
      <el-table-column prop="blogTitle" label="博客标题" show-overflow-tooltip />
      <el-table-column prop="blogImage" label="图片" width="120px">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.blogImage"
            style="width: 100px; height: 100px"
            :src="scope.row.blogImage"
            :preview-src-list="[scope.row.blogImage]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="博客类型" />
      <el-table-column prop="blogGoods" label="点赞数" width="100" />
      <el-table-column prop="blogRead" label="阅读数" width="100" />
      <el-table-column prop="blogCollection" label="收藏数" width="100" />
      <el-table-column prop="blogComment" label="评论数" width="100" />
      <el-table-column prop="createdTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column prop="blogSource" label="文章来源" />
      <el-table-column prop="blogRemark" label="备注" show-overflow-tooltip />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary" size="mini">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row.blogId)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.blogId)">删除</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加博客对话框 -->
    <el-dialog title="添加" :visible.sync="addDialog">
      <blog-add @closeAddDialog="closeAddDialog" @getBlogList="getBlogList" />
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
    <!-- 修改博客对话框 -->
    <el-dialog title="修改" :visible.sync="updateDialog">
      <blog-update :blog="blog" @getBlogList="getBlogList" @closeUpdateDialog="closeUpdateDialog" />
    </el-dialog>
  </div>
</template>

<script>
import blogApi from '@/api/blog'
import BlogAdd from './blog-add'
import BlogUpdate from './blog-update'
export default {
  components: {
    BlogAdd,
    BlogUpdate
  },
  data() {
    return {
      updateDialog: false, // 显示修改博客对话框变量
      addDialog: false, // 显示添加博客对话框的变量
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 每一页的博客数
        totalPage: 0, // 默认总页数
        totalCount: 0, // 博客总条数
        sortColumn: '', // 默认排序列为空
        sortMethod: 'asc', // 默认排序方式
        list: [], // 博客数据
        params: {} // 查询参数
      },
      blog: {}
    }
  },
  created() {
    this.getBlogList()
  },
  methods: {
    // 分页获取博客列表
    getBlogList(page) {
      blogApi.list(this.page).then(res => {
        this.page = res.data
      })
    },
    // 删除博客
    handleDelete(id) {
      this.$confirm('是否删除该博客?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        blogApi.delete(id).then(res => {
          this.$message.success('删除成功!')
          this.getBlogList()
        })
      })
    },
    // 获取修改博客的信息
    // 打开修改博客对话框
    handleEdit(id) {
      blogApi.getBlog(id).then(res => {
        this.blog = res.data
      })
      this.updateDialog = true
    },
    // 打开添加博客对话框
    openAddDialog() {
      this.addDialog = true
    },
    // 关闭添加博客对话框
    closeAddDialog() {
      this.addDialog = false
    },
    // 选择每页显示条数时触发
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getBlogList()
    },
    // 当前页变动时触发
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getBlogList()
    },
    // 关闭修改对话框
    closeUpdateDialog() {
      this.updateDialog = false
    }
  }
}
</script>
