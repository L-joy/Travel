<template>
	<view class="pay-success-box">
	
	     <view>
			 <image src="../../static/recharge-success.svg" class="ok-image"></image>
		 </view>
	     <view>
			 充值成功
		 </view>
		 <view>
		 	¥{{pay}}.00
		 </view>
		 <view>
		 	{{gift}}元赠送金额已存入会员卡余额中
		 </view>
		 <view>
			<button type="primary" class="GoPayButton"  @click="setPassword()">设置支付密码</button>
		 </view>
		 <view>
				为了您的账户安全，请设置支付密码
		 </view>
	</view>
</template>

<script>
	
	export default {
		
		data () {
			return{
				pay:'',
				gift:'',
			}
		},
		methods:{
			setPassword(){
				uni.navigateTo({
					url: 'setPassword',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad(e) {
			console.log(e)
			this.pay = e.money;
			this.gift = e.give;
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
		font-size:28upx;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:40upx;
		margin-top: 16upx;
	}
	.pay-success-box view:nth-child(4){
		height:34upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:24upx;
		margin-top: 20upx;
	}
	.pay-success-box view button{
		width:354upx;
		height:88upx;
		background:rgba(61,188,99,1);
		border-radius:44upx;
		font-size:28upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height: 88upx;
		margin-top: 36upx;
	}
	.pay-success-box view:nth-child(6){
		height:34upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
		line-height:24upx;
		margin-top: 36upx;
	}
</style>