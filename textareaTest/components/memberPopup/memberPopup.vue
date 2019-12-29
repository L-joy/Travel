<!-- 主页的进入提示，提示用户获得会员卡 -->
<template>
	<cover-view class="container">
		<cover-view class="isMask" v-show="iMask">
		</cover-view>
		<cover-view class="alertBox" v-show="iShow">
			<cover-view class="alertText">
				<cover-view class="textItem">村游网免费送给您一张会员卡</cover-view>
				<cover-view class="textItem">已存入微信卡包和会员中心</cover-view>
				<cover-view class="textItem">您可前往使用</cover-view>
			</cover-view>
			<cover-view class="btnBox">
				<button class="btn btnCancel" @click="cancel()">取消</button>
				<button class="btn btnLeave" @click="navToMemberCenter()">立即前往</button>
			</cover-view>
		</cover-view>
	</cover-view>
</template>

<script>
	export default {
		data() {
			return {
				iMask: true,  //暂时修改，方便测试
				iShow: true
			}
		},
		onShow() {
			console.log("会员提醒组件");
		},
		methods: {
			isMask() {
				this.iMask = true;
			},
			isShow() {
				this.iShow = true;
			},

			cancel() {
				this.iMask = false;
				this.iShow = false;
			},
			navToMemberCenter() {
				console.log("跳转会员中心");
				uni.navigateTo({
					url: '/pages/vipCard/vipCenter'
				});
			}

		}
	}
</script>

<style>
	.container {
		z-index: 99999;
		position: relative;
	}

	.isMask {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.1);
	}

	.alertBox {
		position: absolute;
		top: 372upx;
		left: 102upx;
		width: 548upx;
		height: 332upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 24upx;
	}

	.alertText {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 34upx auto 0;
		width: 312upx;
		height: 132upx;
	}

	.textItem {
		height: 44upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		line-height: 44upx;
	}

	.btnBox {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 54upx;
	}

	.btn {
		width: 176upx;
		height: 64upx;
		border-radius: 32upx;
		color: #FFFFFF;
		line-height: 64upx;
		font-size: 28upx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
	}

	.btnCancel {
		background: rgba(216, 216, 216, 1);
	}

	.btnLeave {
		background: rgba(81, 172, 241, 1);
	}
</style>
