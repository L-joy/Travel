<template>
	<view class="date">
		<view class="order-date" @tap="showCaledar = !showCaledar">
			<view class="order-date-top">
				<text class="date-title">入住</text><text class="date-sum">共 {{dateSum}} 晚</text><text class="date-title">离店</text>
			</view>
			<view class="order-date-bottom">
				<view class="order-date-left">
					<text class="date-date">{{beginDate}}</text><text>星期{{beginDateWeek}}</text>
				</view>
				<view class="line">
					
				</view>
				<view class="order-date-right">
					<text class="date-date">{{endDate}}</text><text>星期{{endDateWeek}}</text>
				</view>
			</view>
		</view>
		<calendar @change="change" :modal="true" :show="showCaledar"></calendar>
	</view>
</template>

<script>
	import calendar from '../../components/date-picker/date-picker.vue';
	export default {
		components:{
			calendar
		},
		data() {
			return {
				beginDate: '',
				beginDateWeek:'',
				endDate: '',
				endDateWeek:'',
				showCaledar: false,
				dateSum:0
				
			}
		},
		onBackPress() {
			if (this.showCaledar !== false) {
				this.showCaledar = false;
				return true;
			}
		},
		methods: {
			change({ choiceDate, dayCount }) {
				this.beginDate = choiceDate[0].re;
				this.endDate = choiceDate[1].re;
				this.beginDateWeek = choiceDate[0].week;
				this.endDateWeek =  choiceDate[1].week ;
				this.dateSum = dayCount;
			}
		}
	}
</script>

<style>

.date{
	width: 100%;
	height:100upx;
	margin-top: 20upx;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}
.order-date{
	width: 686upx;
	height:100upx;
	background:rgba(255,255,255,1);
	box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
	border-radius:24upx;
	display: flex;
	flex-direction: column;
}
.order-date text{
	font-size:24upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(74,74,74,1);
}
.order-date-top{
	margin-top: 20upx;
	width: 100%;
	height:50upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.order-date-bottom{
	width: 100%;
	height:150upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.order-date-left{
	width: 50%;
	height:50upx;
	padding-right: 20upx;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.order-date-right{
	width: 50%;
	height:50upx;
	padding-left: 20upx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.line{
	width: 2upx;
	height: 32upx;
    background-color: #333333;
}
.date-sum{
	margin-left: 10upx;
	margin-right: 10upx;
}
.date-date{
	margin-right: 10upx;
}
.alldate{
	width: 100%;
	display: flex;
	justify-content: center;
	font-size:24upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(74,74,74,1);
}
</style>
