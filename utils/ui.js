import {arrange} from '@/const'
export default {
  // 显示提示信息
  toast (content = '', icon = 'none', duration = 1500) {
    uni.showToast({
      title   : content,
      icon    : icon,
      duration: duration
    })
  },

  // 加载，第一个参数控制是否显示
  loading (content = '', mask = true) {
    if (content != false) {
      uni.showLoading({
        title: content,
        mask : mask
      })
    } else {
      uni.hideLoading()
    }
  },

  alert (content = '', title = '提示', btns) {
    return new Promise((resolve, reject) => {
      let {ok, cancel} = {...{ok: '确定', cancel: ''}, ...btns}
      let params       = {
        title      : title,
        content    : content,
        success(resp){
          if(resp.confirm){
            resolve();
          }else{
            reject();
          }

        },
        fail(){
          reject();
        },
        showCancel : !!cancel,
        cancelText : cancel,
        confirmText: ok,
      }
      uni.showModal(params)
    })
  },

  /**
   * 弹出菜单
   * @param items
   * @param context
   */
  actionSheet (items, context = this) {
    if (!items) {
      return
    }
    let {keys, values} = Object

    uni.showActionSheet({
      itemList: keys(items),
      success (res) {
        let funcs = values(items)
        funcs[res.tapIndex].call(context)
      }
    })
  },
  dealUrl(url,params){
		url = arrange.URL_ARRANGE[url]
		if (params) {
		  if (!/\?/.test(url)) {
		    url += '?_t=' + new Date().getTime();
		  }
		
		  for (var i in params) {
		    if (params[i] instanceof Object) {
		      params[i] = JSON.stringify(params[i]);
		    }
		    url += '&' + i + '=' + params[i];
		  }
		}
    return url
  },
  closeAllTo(url,params){
    this.dealUrl(url,params)
    uni.reLaunch({
      url:url,
      success(){
      },
      fail(){
      }
    })
  }
}
