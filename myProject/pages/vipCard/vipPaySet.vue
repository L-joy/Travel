<template>

	<view>

		<view class="set-personal-info" style="margin-top: 44upx;">
			<view class="align-item-center">
				<view class="personal-title">个人信息</view>
				<view class="personal-content">头像、昵称、收货地址</view>
			</view>
			<view>
				<image src="../../static/vip-arrow-right.svg" mode="" class="arrow-right"></image>
			</view>
		</view>

		<view class="set-personal-info">
			<view class="personnal-left">
				账号管理
			</view>
			<view class="middle-center">
				<view class="personnal-right-font">更改手机号</view>
				<image src="../../static/vip-arrow-right.svg" mode="" class="arrow-right"></image>
			</view>
		</view>

		<view class="set-personal-info">
			<view class="personnal-left">
				修改支付密码
			</view>
			<view>
				<image src="../../static/vip-arrow-right.svg" mode="" class="arrow-right"></image>
			</view>
		</view>



		<view class="set-pay-type">

			<view class="flex-between" style="padding-top: 32upx;">
				<view class="pay-font">
					免密支付
				</view>
				<view class="margin-right-10">
					<switch checked style="transform:scale(0.8);"  @change="noPasswordPay"/>
				</view>
			</view>

			<view class="flex-between">
				<view class="pay-font">
					指纹识别支付
				</view>
				<view class="margin-right-10">
					<switch style="transform:scale(0.8);" @change="isSupportFinger" />
				</view>
			</view>

			<view class="flex-between">
				<view class="pay-font">
					人脸识别支付
				</view>
				<view class="margin-right-10">
					<switch style="transform:scale(0.8);" />
				</view>
			</view>

		</view>

		<view class="pay-set-footer">
			若以上三种支付方式都打开，优先使用免密支付，指纹识别支 付次之、人脸识别支付最后
		</view>

		<view>
			<button type="primary" class="GoPayButton">退出登录</button> 
		</view>


		<uni-popup :show="show" :type="type" :custom="true" :mask-click="false" @change="change">
			<view class="uni-tip">
				<view class="uni-tip-title">
					<text>请输入支付密码设置免密支付功能</text>
					<uni-icon type="closeempty" size="50" color='black'  @click="cancel()" style="font-weight: bold;"></uni-icon>
				</view>
				<view class="uni-tip-content">
					<validCode :maxlength="6" :isPwd="true" @finish="getPwd"></validCode>
				</view>
				<view class="uni-tip-group-button">
					<view @click="cancel()">完成</view>
				</view>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import validCode from '@/components/p-validCode/validCode.vue'
	export default {
		components: {
			uniPopup,
			validCode,
			uniIcon
		},
		data() {
			return {
				show: false,
				type: 'center',
			}
		},
		methods: {
			noPasswordPay: function(e) {
				console.log(e.target.value)
				if(e.target.value){
					this.setPassword(); 
				}
			},
			isSupportFinger:function(e){
				console.log(e.target.value)
				if(e.target.value){
					this.isSupportAuthentication(); 
				}
			
			},
			isSupportAuthentication(){
				uni.startSoterAuthentication({
				     requestAuthModes: ['fingerPrint'],
				      challenge: '123456',
				      authContent: '请用指纹解锁',
				      success(res) {
				      }
				})
			},
			setPassword() {
					this.show = true
			},
			cancel(type) {
					this.show = false
			},
			change(e) {
				console.log(e.show)
			},
		}

	}
</script>

<style>
	.middle-center {
		display: flex;
		align-items: center;
	}

	.flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 50upx;
	}

	.margin-right-10 {
		margin-right: 20upx;
	}

	.align-item-center {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 20upx;
		height: 80rpx;
	}

	.set-personal-info {
		width: 686upx;
		height: 112upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4upx 44upx 0px rgba(0, 0, 0, 0.05);
		border-radius: 8upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 32upx;
		margin-bottom: 20upx;
	}

	.personal-title {
		height: 34upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(74, 74, 74, 1);
		line-height: 34upx;
	}

	.personal-content {
		height: 32upx;
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(155, 155, 155, 1);
		line-height: 32upx;
	}

	.arrow-right {
		width: 26upx;
		height: 26upx;
		margin-right: 20upx;
	}

	.personnal-left {
		height: 34upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(74, 74, 74, 1);
		line-height: 34upx;
		margin-left: 20upx;
	}

	.personnal-right-font {
		height: 32upx;
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(155, 155, 155, 1);
		line-height: 32upx;
		margin-right: 10upx;
	}

	.set-pay-type {
		width: 686upx;
		height: 360upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4upx 44upx 0px rgba(0, 0, 0, 0.05);
		border-radius: 20upx;
		margin-top: 20upx;
		margin-left: 32upx;
	}

	.pay-font {
		height: 34upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 34upx;
		margin-left: 20upx;
	}

	.pay-set-footer {
		width: 648upx;
		height: 68upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(159, 159, 159, 1);
		line-height: 34upx;
		margin-left: 52upx;
		margin-top: 34upx;
	}

	.GoPayButton {
		width: 100%;
		height: 88rpx;
		background: rgba(61, 188, 99, 1);
		-webkit-box-shadow: 0px 4rpx 44rpx 0px rgba(61, 188, 99, 0.2);
		box-shadow: 0px 4rpx 44rpx 0px rgba(61, 188, 99, 0.2);
		border-radius: 0;
		margin-top: 184rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		color: rgba(255, 255, 255, 1);
		position: fixed;
		bottom: 0;
	}
	
	/* 提示窗口 */
	.uni-tip {
		padding: 15px;
		width: 620upx;
		box-sizing: border-box;
		background:rgba(255,255,255,1);
		box-shadow:0px 4upx 52upx 0px rgba(0,0,0,0.1);
		border-radius:24upx;
	}
	
	.uni-tip-title{
		display: flex;
		justify-content: space-between;
		font-size:28upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.uni-tip-title text{
		margin-left: 68upx;
	}
	.uni-tip-content {
		padding: 15px;
		font-size:26upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	
	.uni-tip-group-button {
		margin-top: 20upx;
		display: flex;
		justify-content: space-around;
	
	}
	.uni-tip-group-button view:nth-child(1){
		width:176upx;
		height:64upx;
		border-radius:32upx;
		font-size:24upx;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:#ffffff;
		line-height:64upx;
		background:rgba(81,172,241);
	}
	
	
	
</style>
