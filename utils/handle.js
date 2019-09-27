let pre,stopShakeInv;
import ui from "./ui"
export default {
	getParamsFromCode(query, url, keys) {
		let returnParams = {};
		if (query.q||url) {
			if (!url) {
				url = decodeURIComponent(query.q)
			}
			let params = url.split('?')
			if (params.length > 1) {
				let queries = params[1].split('&')
				queries.forEach(q => {
					let [key, value] = q.split('=')
					returnParams[key] = value
				})
			}
		} else if (query.scene) {
			url = decodeURIComponent(query.scene)
			let values = url.split(',');
			keys.forEach((key, index) => {
				returnParams[key] = values[index];
			})
		}
	
		return returnParams;
	},
	async scanCode(keys) {
		let app = getApp();
		let that = this;
		uni.scanCode({
			success(e) {
				console.log(e);
				app.globalData.refreshNext = true;
				app.globalData.refreshLinkList = true;
				if (e.scanType=='QR_CODE') {
					let url = e.result;
					let params = that.getParamsFromCode('', url);
					return params;
					// if (params.type) {
					// 	params.isScode = true;
					// 	ui.goto(params.type, params)
					// 	return true;
					// } else {
					// 	ui.toast('链接有误')
					// }
				} else if (e.scanType=='WX_CODE') {
					uni.navigateTo({
						url:`/${e.path}`
					})
				}
			},
			fail(e) {
				console.log('fail', e)
			}
		})
	},
  async stopDoubleTap(callback) {
  	let isStop = this.checkStop();
  	!isStop&&callback();
  },
  checkStop(callback) {
  	let isStop = true
  	let now = new Date().getTime()
  	if (pre) {
  		let distance = now - pre
  		if (distance > 800) {
  			isStop = false
  		}
  	} else {
  		isStop = false
  	}
  	pre = now;
		!isStop&&callback&&callback();
  },
  
   /**函数防抖
    *
    */
   stopShake(callback){
     clearTimeout(stopShakeInv);
     stopShakeInv = setTimeout(()=>{
       callback();
     },300)
   },
  getDataToClipboard(data){
    uni.setClipboardData({
      data:data,
      success(){
        wx.getClipboardData({
          success (res) {
            ui.toast("成功复制下载链接");
          },
          fail(){
            ui.toast("复制失败");
          }
        })
      },
      fail(){
        ui.toast("复制失败");
      }
    })
  }
}
