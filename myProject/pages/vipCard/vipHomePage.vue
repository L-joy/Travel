<template>
	
	<view class="vip-card-page">
		<view class="vip-card-box" style="background-image: url('../../static/vip-bg.svg');
		background-position: center center;background-size: cover;margin-top: 16rpx;">
			  <view class="vip-title">
				  <text class="vip-title-left">青燕卡</text>
				  <text class="vip-title-right">规则说明</text>
			  </view>
			  <view class="vip-introduce">
				  <text class="vip-title-introduce">享受免费体验专项项目+消费享优惠</text>
			  </view>
			  <view class="vip-image-box uni-flex">
				  <image src="../../static/img.png" mode="aspectFit" class="vip-img my-hidden"></image>
				  <view class="vip-balance">
					  <text class="balance-text">余额</text>
					  <text class="money-text">¥ {{balanceMoney}}</text>
				  </view>
			  </view>
			  
			   <view class="vip-footer-box uni-flex">
				    <view class="vip-footer-content">
						<view class="vip-footer-font">充值送金额 享更多权益</view>
					</view>
					
					<view class="vip-footer-point">
						<image src="../../static/vipCardPonit.png" mode="aspectFit" class="vip-footer-point my-hidden"></image>
					</view>
			   </view>
		</view>
		
		<view class="recharge-box">
				 <view class="recharge-title uni-flex">
					 <view>充值享权益</view>
					 <view><text>明细</text></view> 
				 </view>
				 <view>
					 <view class="enter-money">充值金额</view>
					 <view class="pay-money-box">
						 <view class="pay-money flex"  v-for="(pay,index) in payMoneyList" :key="index" @click="goPaySuccess(pay)">
							 <text class="quotaText">¥ {{pay.quotaMoney}}</text>
							 <text class="giveText">赠送{{pay.give}}元</text>
						 </view>
					 </view>
				 </view>
				 <view>
					 <button type="primary" class="GoPayButton"  @click="togglePopup('tip')">去充值</button>
				 </view>
		</view>
			<uni-popup :show="show" :type="type" :custom="true" :mask-click="true" @change="change">
			<view class="uni-tip">
				<view class="uni-tip-title">警告</view>
				<view class="uni-tip-content">这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel('tip')">取消</view>
					<view class="uni-tip-button" @click="cancel('tip')">确定</view>
				</view>
			</view>
			</uni-popup>
	</view>

	 
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup,
		},
		data() {
			return {
				show: false,
				type: 'center',
				title: '会员卡首页',
				balanceMoney:1000,
				payMoneyList:[
					{quotaMoney:50,give:3},
					{quotaMoney:100,give:10},
					{quotaMoney:200,give:25},
					{quotaMoney:500,give:70},
					{quotaMoney:800,give:115},
					{quotaMoney:1000,give:150},
					{quotaMoney:1500,give:230},
					{quotaMoney:2000,give:320},
					{quotaMoney:3000,give:500},
				]
			}
		},
		onLoad() {

		},
		methods: {
			togglePopup(open) {
				if (open === 'tip') {
					this.show = true
				} else {
					this.$refs[open].open()
				}
			},
			cancel(type) {
				if (type === 'tip') {
					this.show = false
					return
				}
				this.$refs[type].close()
			},
			change(e) {
				console.log(e.show)
			},
			goPaySuccess(param){
				console.log(param)
				uni.navigateTo({
					url: './paySuccess?money='+param.quotaMoney+'&give='+param.give,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	
	.my-hidden {
		visibility: hidden;
	}
	.vip-card-box {
		/* width:343upx; */ 
		/* width:91.47%; */
		/* height: 326upx; */
		/* border-radius: 18upx;
		background-image: linear-gradient(to bottom , #46D39B, #14C176); */
		margin: 0 auto;
		margin-bottom: 20upx;
	}
	.recharge-box {
		/* width:343upx; */ 
		width:100%;
		height: 828upx; 
		border-radius: 48upx  48upx 0  0;
		position: fixed;
		bottom: 0;
		background:rgba(255,255,255,1);
		box-shadow:0px 4upx 44upx 0px rgba(0,0,0,0.1);
	}
	.vip-title {
		display: flex; 
		flex-direction: row;
		justify-content: space-between;
		padding-top: 36upx;
	}
	.vip-title-left {
		margin-left: 72upx;
		width:84upx;
		height:40upx;
		font-size:28upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:40upx;
	}
	.vip-title-right {
		margin-right: 72upx;
		width:88upx;
		height:32upx;
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(71,99,39,1);
		line-height:32upx;
		-webkit-text-stroke:0px rgba(255,255,255,1);
		text-stroke:0px rgba(255,255,255,1)
	}
	.vip-title-introduce {
		width:344upx;
		height:32upx;
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:32upx;	
		margin-left: 72upx;
		margin-top: 4upx
	}
	.vip-image-box {
		margin-top: 10upx;
	}
	.vip-balance {
		line-height: 92upx;
		margin-left: 114upx;
	}
	.vip-img {
		width: 74upx;
		height: 92upx;
		margin-left: 72upx;
		border: 1px dotted #0B877F;
	}
	.balance-text {
		width:72upx;
		height:50upx;
		font-size:36upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(255,255,255,1);
	}
	.money-text {
		width:126upx;
		height:56upx;
		font-size:40upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(255,255,255,1);
		margin-left: 32upx;
	}
	.vip-footer-box {
		padding-bottom: 32upx;
		justify-content: space-between;
	}
	.vip-footer-content {
		width:280upx;
		height:44upx;
		background:rgba(240,207,181,1);
		border-radius:28upx;
		margin:28upx 0 0 72upx
	},
	.vip-footer-font{
		width:228upx;
		height:32upx;
		font-size:22upx;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:32upx;
		margin: 8upx auto;
	}
	.vip-footer-point {
		width: 120upx;
		height: 70upx;
		margin-right: 72upx;
		margin-top: 4upx;
	}
    .recharge-title {
		height: 40upx;
		justify-content: space-between;
		align-items: center;
		margin-top: 20upx;
	}
	.recharge-title view:nth-child(1) {
		width:140upx;
		height:40upx;
		font-size:28upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(51,51,51,1);
		line-height:40upx;
		margin-left: 50upx;
	}
	.recharge-title  view:nth-child(2) {
		width:78upx;
		height:36upx;
		background:rgba(61,188,99,1);
		border-radius:18px;
		opacity:0.2;
		margin-right: 50upx;
		line-height:36upx;
		text-align: center;
	}
    .recharge-title  view text {
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		/* color:rgba(61,188,99,1); */
	}
    .enter-money {
		width:96upx;
		height:34upx;
		font-size:24upx;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:34upx;
		margin: 24upx 0 30upx 50upx;
	}
	.pay-money-box {
		display: flex;
        flex-wrap: wrap;
	}
	.pay-money text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.quotaText{
		font-size:36upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(60,188,99,1);
	}
	.giveText{
		font-size:28upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(60,188,99,1);
		line-height: 28rpx;
	}
	.pay-money-box view:nth-child(3n-2){
		margin-left: 50upx;
	}
	.pay-money-box view:nth-child(3n-1){
		margin-left: 24upx;
		margin-right: 24upx;
	}
	.pay-money-box view:nth-child(4){
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
	.pay-money-box view:nth-child(5){
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
	.pay-money-box view:nth-child(6){
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
    .pay-money {
		width:200upx;
		height:112upx;
		border-radius:20upx;
		border:2upx solid rgba(60,188,99,1);
		background:rgba(255,255,255,1);
        box-shadow:0px 2px 22px 0px rgba(0,0,0,0.1);
	}
    .GoPayButton {
		width: 100%;
		height: 88rpx;
		background: rgba(61,188,99,1);
		-webkit-box-shadow: 0px 4rpx 44rpx 0px rgba(61,188,99,0.2);
		box-shadow: 0px 4rpx 44rpx 0px rgba(61,188,99,0.2);
		border-radius: 0;
		margin-top: 184rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		color: rgba(255,255,255,1);
		position: fixed;
		bottom: 0;
	 }
	 
	 
	 /* 提示窗口 */
	 .uni-tip {
	 	padding: 15px;
	 	width: 300px;
	 	background: #fff;
	 	box-sizing: border-box;
	 	border-radius: 10px;
	 }
	 
	 .uni-tip-title {
	 	text-align: center;
	 	font-weight: bold;
	 	font-size: 16px;
	 	color: #333;
	 }
	 
	 .uni-tip-content {
	 	padding: 15px;
	 	font-size: 14px;
	 	color: #666;
	 }
	 
	 .uni-tip-group-button {
	 	margin-top: 10px;
	 	display: flex;
	 }
	 
	 .uni-tip-button {
	 	width: 100%;
	 	text-align: center;
	 	font-size: 14px;
	 	color: #3b4144;
	 }
	 
</style>
