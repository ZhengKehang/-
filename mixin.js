import {
	ui
} from '@/utils'

export default {
	methods: {
		goBack(delta = 1, isRefresh) {
			if (isRefresh) {
				let app = getApp();
				app.globalData.refreshNext = true
			}
			return new Promise((resolve, reject) => {
				uni.navigateBack({
					delta: delta,
					success() {
						resolve()
					},
					fail(error) {
						uni.switchTab({
							url: url,
						});
					}
				})
			})
		},
		goto(url, params, isRedirect = false) {
			url = ui.dealUrl(url, params)
			return new Promise(function(resolve, reject) {
				if (!isRedirect) {
					uni.navigateTo({
						url: url,
						success: function success() {
							resolve();
						},
						fail: function fail(error) {
							uni.switchTab({
								url: url,
								success() {},
								fail() {}
							});
						}
					});
				} else {
					uni.redirectTo({
						url: url,
						success: function success() {
							resolve();
						},
						fail: function fail() {
							uni.switchTab({
								url: url,
								success() {},
								fail() {}
							});
						}
					});
				}
			});
		}
	}
}
