<template>
	<view class="content">
		<view class="top">
			<view class="top-content">
				<view class="top-top-content">
					<view class="top-countDown">
						<text class="fontStyle11  colorType1">支付剩余时间</text>
						<view class="countDown">
							<uni-countdown 
										:show-day="false" 
										:show-hour="false"
										:minute="20" 
										color="rgba(155,155,155,1)"
										splitorColor="rgba(155,155,155,1)">
							</uni-countdown>
						</view>
						
					</view>
					
				</view>
				<view class="top-bottom-content">
					<view class="orderMoney colorType2">{{moneys}}</view>
					<view class="fontStyle11"  @click="togglePopup('center', 'orderDetail')" >
						<text class="colorType1">订单详情</text>
						<cmd-icon type="chevron-right" size="16" color="#333333"></cmd-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="mid">
			<view class="mid-content">
				<view class="mid-top-content">
					<text class="payType colorType2">选择支付方式</text>
				</view>
				<view class="mid-mid-content" @click="togglePayment()">
					<view class="fontStyle12 colorType2">
						会员卡余额支付
					</view>
					<image :src="src" mode="" @click="choose"></image>
					
				</view>
				<view class="mid-bottom-content">
					<view class="fontStyle12 colorType2">
						微信支付
					</view>
					<image :src="src1" mode="" @click="choose"></image>
				</view>
			</view>
		</view>
		
		<orderList :showBottom2="true" :orderMessage="orderMessage" @submit="goPaySuccess(moneys)"></orderList>
	    <best-payment-password 
			:show="payFlag" 
			:forget="true" 
			:value="paymentPwd" 
			digits="6" 
			@submit="checkPwd" 
			@cancel="togglePayment"
			@forgetPwd="forgetPwd"
		></best-payment-password>
		<uni-popup ref="orderDetail" :type="type" :custom="true"  @change="change">
			<view class="Popup">
				<view class="Popcontent">
					<view class="Pop-top">
						<view class="titleStyle orderTopTitle">订单详情</view>
						<image src="../../static/orderPicture/cancel.svg" mode="" @click="cancel('orderDetail')"></image>
					</view>
					<view class="Pop-part">
						<view class="titleStyle">
							预定信息
						</view>
						<view class="textStyle">
							{{goodsName}}
						</view>
						<view class="textStyle">
							{{goodsType}}
						</view>
						<view class="textStyle Pop-orderMessage">
							<view>
								{{stayDate}}
							</view>
							<view>
								{{stayNum}}
							</view>
						</view>
						<view class="titleStyle orderPersonMessage">
							入住人信息
						</view>
						<view class="textStyle Pop-ordePerson">
							<view>
								入住人
							</view>
							<view class="orderName">
								{{orderName}}
							</view>
						</view>
						<view class="textStyle Pop-ordePhone">
							<view>
								联系电话
							</view>
							<view class="orderPhone">
								{{orderPhone}}
							</view>
						</view>
						<view class="titleStyle orderMoneyMessage">
							金额详情
						</view>
						<scroll-view scroll-y class="scrollContent">
							<view class="textStyle orderDateList" v-for="(item,index) in orderDateList" :key="index">
								<view class="dateList-Left">
									{{item.date}}
								</view>
								<view class="dateList-Right">
									{{item.dateMoney}}
								</view>
							</view>
						</scroll-view>
						
						<view class="textStyle orderSum">
							<view>
								总价
							</view>
							<view>
								{{moneys}}
							</view>
						</view>
					</view>
							
				</view>
			</view> 
	    </uni-popup>
	</view>
</template>

<script>
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import orderList from "../../components/order-list/order-list.vue"
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import bestPaymentPassword from '../../components/best-payment-password/best-payment-password.vue'
	export default {
		components:{
			uniCountdown,
			orderList,
			cmdIcon,
			uniPopup,
			bestPaymentPassword
		},
		data() {
			return {
				type:"",
				moneys:"¥875",
				orderMessage:"确认支付",
				src:"../../static/orderPicture/choosePay.svg",
				src1:"../../static/orderPicture/nochoosePay.svg",
			    goodsName:"桃花源禅意民宿商户",
				goodsType:"大床房",
				stayDate:"7月20日入住-7月22日离店",
				stayNum:"3晚*2间",
				orderName:"王彪",
				orderPhone:"18798764235",
				orderDateList:[
					{
						date:"2019.07.20",
						dateMoney:"2*150"
					},
					{
						date:"2019.07.21",
						dateMoney:"2*150"
					},
					{
						date:"2019.07.22",
						dateMoney:"2*150"
					},
					{
						date:"2019.07.20",
						dateMoney:"2*150"
					},{
						date:"2019.07.20",
						dateMoney:"2*150"
					},
				],
				payFlag: false,
				paymentPwd: '' //可以写默认值
			}
		},
		onLoad() {
	
		},
		methods: {
			togglePopup(type, open) {
				this.type = type;
				this.$refs[open].open();
			},
				
			cancel(type) {
				this.$refs[type].close()
			},
			change(e) {
				console.log(e.show)
			},
			choose(){
				let temp = this.src;
				this.src = this.src1;
				this.src1 = temp;
				
			},
			goPaySuccess(e){
				console.log(e)
				uni.navigateTo({
					url:"paySuccess?money="+e
				})
			},
			togglePayment() {
				this.payFlag = !this.payFlag;
			},
			checkPwd: function(e) {
				console.log(e)
				// 这里是写验证密码的业务逻辑,比如密码错误可以在这边清空
				this.paymentPwd = '';
			},
			forgetPwd:function(){
				uni.navigateTo({
					url:"settingPwd"
				})
			}
	
		}
	}
</script>

<style>
	.colorType1{
		color:rgba(155,155,155,1);
	}
	.colorType2{
		color:rgba(74,74,74,1);
	}
	.top{
		width: 100%;
		height: 182upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.top-content{
		width: 686upx;
		height: 182upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:20upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.top-top-content{
		width: 646upx;
		height: 62upx;
		display: flex;
		align-items: flex-end;
	}
	.top-countDown{
		width: 108px;
		height: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.countDown{
		height: 32upx;
		line-height: 32upx;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.top-bottom-content{
		width: 646upx;
		height: 90upx;
		margin-top: 30upx;
		display: flex;
		justify-content:space-between;
		align-items: center;
	}
	.orderMoney{
		font-size:28upx;
		font-family:PingFangSC-Medium;
		font-weight:600;
	}
	.mid{
		width: 100%;
		height: 240upx;
		margin-top: 22upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.mid-content{
		width: 686upx;
		height: 240upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:20upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.mid-top-content{
		width: 646upx;
		margin-top: 38upx;
	}
	.mid-mid-content{
		width: 646upx;
		margin-top: 40upx;
		display: flex;
		justify-content:space-between;
		align-items: center;
	}
	.mid-bottom-content{
		width: 646upx;
		margin-top: 40upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content:space-between;
		align-items: center;
	}
	.payType{
		font-size:24upx;
		font-family:PingFangSC-Medium;
		font-weight:600;
	}
	image{
		width: 28upx;
		height: 28upx;
	}
	.Popup{
		width: 540upx;
		background:rgba(255,255,255,1);
        border-radius:20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Popcontent{
		width: 520upx;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.Pop-top{
		width: 100%;
		height: 46upx;
		margin-top: 20upx;
		display: flex;
		align-items: center;
	}
	.orderTopTitle{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Pop-part{
		width: 100%;
		margin-top: 18upx;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
	}
	.Pop-orderMessage {
		width: 100%;
		height: 32upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.Pop-ordePerson {
		width: 100%;
		height: 32upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.Pop-ordePhone{
		width: 100%;
		height: 32upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.orderPersonMessage{
		margin-top: 38upx;
	}
	.orderMoneyMessage{
		margin-top: 28upx;
	}
	.orderName{
		margin-left: 28upx;
	}
	.orderPhone{
		margin-left: 22upx;
	}
	.scrollContent{
		height: 160upx;
	}
	.orderDateList{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.orderSum{
		margin-top: 50upx;
		margin-bottom: 36upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.titleStyle{
		width: 100%;
		font-size:26upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(51,51,51,1);
	}
	.textStyle{
		margin-top: 18upx;
		width: 100%;
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
	}
</style>
