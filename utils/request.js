import {
	uri,
	key,
	define
} from '@/const'
import storage from '@/utils/storage'
let isShowLoading = false;
let loadingInv = -1;
export default {
	_request(url, method = 'GET', params, times = 0) {
		let self = this
		clearTimeout(loadingInv);
		if (!isShowLoading) {
			uni.showLoading({
				title: '加载中'
			});
			isShowLoading = true;
		}
		return new Promise((resolve, reject) => {
			!params && (params = {})
			let success = function success(rtn) {
				if (rtn.data.code==-1) {
					uni.hideLoading();
					isShowLoading = false;
				} else {
					loadingInv = setTimeout(() => {
						uni.hideLoading();
						isShowLoading = false;
					}, 300);
				}
				resolve(rtn)

			}
			let fail = function fail(rtn) {
				times++
				console.log('times', times)
				if (times > 2) {
					uni.hideLoading()
					reject(rtn)
				} else {
					self.unirequest(url, params, method, success, fail)
				}
			}
			self.unirequest(url, params, method, success, fail)
		})
	},

	unirequest(url, params, method, success, fail) {
		let auth = storage.get(key.TOKEN);
		let uniRequestQuery = {
			url: uri.api + url,
			data: params,
			type: 'json',
			method: method.toUpperCase(),
			header: {
				'content-Type': 'application/json',
				'AUTHORIZATION': auth
			}
		}
		uniRequestQuery.success = success
		uniRequestQuery.fail = fail
		uni.request(uniRequestQuery)
	},
	//
	api(url, params, method = 'GET') {
		return this._request(url, method, params)
	}
}
