<template>
	<view class="content">
		<view class="imgContent">
			<image src="../../static/1.6.jpg" mode=""></image>
			
			<view class="imgTagList">
				<view class="imgTag" v-for="(item,index) in tagList" :key="index">
				   <view class="tagList">
				   	 <text>{{item}}</text>
				   </view>
				</view>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagList:["啦啦","嘟嘟","哈哈","嗯嗯"]
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
	.imgContent{
		position: relative;
	}
	.imgContent image{
		width:323px;
		height:110px;
		border-radius:6px;
	}
	.imgTagList{
		position: absolute;
		z-index: 2;
		left: 20upx;
		top: 160upx;
		height: 36upx;
	}
	.imgTag{
		display: inline-block;
		margin-right: 20upx;
		width:80upx;
		height: 36upx;
	}
	.tagList{
		width:80upx;
		height:36upx;
		background:rgba(0,0,0,0.5);
		border-radius:18upx;
		border:2upx solid rgba(255,255,255,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tagList text{
		font-size:22upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
</style>
