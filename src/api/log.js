import request from '@/utils/request'
var group_name = 'log'
export default {
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete'
    })
  },
  list(page) { // 分页查询关于日志
    return request({
      url: `/${group_name}/list`,
      method: 'post',
      data: page
    })
  },
  deleteByIds(logIds) { // 批量删除日志
    return request({
      url: `/${group_name}/delete`,
      method: 'delete',
      data: logIds
    })
  },
  exportExcel() { // 导出日志
    return request({
      url: `/${group_name}/export`,
      method: 'post',
      responseType: 'blob'
    })
  }
}
