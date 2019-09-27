export default {
	isEmpty(obj) {
		return !this.isArray(obj) || obj.length == 0;
	},
	isNotEmpty(obj) {
		return this.isArray(obj) && obj.length > 0;
	},

	isIn(array, obj) {
		return this.isArray(array) && this.isNotEmpty(array.filter(a => a == obj));
	},

	search(array, regex) {
		if (this.isArray(array)) {
			return array.filter(a => regex.test(a));
		} else {
			return [];
		}
	},
	// 用来生成座位
	getSeatArr(row=7,colomn=10,content=1) {
		let arr = [],twoArr = [];
		for (let i = 0; i < colomn; i++) {
			arr.push(content);
		}
		for (let i = 0; i < row; i++) {
			twoArr.push(arr);
		}
		return twoArr;
	}
}
