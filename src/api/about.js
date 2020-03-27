import request from '@/utils/request'
var group_name = 'about'
export default {
  add(about) { // 添加关于我的
    return request({
      url: `/${group_name}/add`,
      method: 'post',
      data: about
    })
  },
  getAbout(id) { // 根据id查询关于我的
    return request({
      url: `/${group_name}/getAbout/${id}`,
      method: 'get'
    })
  },
  update(about) { // 更新关于我的
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: about
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete'
    })
  },
  list(page) { // 分页查询关于我的列表
    return request({
      url: `/${group_name}/list`,
      method: 'post',
      data: page
    })
  },
  enable(id) { // 启用关于我的
    return request({
      url: `/${group_name}/enable/${id}`,
      method: 'put'
    })
  },
  disable(id) { // 弃用关于我的
    return request({
      url: `/${group_name}/disable/${id}`,
      method: 'put'
    })
  }
}
