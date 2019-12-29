<template>
	<view class="pay-success-box">
	     <view>
			 <image src="../../static/orderPicture/成功图案.svg" class="ok-image"></image>
		 </view>
	     <view>
			 您已提交预约申请
		 </view>
		 <view>
		 	商户审核过后会主动联系您
		 </view>
		 <view class="bottom">
			 <view class="left">
			 	<button type="default" class="fontStyle14" >返回首页</button>
			 </view>
			 <view class="right">
			 	<button type="primary" class="fontStyle14" @click="gogoodsPayPage">查看订单</button>
			 </view>
		 </view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return{
				
			}
		},
		methods:{
			gogoodsPayPage:function(){
				uni.navigateTo({
					url:"room"
				})
			}
		
		},
		onLoad(e) {
			console.log(e)
		}
		
		
	}
	
</script>


<style>
	.pay-success-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 166upx;
	}
	
	.ok-image {
		width: 152upx;
		height: 152upx;
	}

	.pay-success-box view:nth-child(2){
		height:40upx;
		font-size:28upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(51,51,51,1);
		line-height:40upx;
		margin-top: 34upx;
	}
	.pay-success-box view:nth-child(3){
		height:40upx;
		font-size:24upx;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:40upx;
		margin-top: 16upx;
	}
	.pay-success-box view:nth-child(4){
		width: 100%;
		height:88upx;
		position: fixed;
		bottom:0upx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}
	.pay-success-box view:nth-child(4) view:nth-child(1){
		width: 50%;
		height: 88upx;
		line-height: 88upx;

	}
	.pay-success-box view:nth-child(4) view:nth-child(1) button{
		border-radius: 0upx;
		height: 100%;
		line-height: 88upx;
		color:rgba(51,51,51,1);
		background:#CCCCCC;
	}
	.pay-success-box view:nth-child(4) view:nth-child(2){
		width: 50%;
		height: 88upx;
		line-height: 88upx;
		margin-top: 0upx;
	}
	.pay-success-box view:nth-child(4) view:nth-child(2) button{
		border-radius: 0upx;
		height: 100%;
		line-height: 88upx;
		background:rgba(61,188,99,1);
		color:rgba(255,255,255,1);
	}


</style>