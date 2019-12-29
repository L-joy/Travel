<template>
	
	<view class="set-password-box">
		 <view class="marginLeft-26">
			 <text class="set-text">设置支付密码</text>
		 </view>
		 <view class="marginLeft-26">
		 		<input  class="set-input" type="number"  placeholder="请输入6位数字"/>
		 </view>
		  <view class="marginLeft-26">
		 	 <text class="set-text">再次输入</text>
		 </view>
		 <view class="marginLeft-26">
		 		<input class="set-input" type="number"  placeholder="请再次输入6位数字密码"/>
		 </view>
		 
		  <view>
		 		<button type="primary" class="savePasswordButton"  @click="setPassword('tip')">保存</button>
		 </view>
		 
		  <view class="set-password-footer">
		 		<image src="../../static/fail-status.svg" mode="" class="fail-img"></image>	 
				<text>提示&#12288;&nbsp;可前往会员中心设置其他支付方式</text>
		 </view>
		
		<uni-popup :show="show" :type="type" :custom="true" :mask-click="false" @change="change">
		<view class="uni-tip">
			<view class="uni-tip-title">
				<image src="../../static/success-status.svg" mode="" class="fail-img"></image>	 
				<text>支付密码设置成功</text>
			</view>
			<view class="uni-tip-content">
				系统为您自动开启免密支付功能，如需开启其他支付方式，前往“设置”中设置
				</view>
			<view class="uni-tip-group-button">
				<view @click="cancel('tip')">下次再说</view>
				<view @click="cancel('tip')">前往设置</view>
			</view>
		</view>
		</uni-popup>

	</view>
	
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default  {
		components: {
			uniPopup,
		},
		data() {
			return {
				show: false,
				type: 'center',
			}
		},
		methods: {
			setPassword(open) {
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
		},
		onLoad(e){
			
		},
	}
	
	
	
</script>

<style>
	
	.marginLeft-26{
		margin-left: 52upx;
	}
	.set-password-box {
		margin-top: 44upx;
	}
	.set-password-box view:nth-child(3){
		margin-top: 24upx;
	}
	.set-password-footer{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.set-password-footer text {
		height:34upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
		line-height:34upx;
	}
	.set-text {
		height:40upx;
		font-size:28upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(74,74,74,1);
		line-height:40upx;
	}
	
	.fail-img {
		width: 40upx;
		height: 36upx;
	}
	.set-input {
		width:626upx;
		height:64upx;
		background:rgba(216,216,216,1);
		border-radius:8upx;
		opacity:0.2;
		padding-left: 26rpx;
		margin-top: 24upx;
	}
	
	.savePasswordButton {
		width:354upx;
		height:88upx;
		background:rgba(61,188,99,1);
		border-radius:44upx;
		margin: 214upx auto;
		margin-bottom: 36upx;
		font-size:28upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height: 88rpx;
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
		justify-content: center;
		font-size:28upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.uni-tip-title image{
		width: 46upx;
		height: 48upx;
		margin-right: 14upx;
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
		border:2upx solid rgba(74,74,74,1);
		font-size:24upx;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(74,74,74,1);
		line-height:64upx;
	}
	.uni-tip-group-button view:nth-child(2){
		width:176upx;
		height:64upx;
		border-radius:32upx;
		background:rgba(81,172,241,1);
		border:2upx solid rgba(81,172,241,1);
		font-size:24upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:64upx;
	}
</style>
