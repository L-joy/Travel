import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
//防抖
export function debounce(fn,delay){
	var delay = delay||200;
	var timer;
	return function(){
		var th = this;
		var args = arguments;
		if(timer) clearTimeout(timer);
		timer = setTimeout(function(){
			timer = null;
			fn.apply(th,args)
		},delay)
	}
}
//节流---时间戳
export function throttle(fn,delay){
	var prev = Date.now()//记录第一次点击时的时间
	var timer;
	var delay = delay||200;
	return function(){
		var th = this;
		var args = arguments;
		var now = Date.now()//记录此刻的时间
		//时间戳----对比时间
		if(now - prev >= delay){
			fn.apply(th,args);
			prev = Date.now()
		}
	}
}
//节流-----时间戳+定时器
export function throttle1(fn,delay){
	var prev = Date.now()//记录第一次点击时的时间
	var timer;
	var delay = delay||200;
	return function(){
		var th = this;
		var args = arguments;
		clearTimeout(timer)
		var now = Date.now()//记录此刻的时间
		//时间戳----对比时间
		var remainTime =delay - (now - prev);
		if(remainTime <= 0){
			fn.apply(th,args);
			prev = Date.now()
		}else{
			timer = setTimeout(fn,remainTime)
		}
	}
	
}
//节流-----定时器
export function throttle2(fn,delay){
	var timer;
	var delay = delay||200;
	return function(){
		var th = this;
		var args = arguments;
		if(!timer){
			timer = setTimeout(function(){
				fn.apply(th,args);
				timer = null
			},delay)
		}
	}
	
}
