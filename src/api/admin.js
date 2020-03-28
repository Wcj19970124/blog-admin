import request from '@/utils/request'
var group_name = 'admin'
export default {
  getInfo(admin) { // 获取管理员信息
    return request({
      url: `/${group_name}/getInfo`,
      method: 'get'
    })
  },
  updatePwd(admin) { // 修改管理员密码
    return request({
      url: `/${group_name}/updatePwd`,
      method: 'put',
      data: admin
    })
  },
  update(admin) { // 修改管理员信息
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: admin
    })
  }
}
