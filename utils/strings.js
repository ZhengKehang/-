export default {
  isEmpty (str) {
    return !str
  },
  trim (str) {
    return str.replace(/(^\s+|\s+$)/g, '')
  },
  isBlank (str) {
    return !str || /^\s*$/.test(str)
  },
  isPhone(str){
    return /^1[345678]\d{9}$/.test(str)
  },
	isIdCard(str){
		return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
	}
}
