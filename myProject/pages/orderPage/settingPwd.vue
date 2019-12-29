<template>
	<view class="content">
		<view class="top">
			<view class="top-content">
				<view class="topContentView">
					<text>手机号</text>
					<input type="text" placeholder="请输入手机号" class="topContent">
				</view>
				<view class="checked">
					<text>验证码</text>
					<input type="text" placeholder="请输入手机验证码" class="checkedInput">
				    <view class="getChecked"  @click="changChecked">
						<text v-show="showCheck">获取验证码</text>
						<view v-show="!showCheck">
							<uni-countdown 
										:show-day="false" 
										:show-hour="false"
										:minute="1" 
										color="#333333"
										splitorColor="#333333"
										@timeup="timeup">
							</uni-countdown>
						</view>
						
					</view>
				</view>
				<view class="topContentView">
					<text>新密码</text>
					<input type="text" placeholder="请输入6位数新密码" class="topContent">
				</view>
				<view class="topContentView">
					<text>再次输入</text>
					<input type="text" placeholder="请再次输入6位数新密码" class="topContentS">
				</view>
			</view>
		</view>
		<orderList :showBottom2="true" :orderMessage="orderMessage" @submit="goPayPage"></orderList>
	</view>
</template>

<script>
	import orderList from "../../components/order-list/order-list.vue"
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	export default{
		components:{
			orderList,
			uniCountdown
		},
		data() {
			return{
				showCheck:true,
				orderMessage:"完成"
			}
		},
		methods:{
			changChecked:function(){
				this.showCheck = false;
			},
			timeup:function(){
				this.showCheck = true;
			},
			goPayPage:function(){
				uni.navigateTo({
					url:"goodsPayPage"
				})
			}
		}
	}
</script>

<style>
	.top{
		margin-top: 20upx;
		width: 100%;
		height: 488upx;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.top-content{
		width: 650upx;
		height: 376upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:20upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		
	}
	.topContentView{
		height: 64upx;
		margin-bottom: 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.top-content text{
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(74,74,74,1);
	}
	.topContent{
		padding-left: 20upx;
		margin-left: 28upx;
		width: 526upx;
		height: 60upx;
		border: 1px solid black;
		line-height: 60upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
	}
	.topContentS{
		padding-left: 20upx;
		width: 526upx;
		height: 60upx;
		border: 1px solid black;
		line-height: 60upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
	}
	.checked{
		width: 100%;
		height: 64upx;
		margin-bottom: 30upx;
		display: flex;
		align-items: center;
	}
	.checkedInput{
		margin-left: 28upx;
		padding-left: 20upx;
		width: 298upx;
		height: 60upx;
		border: 1px solid black;
		line-height: 60upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
	}
	.getChecked{
		margin-left: 98upx;
		width: 124upx;
		height: 60upx;
		line-height: 60upx;
		border: 1px solid black;
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
