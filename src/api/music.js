import request from '@/utils/request'
var group_name = 'music'
export default {
  add(music) { // 添加音乐
    return request({
      url: `/${group_name}/add`,
      method: 'post',
      data: music
    })
  },
  getMusic(id) { // 根据id查询音乐
    return request({
      url: `/${group_name}/getMusic/${id}`,
      method: 'get'
    })
  },
  update(music) { // 更新音乐
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: music
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete'
    })
  },
  list(page) { // 分页查询音乐列表
    return request({
      url: `/${group_name}/list`,
      method: 'post',
      data: page
    })
  },
  enable(id) { // 启用音乐
    return request({
      url: `/${group_name}/enable/${id}`,
      method: 'put'
    })
  },
  disable(id) { // 弃用音乐
    return request({
      url: `/${group_name}/disable/${id}`,
      method: 'put'
    })
  }
}
