export default {
  // 存入
  set (key, value, async = false) {
    if (async) {
      uni.setStorage({
        key : key,
        data: value
      })
    } else {
      uni.setStorageSync(key, value)
    }
  },

  // 获取
  get (key, async = false) {
    if (async) {
      return new Promise(resolve => {
        uni.getStorage({
          key: key,
          success (res) {
            resolve(res.data)
          }
        })
      })
    } else {
      return uni.getStorageSync(key)
    }
  },

  // 删除
  remove (key, async = false) {
    if (async) {
      return new Promise(resolve => {
        uni.removeStorage({
          key: key,
          success (res) {
            resolve(res.data)
          }
        })
      })
    } else {
      uni.removeStorageSync(key)
    }
  }

}
