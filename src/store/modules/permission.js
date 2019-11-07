import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRouters: [],
  userStatus: false
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRouters = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_STATUS: (state, status) => {
    state.userStatus = status
  }
}
const actions = {
  generateRoutes({ commit }, data) {
    return new Promise(resolve => {
      let accessedRoutes = []
      const { roles } = data
      if (roles.indexOf('supperAdmin') >= 0) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_STATUS', true)
      resolve(accessedRoutes)
    })
  },
  resetUserStatus({ commit }, data) {
    commit('SET_STATUS', false)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
