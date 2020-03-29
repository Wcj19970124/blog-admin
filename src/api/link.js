import request from '@/utils/request'
var group_name = 'link'
export default {
  add(link) { // 添加友情链接
    return request({
      url: `/${group_name}/add`,
      method: 'post',
      data: link
    })
  },
  getLink(id) { // 根据id查询友情链接
    return request({
      url: `/${group_name}/getLink/${id}`,
      method: 'get'
    })
  },
  update(link) { // 更新友情链接
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: link
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete'
    })
  },
  list() { // 查询友情链接列表
    return request({
      url: `/${group_name}/list`,
      method: 'get'
    })
  }
}
