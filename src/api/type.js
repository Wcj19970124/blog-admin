import request from '@/utils/request'
var group_name = 'type'
export default {
  add(type) { // 添加类型
    return request({
      url: `/${group_name}/add`,
      method: 'post',
      data: type
    })
  },
  listFront() { // 前台查询
    return request({
      url: `/${group_name}/listFront`,
      method: 'get'
    })
  },
  listBack() {
    return request({ // 后台查询
      url: `/${group_name}/listBack`,
      method: 'get'
    })
  },
  getType(id) { // 根据id查询分类
    return request({
      url: `/${group_name}/getType/${id}`,
      method: 'get'
    })
  },
  update(type) { // 更新类型
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: type
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete'
    })
  },
  disable(id) { // 根据id弃用
    return request({
      url: `/${group_name}/disable/${id}`,
      method: 'put'
    })
  },
  enable(id) {
    return request({
      url: `/${group_name}/enable/${id}`,
      method: 'put'
    })
  }
}
