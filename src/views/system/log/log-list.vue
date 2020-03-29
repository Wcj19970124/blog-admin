<template>
  <div style="margin:15px">
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="page" class="demo-form-inline">
      <el-form-item label="请求路径">
        <el-input v-model="page.params.logUrl" placeholder="请求路径" clearable size="mini" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="page.params.logStatus" placeholder="状态" clearable size="mini">
          <el-option label="正常" value="1" />
          <el-option label="异常" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item v-model="page.params.logMethod" label="请求方式">
        <el-select v-model="page.params.logMethod" placeholder="请求方式" clearable size="mini">
          <el-option label="GET" value="GET" />
          <el-option label="POST" value="POST" />
          <el-option label="PUT" value="put" />
          <el-option label="DELETE" value="delete" />
        </el-select>
      </el-form-item>
      <el-form-item label="请求Ip">
        <el-input v-model="page.params.logIp" placeholder="请求Ip" clearable size="mini" />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="page.params.createdTime" placeholder="创建时间" clearable size="mini" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getLogList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <!-- 批量删除按钮 -->
    <el-button type="danger" size="mini" class="add-button" icon="el-icon-delete" @click="deleteByIdList">批量删除</el-button>
    <el-button type="primary" size="mini" class="add-button" icon="el-icon-download" @click="exportLog">全部导出</el-button>
    <!-- 日志列表 -->
    <el-table
      :data="page.list"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="changeSort"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="logId" label="编号" />
      <el-table-column prop="logUrl" label="请求路径" sortable="custom" />
      <el-table-column prop="logParams" label="参数" show-overflow-tooltip />
      <el-table-column prop="logStatus" label="状态" sortable="custom">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.logStatus ===1" type="success">正常</el-tag>
          <el-tag v-else type="danger">异常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="logMessage" label="异常信息" show-overflow-tooltip />
      <el-table-column prop="logMethod" label="请求方式" sortable="custom" />
      <el-table-column prop="logTime" label="请求时间" sortable="custom" />
      <!-- <el-table-column prop="logResult" label="返回值" show-overflow-tooltip /> -->
      <el-table-column prop="logIp" label="请求Ip" />
      <el-table-column prop="createdTime" label="创建时间" sortable="custom" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.logId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
import logApi from '@/api/log'
export default {
  data() {
    return {
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
      selectLogs: []
    }
  },
  created() {
    this.getLogList()
  },
  methods: {
    // 获取日志列表
    getLogList() {
      this.page.list = null
      logApi.list(this.page).then(res => {
        this.page = res.data
      })
    },
    // 根据id删除日志
    handleDelete(id) {
      this.$confirm('是否删除该日志?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        logApi.delete(id).then(res => {
          this.$message.success(res.msg)
          this.getLogList()
        })
      })
    },
    // 选择每页显示条数时触发
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getLogList()
    },
    // 当前页变动时触发
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getLogList()
    },
    // 获取选择的数据
    handleSelectionChange(val) {
      this.selectLogs = val
    },
    // 批量删除
    deleteByIdList() {
      const logIds = []
      this.selectLogs.forEach(e => {
        logIds.push(e.logId)
      })
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        logApi.deleteByIds(logIds).then(res => {
          this.$message.success(res.msg)
          this.getLogList()
        })
      })
    },
    // 按照点赞量等列排序
    changeSort(e) {
      this.page.sortColumn = e.prop
      if (e.order === null) {
        this.page.sortMethod = 'asc'
      } else {
        this.page.sortMethod = e.order
      }
      this.getLogList()
    },
    // 日志的导出
    exportLog() {
      logApi.exportExcel().then(res => {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
        const elink = document.createElement('a')
        elink.download = '系统日志.xlsx'
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      })
    }
  }
}
</script>
