<template>
  <div style="margin:15px">
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="page" class="demo-form-inline">
      <el-form-item label="歌曲名">
        <el-input v-model="page.params.name" placeholder="歌曲名" clearable size="mini" />
      </el-form-item>
      <el-form-item label="歌手">
        <el-input v-model="page.params.artist" placeholder="歌手" clearable size="mini" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="page.params.enabled" placeholder="状态" size="mini" clearable filterable>
          <el-option label="启用" value="1" />
          <el-option label="弃用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="page.params.createdTime" placeholder="创建时间" clearable size="mini" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="getMusicList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <!-- 添加类型按钮和音乐播放器 -->
    <div id="pocket">
      <el-button type="primary" size="mini" class="add-button" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
      <audio :src="musicUrl" autoplay="autoplay" controls="controls" class="audioPlay" />
    </div>
    <!-- 后台类型列表 -->
    <el-table :data="page.list" border style="width: 100%" @sort-change="changeSort">
      <el-table-column prop="id" label="编号" width="100px" />
      <el-table-column prop="name" label="歌曲名" />
      <el-table-column prop="artist" label="歌手" />
      <el-table-column prop="cover" label="封面" width="120px">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.cover"
            style="width: 100px; height: 100px"
            :src="scope.row.cover"
            :preview-src-list="[scope.row.cover]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="url" label="歌曲链接" />
      <el-table-column prop="enable" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enabled === 1" type="success">启用</el-tag>
          <el-tag v-else type="info">弃用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary" size="mini">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" icon="el-icon-headset" @click="ListenMusic(scope.row.url)">试听</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="info" icon="el-icon-reading" @click="handleSee(scope.row.id)">查看</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-if="scope.row.enabled === 0" icon="el-icon-circle-check" size="mini" type="success" @click="enable(scope.row.id)">启用</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-if="scope.row.enabled === 1" icon="el-icon-circle-close" size="mini" type="warning" @click="disable(scope.row.id)">弃用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看音乐对话框 -->
    <el-dialog title="查看" :visible.sync="readDialog">
      <div v-html="music.lrc" />
    </el-dialog>
    <!-- 添加音乐对话框 -->
    <el-dialog title="添加" :visible.sync="addDialog">
      <music-add @closeAddDialog="closeAddDialog" @getMusicList="getMusicList" />
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
    <!-- 修改音乐对话框 -->
    <el-dialog title="修改" :visible.sync="updateDialog">
      <music-update :music="music" @getMusicList="getMusicList" @closeUpdateDialog="closeUpdateDialog" />
    </el-dialog>
  </div>
</template>

<script>
import musicApi from '@/api/music'
import MusicAdd from './music-add'
import MusicUpdate from './music-update'
export default {
  components: {
    MusicAdd,
    MusicUpdate
  },
  data() {
    return {
      musicUrl: '', // 音乐试听的url
      readDialog: false, // 显示查看音乐内容对话框的变量
      updateDialog: false, // 显示修改音乐对话框变量
      addDialog: false, // 显示添加音乐对话框的变量
      page: {
        currentPage: 1, // 当前页码
        pageSize: 5, // 每一页的音乐数
        totalPage: 0, // 默认总页数
        totalCount: 0, // 音乐总条数
        sortColumn: '', // 默认排序列为空
        sortMethod: 'asc', // 默认排序方式
        list: [], // 音乐数据
        params: {} // 查询参数
      },
      music: {}
    }
  },
  created() {
    this.getMusicList()
  },
  methods: {
    // 分页获取音乐列表
    getMusicList(page) {
      musicApi.list(this.page).then(res => {
        this.page = res.data
      })
    },
    // 删除音乐
    handleDelete(id) {
      this.$confirm('是否删除该音乐?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        musicApi.delete(id).then(res => {
          this.$message.success('删除成功!')
          this.getMusicList()
        })
      })
    },
    // 获取修改音乐的信息
    // 打开修改音乐对话框
    handleEdit(id) {
      musicApi.getMusic(id).then(res => {
        this.music = res.data
        this.updateDialog = true
      })
    },
    // 查看音乐内容
    handleSee(id) {
      musicApi.getMusic(id).then(res => {
        this.music = res.data
        this.readDialog = true
      })
    },
    // 启用
    enable(id) {
      this.$confirm('是否启用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        musicApi.enable(id).then(res => {
          this.$message.success(res.msg)
          this.getMusicList()
        })
      })
    },
    // 弃用
    disable(id) {
      this.$confirm('是否启用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        musicApi.disable(id).then(res => {
          this.$message.success(res.msg)
          this.getMusicList()
        })
      })
    },
    // 试听音乐
    ListenMusic(url) {
      this.musicUrl = url
    },
    // 打开添加音乐对话框
    openAddDialog() {
      this.addDialog = true
    },
    // 关闭添加音乐对话框
    closeAddDialog() {
      this.addDialog = false
    },
    // 选择每页显示条数时触发
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getMusicList()
    },
    // 当前页变动时触发
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getMusicList()
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
      this.getMusicList()
    }
  }
}
</script>
<style>
#pocket{
position: relative;
}
.audioPlay {
  position: absolute;
  width: 350px;
  height: 35px;
  top: -3px;
  right: 10px;
  outline: none;
}
</style>
