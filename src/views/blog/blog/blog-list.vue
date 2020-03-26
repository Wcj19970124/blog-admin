<template>
  <div style="margin:15px">
    <!-- 添加类型按钮 -->
    <el-button type="primary" size="mini" class="add-button" @click="openAddDrawer">添加</el-button>
    <!-- 后台类型列表 -->
    <el-table :data="page.list" border style="width: 100%">
      <el-table-column prop="blogTitle" label="博客标题" show-overflow-tooltip />
      <el-table-column prop="blogImage" label="图片" />
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
                <el-button size="mini" type="primary" @click="handleEdit(scope.row.typeId)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.typeId)">删除</el-button>
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
import blogApi from '@/api/blog'
export default {
  data() {
    return {
      page: {
        currentPage: 1, // 当前页码
        pageSize: 20, // 每一页的博客数
        totalPage: 0, // 默认总页数
        totalCount: 0, // 博客总条数
        sortColumn: '', // 默认排序列为空
        sortMethod: 'asc', // 默认排序方式
        list: [], // 博客数据
        params: {} // 查询参数
      }
    }
  },
  created() {
    this.getBlogList()
  },
  methods: {
    getBlogList(page) {
      blogApi.list(this.page).then(res => {
        this.page = res.data
      })
    }
  }

}
</script>
