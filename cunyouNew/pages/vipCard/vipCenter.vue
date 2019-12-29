<template>
	<view class="vip-center-box">
		<view class="vip-center-title uni-flex">
			<view class="flex-center">
				<image src="../../static/vip-center-card.svg" mode="aspectFit" class="vip-user-head"></image>
				<text class="vip-user-name">小老虎的飞滴</text>
			</view>
			<view style="margin-right: 32upx;">
				<image src="../../static/vip-set.svg" class="vip-set-img" mode="" @click.stop="goSetPage()"></image>
			</view>
		</view>  
	   
		<view class="vip-center-card-box" style="background-image:url('../../static/vip-center-card.svg');
		height: 300rpx;background-size: cover;">
			  <view class="card-type .margin-left-52">
				  青燕卡
			  </view>
			  <view class="card-content">
			  		<view class=".margin-left-52">充值送金额 享更多权益</view>
					<view style="margin-right: 52upx;">余额 ¥1000</view>
			  </view>
		</view>
		
		<view class="vip-center-content-box uni-flex">
			<view>
				<image src="../../static/vip-order.svg" mode="" class="vip-btn-img"></image>
				<view>订单</view>
			</view>
			<view>
				<image src="../../static/vip-pay-detail.svg" mode="" class="vip-btn-img"></image>
				<view>账单明细</view>
			</view>
			<view>
				<image src="../../static/vip-collection.svg" mode="" class="vip-btn-img"></image>
				<view>收藏</view>
			</view>
		</view>
		
	<view class="vip-center-content-box uni-flex">
			<view>
				<image src="../../static/vip-history.svg" mode="" class="vip-btn-img"></image>
				<view>浏览历史</view>
			</view>
			<view>
				<image src="../../static/vip-help.svg" mode="" class="vip-btn-img"></image>
				<view>帮助中心</view>
			</view>
			<view>
				<image src="../../static/vip-about.svg" mode="" class="vip-btn-img"></image>
				<view>关于村游网</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	
	export default  {
		data() {
			return {
			}
		},
		methods: {
			goSetPage(){
				uni.navigateTo({
					url: 'vipPaySet',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad(e){
			
		},
	}
	
</script>

<style>
	
	.flex-center {
		display: flex;
		align-items: center;
		margin-left: 32upx;
	}
	
	.vip-center-title {
		margin-top: 52upx;
		justify-content: space-between;
		align-items: center;
	}
	.vip-user-head {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		border: 1px dashed black;
	}
	.vip-user-name {
		height:34upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(74,74,74,1);
		line-height:34upx;
		margin-left: 36upx;
		display: block;
	}
	.vip-set-img {
		width: 36upx;
		height: 36upx;
	}
	
	.margin-left-52{
		margin-left: 52upx;
	}
	.card-type {
		height:40upx;
		font-size:28upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:40upx;
		margin-bottom: 106rpx;
		padding-top: 70rpx;
	}
	
	.card-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height:32upx;
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:32upx;
	}
	
	.vip-btn-img{
		width: 48upx;
		height: 56upx;
	}
	
	.vip-center-content-box {
		width: 686upx;
		height: 240upx;
		margin-top: 20upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 4upx 44upx 0px rgba(0,0,0,0.05);
		border-radius:16upx;
		margin: 20upx auto;
		position: relative;
		display: flex;
		justify-content: space-around;
	}
	.vip-center-content-box view {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
</style>
