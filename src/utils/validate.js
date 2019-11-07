/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
// 组件测试：
// exports.install = (Vue, options) => {
//   Vue.prototype.validator = {
//     lanenoTransf(val) { return val.substr(2, 1) === '1' ? '出口' : '入口' }
//   }
// }
