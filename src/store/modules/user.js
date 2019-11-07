import { login, logout } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from '..'
// import store from './store'

const state = {
  token: sessionStorage.getItem('Authorization'),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // var userTest = sessionStorage.getItem('user')
  // this.user2 = JSON.parse(userTest)
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve) => {
      var userTest = sessionStorage.getItem('user')
      var user2 = JSON.parse(userTest)
      commit('SET_NAME', user2.name)
      commit('SET_ROLES', user2.role)
      // commit('SET_AVATAR', user2.)
      resolve(user2)
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }

      //   const { name, avatar } = data

      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        store.dispatch('permission/resetUserStatus')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

