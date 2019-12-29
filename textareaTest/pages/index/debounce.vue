<template>
	<view class="content">
		<view class="main" @click="add">
			{{count}}
		</view>
		<view class="main1" @click="add1">
			{{count1}}
		</view>
	</view>
</template>

<script>
	import {debounce} from "../../main.js"
	import {throttle1} from "../../main.js"
	export default {
		data() {
			return {
				count:0,
				count1:0
			}
		},
		onLoad() {
	
		},
		methods: {
			add:debounce(function(){
				this.count++;
			},1000),
			add1:throttle1(function(){
				this.count1++;
			},1000)
	
		}
	}
</script>

<style>
	.main{
		width: 600upx;
		height: 300upx;
		background-color: #3DBC63;
		line-height: 300upx;
		text-align: center;
	}
	.main1{
		margin-top: 60upx;
		width: 600upx;
		height: 300upx;
		background-color: #8A6DE9;
		line-height: 300upx;
		text-align: center;
	}
</style>
