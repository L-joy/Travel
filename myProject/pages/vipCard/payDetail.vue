<template>
	<scroll-view class="pay-detail-box">
		<view class="pay-detail-content" v-for="pay in payDetailList" :key="pay.payOrderId">
			<view class="pay-detail-type pay-online-bg"
			 :class="{'pay-online-bg':pay.payType==='线上',
			 'pay-store-bg':pay.payType==='商家','pay-recharge-bg':pay.payType==='充值'}">
				{{pay.payType}}
			</view>
			<view class="pay-detail-header">
				<view>{{pay.product}}</view>
				<view>{{pay.payDetail}}</view>
			</view>
			
			<view class="pay-detail-center">
				{{pay.payStyle}}
			</view>
			
			<view class="pay-detail-footer">
				{{pay.payTime}}
			</view>
		</view>
	</scroll-view>
</template>

<script>
	
	export default {
		data() {
			return {
				payDetailList:[
					{
						product:'柞水酒店单人间',
						payDetail:'-¥200',
						payStyle:'余额支付',
						payTime:'06-28 11:32',
						payOrderId:'A1',
						payType:'线上'
					},
					{
						product:'柞水龙泉山庄钓鱼场',
						payDetail:'-¥100',
						payStyle:'付款码支付',
						payTime:'07-01 13:32',
						payOrderId:'A2',
						payType:'商家'
					},
					{
						product:'会员卡充值',
						payDetail:'+¥50000',
						payStyle:'会员充值',
						payTime:'07-06 00:32',
						payOrderId:'A3',
						payType:'充值'
					},
					{
						product:'柞水龙泉山庄钓鱼场',
						payDetail:'-¥200',
						payStyle:'付款码支付',
						payTime:'07-21 10:32',
						payOrderId:'A4',
						payType:'商家'
					},
					{
						product:'柞水龙泉山庄钓鱼场',
						payDetail:'-¥100',
						payStyle:'支付宝支付',
						payTime:'07-26 12:32',
						payOrderId:'A5',
						payType:'线上'
					},
					{
						product:'柞水酒店双人间',
						payDetail:'-¥300',
						payStyle:'微信支付',
						payTime:'07-21 13:32',
						payOrderId:'A6',
						payType:'商家'
					},
						{
						product:'柞水龙泉山庄钓鱼场',
						payDetail:'-¥100',
						payStyle:'付款码支付',
						payTime:'07-01 13:32',
						payOrderId:'A2',
						payType:'商家'
					},
				]
			}
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
	
	
</script>

<style>
	.pay-detail-content {
		width: 686upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 4upx 44upx 0px rgba(0,0,0,0.05);
		border-radius:16upx;
		margin: 20upx auto;
		position: relative;
	}
	.pay-detail-header{
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
		display: flex;
		justify-content: space-between;
	}
	.pay-detail-header view:nth-child(1){
		margin-top: 20upx;
		height: 34upx;
		line-height: 34upx;
		margin-left: 80upx;
	}
	.pay-detail-header view:nth-child(2){
		margin-top: 20upx;
		height: 34upx;
		line-height: 34upx;
		margin-right: 20upx;
	}
	.pay-detail-center {
		height:34upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:34upx;
		margin-left: 80upx;
		margin-top: 10upx;
	}
	.pay-detail-footer {
		height:34upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
		line-height:34upx;
		margin-left: 80upx;
		margin-top: 10upx;
		padding-bottom: 20upx;
	}
	.pay-detail-type{
		width:68upx;
		height:30upx;
		border-radius:16upx 16upx 16upx 0px;
		font-size:20upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 30rpx;
		position: absolute;
	}
	.pay-online-bg{
		background:rgba(81,172,241,1);
	}
	.pay-store-bg{
		background:rgba(245,166,35,1);
	}
	.pay-recharge-bg{
		background:rgba(126,191,56,1);
	}
	
</style>
