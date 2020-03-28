import request from '@/utils/request'
var group_name = 'user'
export default {
  add(user) { // 添加用户
    return request({
      url: `/${group_name}/add`,
      method: 'post',
      data: user
    })
  },
  getUser(id) { // 根据id查询用户
    return request({
      url: `/${group_name}/getUser/${id}`,
      method: 'get'
    })
  },
  update(user) { // 更新用户
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: user
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete'
    })
  },
  list(page) { // 分页查询用户列表
    return request({
      url: `/${group_name}/list`,
      method: 'post',
      data: page
    })
  },
  resetPwd(userIds) {
    return request({
      url: `/${group_name}/resetPwd`,
      method: 'put',
      data: userIds
    })
  }
}
