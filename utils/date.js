export default {
	FORMAT: {
		CN: {
			YMDHMS: 'yyyy-MM-dd hh:mm:ss',
			YMD: 'yyyy-MM-dd'
		},
		EN: {
			YMDHMS: 'MM-dd-yyyy hh:mm:ss',
			YMD: 'MM-dd-yyyy'
		},
	},
	format(date, fmt) {
		if (fmt == null || fmt === undefined || fmt.length === 0) {
			fmt = this.FORMAT.CN.YMDHMS;
		}
		if(typeof date=='number'){
			date = new Date(date);
		}
		let o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (let k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt =
				fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	toSecond(timeStr) {
		if (timeStr.includes('-')) {
			timeStr.replace(/-/g, '/');
		}
		return new Date(timeStr).getTime();
	},
	/**
	 * type:now正在进行preview活动未开始end活动已结束
	 */
	getTimeoutData(startTime, endTime) {
		let now = new Date().getTime();
		let type = 'now';
		let time = endTime;
		if (startTime > now) {
			time = startTime;
			type = 'preview';
		}
		if (endTime < now) {
			type = 'end';
			return {type};
		}
		let timeout = {
			type,
			startTime,
			endTime
		};
		return this.startTimeout(time, now, timeout);
	},
	/**
	 * time 相对结束时间
	 * now 现在
	 * timeout {type,startTime(type='preview'),endTime(type='preview')}
	 * 例如:{type:'now'}
	 */
	startTimeout(time, now, timeout) {
		let diff = time - now;
		let days = parseInt(diff / 1000 / 60 / 60 / 24, 10); //计算剩余的小时数
		let hours = parseInt(diff / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
		let minutes = parseInt(diff / 1000 / 60 % 60, 10); //计算剩余的分钟数
		let seconds = parseInt(diff / 1000 % 60, 10); //计算剩余的秒数
		if (hours < 0 || minutes < 0 || seconds < 0) {
			if (timeout.type == 'now') {
				timeout.type = 'end'
			} else {
				this.getTimeoutData(timeout.startTime, timeout.endTime)
			}
		} else {
			let data = {
				days: this.fillZore(days, true),
				hours: this.fillZore(hours),
				minutes: this.fillZore(minutes),
				seconds: this.fillZore(seconds)
			};
			Object.assign(timeout, data);
		}
		return timeout;
	},
	fillZore(item, isDay = false) {
		if (item < 0) {
			return "00";
		}
		if (isDay) {
			return item && item < 10 ? '0' + item : item;
		} else {
			return item < 10 ? '0' + item : item;
		}
	},
	getDateObj(timeStr) {
		let obj = {
			day: new Date(timeStr).getDay(),
			hours: new Date(timeStr).getHour(),
			minutes: new Date(timeStr).getMinutes()
		}
		return obj
	},
	/**
	 * start:{hour,minute}
	 */
	getHourMinuteStr(params) {
		let {
			hour,
			minute
		} = params;
		return this.fillZore(hour) + ':' + this.fillZore(minute)
	},
	getTimeArr(start, end, space) {
		let timeArr = [];
		timeArr.push(this.getHourMinuteStr(start))
		let {
			minute,
			hour
		} = start;
		while (hour <= end.hour) {
			let next = minute + space
			if (next < 60) {
				minute += space
				if (hour == end.hour && minute > end.minute) break
			} else {
				minute = minute + space - 60
				hour++
				if (hour > end.hour) break
			}
			timeArr.push(this.getHourMinuteStr({
				minute,
				hour
			}))
		}
		return timeArr
	},
	checkSelectTime(selectTime) {
		let nowObj = this.getDateObject();
		let selectObj = this.getDateObject(selectTime);
	},
	getAbleTime(time,isToday,hour){
		if(isToday){
			let myHour = time.split(':')[0];
			return Number(myHour) > hour;
		}
		return true;
	}
}
