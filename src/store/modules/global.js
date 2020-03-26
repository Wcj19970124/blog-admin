// 声明一个全局的变量
const state = {
  typeListL: []
}

const mutations = {
  // 相当于一个get方法，获取了typeList这个变量注入到SET_TYPE中
  SET_TYPE: (state, typeListL) => {
    state.typeListL = typeListL
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

