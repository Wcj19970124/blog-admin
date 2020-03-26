import request from '@/utils/request'
var group_name = 'blog'
export default {
  add(blog) { // 添加博客
    return request({
      url: `/${group_name}/add`,
      method: 'post',
      data: blog
    })
  },
  getType(id) { // 根据id查询博客
    return request({
      url: `/${group_name}/getBlog/${id}`,
      method: 'get'
    })
  },
  update(blog) { // 更新博客
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: blog
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete'
    })
  },
  list(page) { // 分页查询博客列表
    return request({
      url: `/${group_name}/list`,
      method: 'post',
      data: page
    })
  }
}
