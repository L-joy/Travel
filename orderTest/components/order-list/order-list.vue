<template>
	<view>
		<view class="orderList" > 
			<view class="header" v-show="showHeader1">
				<view class="header-content">
					<view class="header-box">
						<view class="header-top">
							<text class="fontStyle13">{{goodsName}}</text>
						</view>
						<view class="header-bottom">
							<view class="header-bottom-left">
							  <image :src="goodsPicture" mode=""></image>
							</view>
							<view class="header-bottom-right">
								<view class="header-right-top">
									<text class="fontStyle13">{{goodsType}}</text>
								</view>
								<view class="header-right-mid">
									<text class="fontStyle11">{{goodsMag}}</text>
								</view>
								<view class="header-right-bottom">
									<view class="header-right-left">
										<text class="fontStyle13">￥{{goodsPrice}}</text>
									</view>
									<view class="header-right-right">
										<wlp-number-shopping value="2" :min="0" :max="20" @change="changeNumber"></wlp-number-shopping>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 商户 -->
			<view class="header2" v-show="showHeader2">
				<view class="header2-content">
					<view class="header2-box">
						<view class="header2-bottom">
							<view class="header2-bottom-left">
							  <image :src="goodsPicture" mode=""></image>
							</view>
							<view class="header2-bottom-right">
								<view class="header2-right-top">
									<text class="fontStyle14">{{goodsName}}</text>
								</view>
								<view class="header2-right-bottom">
									<text class="fontStyle11">{{goodsMag}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 住宿 -->
			<view class="date" v-show="showDate1">
				<view class="order-date" @tap="showCaledar = !showCaledar">
					<view class="order-date-top">
						<text class="fontStyle12"><text class="date-title">入住</text><text class="date-sum">共 {{dateSum}} 晚</text><text class="date-title">离店</text></text>
					</view>
					<view class="order-date-bottom">
						<view class="order-date-left">
							<text class="fontStyle12"><text class="date-date">{{beginDate}}</text><text>星期{{beginDateWeek}}</text></text>
						</view>
						<view class="line">
							
						</view>
						<view class="order-date-right">
							<text class="fontStyle12"><text class="date-date">{{endDate}}</text><text>星期{{endDateWeek}}</text></text>	
						</view>
					</view>
				</view>
				<calendar @change="changeDate" :modal="true" :show="showCaledar"></calendar>
			</view>
			<!-- 门票 |美食|线路-->
			<view class="date2" v-show="showDate2">
				<view class="order-date2" @tap="showCaledar = !showCaledar">
					<view class="order-date2-content">
						<view class="order-content2-left">
							<view class="order-date2-left">
								<text class="fontStyle12">{{dateLeft}}</text>
							</view>
							<view class="order-date2-mid">
								<text class="fontStyle12">{{dateMid}}</text>
							</view>
						</view>
						<view class="order-content2-right">
							<cmd-icon  type="chevron-right" size="16" color="#333333"></cmd-icon>
						</view>
					</view>
				</view>
				<calendar @change="changeDate" :modal="true" :show="showCaledar"></calendar>
			</view>
			<!-- 活动 -->
			<view class="date4" v-show="showDate4">
				<view class="order-date4">
					<view class="order-date4-content">
						<view class="order-content4-left">
							<view class="order-date2-left">
								<text class="fontStyle12">{{dateLeft}}</text>
							</view>
							<view class="order-date2-mid">
								<text class="fontStyle12">{{dateMid}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 住宿 -->
			<view class="message" v-show="showMessage1">
				<view class="message-content">
					<view class="message-box">
						<view class="message-top">
							<text class="fontStyle12">入住人</text>
							<input type="text" value="" placeholder="请输入真实姓名"/>
						</view>
						<view class="message-mid">
							<text class="fontStyle12">联系电话</text>
							<input type="text" value="" :placeholder="phoneNumber"/>
						</view>
						<view class="message-bottom" @click="togglePopup('bottom', 'two')">
							<view class="message-left">
								<text class="fontStyle12">房间保留至</text>
							</view>
							<view class="message-right" >
								<text class="fontStyle12">{{time}}</text>
								<cmd-icon  type="chevron-right" size="16" color="#333333"></cmd-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 商户 -->
			<view class="message2" v-show="showMessage2">
				<view class="message2-content">
					<view class="message2-box">
						<view class="message2-top">
							<text class="fontStyle12">联系电话</text>
							<input type="text" value="" :placeholder="phoneNumber"/>
						</view>					
						<view class="message2-bottom">
							<view class="message2-left">
								<text class="fontStyle12">预约人数</text>
							</view>
							<view class="message2-right" >
							    <wlp-number-shopping value="2" :min="0" :max="20" @change="changeNumber"></wlp-number-shopping>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 门票 |线路-->
			<view class="message" v-show="showMessage3">
				<view class="message-content">
					<view class="message-box">
						<view class="message-top">
							<text class="fontStyle12">取票人</text>
							<input type="text" value="" placeholder="请输入真实姓名"/>
						</view>
						<view class="message-mid">
							<text class="fontStyle12">联系电话</text>
							<input type="text" value="" :placeholder="phoneNumber"/>
						</view>
						<view class="message3-bottom">
							<text class="fontStyle12">身份证</text>
							<input type="text" value="" placeholder="取票时需要出示身份证"/>
						</view>
					</view>
				</view>
			</view>
			<!-- 美食 -->
			<view class="message4" v-show="showMessage4">
				<view class="message4-content">
					<view class="message4-box">
						<view class="message-top">
							<text class="fontStyle12">预订人</text>
							<input type="text" value="" placeholder="请输入真实姓名"/>
						</view>
						<view class="message-mid">
							<text class="fontStyle12">联系电话</text>
							<input type="text" value="" :placeholder="phoneNumber"/>
						</view>
					</view>
				</view>
			</view>
			<!-- 商户 -->
			<view class="date2" v-show="showDate3">
				<view class="order-date2" @tap="showCaledar = !showCaledar">
					<view class="order-date2-content">
						<view class="order-content2-left">
							<view class="order-date2-left">
								<text class="fontStyle12">{{dateLeft}}</text>
							</view>
							<view class="order-date2-mid">
								<text class="fontStyle12">{{dateMid}}</text>
							</view>
						</view>
						<view class="order-content2-right">
							<cmd-icon  type="chevron-right" size="16" color="#333333"></cmd-icon>
						</view>
					</view>
				</view>
				<calendar @change="changeDate" :modal="true" :show="showCaledar"></calendar>
			</view>
			
			<view class="rule" v-show="showRule1">
				<view class="rule-content">
					<view class="fontStyle12">
						<view class="rule-title">退改规则</view>
						<view class="rule-message">{{messageContent}}</view>
					</view>
				</view>
			</view>
			<!-- 商户 -->
			<view class="rule2" v-show="showRule2">
				<view class="rule2-content">
					<textarea class="rule2-content-box" value="" placeholder="请输入您的要求，以便于商户做好充足准备（选填）" placeholder-style="font-size:12px"/>
				</view>
			</view>
			
			<view class="content-bottom" v-show="showBottom1">
				<view class="bottom-content">
					<view class="bottom-content-left" @click="togglePopup('bottom', 'one')">
						<text  class="fontStyle12">
							<text>全款支付</text>
							<text class="money">{{moneys}}</text>
							<text class="detail">明细</text>
						</text>
						<cmd-icon  type="chevron-up" size="16" color="#333333"></cmd-icon>
					</view>
					<view class="submit_bg">
						<text class="submit" @click="submit">提交订单</text>
					</view>
				</view>
			</view>
	        <!-- 商户 -->
			<view class="content-bottom2" v-show="showBottom2">
				<view class="bottom2-content">
					<view class="bottom2-content-mid">
						<view class="fontStyle14" @click="submit">免费预约</view>
					</view>
				</view>
			</view>
			
			<!-- 订单明细弹窗 -->
		    <uni-popup ref="one" :type="type" :custom="true"  @change="change">
		    	<view class="Popup">
		    		<view class="Popcontent">
		    			<view class="Pop-content-top">
		    				<view class="Pop-top-left">
		    					<text>明细</text>
		    				</view>
		    				<view class="Pop-top-right">
		    					<cmd-icon  type="chevron-up" size="20" color="#333333" @click="cancel('one')"></cmd-icon>
		    				</view>
		    			</view>
		    			<view class="Pop-detail-mid">
		    				<view class="mid-left">
		    					<text>房费</text>
		    				</view>
		    				<view class="mid-right">
		    					<text>{{moneys}}</text>
		    				</view>
		    			</view>
		    			<view class="Pop-detail-bottom">
		    				<view class="Pop-bottom-detail" v-for="(item,index) in Popdetail" :key="index">
		    					<view class="Pop-bottom-money">
		    						<text>{{item.date}}</text>	
		    					</view>
		    					<view class="Pop-bottom-date">
		    						<text>{{item.money}}</text>	
		    					</view>
		    				</view>
		    				<view class="Pop-bottom-sum">
		    					<view class="Pop-bottom-sum-left">
		    						<text>总价</text>
		    					</view>
		    					<view class="Pop-bottom-sum-right">
		    						<text>{{moneys}}</text>
		    					</view>
		    				</view>
						</view>
					     <view class="Pop-bottom" >
					    	<view class="Pob-bottom-content">
					    		<view class="bottom-content-left" @click="togglePopup('bottom', 'one')">
					    			<text>全款支付</text>
					    			<text class="money">{{moneys}}</text>
					    			<text class="detail">明细</text>
					    			<cmd-icon  type="chevron-up" size="16" color="#333333"></cmd-icon>
					    		</view>
					    		<view class="submit_bg">
					    			<text class="submit">提交订单</text>
					    		</view>
					    	</view>
					    </view>
					</view>
				</view>
		    </uni-popup>
		    <!-- 预定时间弹窗 -->
		    <uni-popup ref="two" :type="type" :custom="true" @change="change">
		    	<view class="Popup">
		    		<view class="Popcontent">
		    			<view class="Pop-content-top">
		    				<view class="Pop-top-left">
		    					<text>预计到达</text>
		    				</view>
		    				<view class="Pop-top-right">
		    					<cmd-icon  type="chevron-up" size="20" color="#333333" @click="cancel('two')"></cmd-icon>
		    				</view>
		    			</view>
		    			<view class="Pop-content-mid">
		    				<text>房间整晚保留,12：00前到店可能需要等房</text>
		    			</view>
		    			<view class="Pop-content-bottom">
		    				<view class="Pop-bottom-list" v-for="(item,index) in Poplist" :key="index">
		    						<text @click="changeTime" :data-date="item">{{item}}</text>
		    				</view>
		    			</view>
		    		</view>
		    	</view>
		    </uni-popup>

		</view>

	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	import wlpNumberShopping from "../../components/wlp-number-shopping/wlp-number-shopping.vue"
	import calendar from '../../components/date-picker/date-picker.vue'
	export default {
		components: {
			uniPopup,
			uniIcon,
			cmdIcon,
			wlpNumberShopping,
			calendar
		},
		props:{
			showHeader1:{
				type:Boolean,
				default:false
			},
			showHeader2:{
				type:Boolean,
				default:false
			},
			showDate1:{
				type:Boolean,
				default:false
			},
			showDate2:{
				type:Boolean,
				default:false
			},
			showDate3:{
				type:Boolean,
				default:false
			},
			showDate4:{
				type:Boolean,
				default:false
			},
			showMessage1:{
				type:Boolean,
				default:false
			},
			showMessage2:{
				type:Boolean,
				default:false
			},
			showMessage3:{
				type:Boolean,
				default:false
			},
			showMessage4:{
				type:Boolean,
				default:false
			},
			showRule1:{
				type:Boolean,
				default:false
			},
			showRule2:{
				type:Boolean,
				default:false
			},
			showBottom1:{
				type:Boolean,
				default:false
			},
			showBottom2:{
				type:Boolean,
				default:false
			},
			url:{
				type:String,
				default:""
			},
			dateLeft:{
				type:String,
				default:""
			},
			dateMid:{
				type:String,
				default:""
			},
			messageContent:{
				type:String,
				default:""
			},
			goodsMag:{
				type:String,
				default:"请在出行的前一日18：00前预定"
			}
		},
		data() {
			return {
				goodsName:"桃花源禅意民宿商户",
				goodsPicture:"/static/1.6.jpg",
				goodsType:"单人间",
				goodsPrice:180,
				phoneNumber:"15029092646",
				moneys:"￥1080",
				type: '',
				time:'18:00',
				beginDate: '',
				beginDateWeek:'',
				endDate: '',
				endDateWeek:'',
				showCaledar: false,
				dateSum:0,
			    Poplist:[
			    	"14:00","15:00","16:00","17:00",
			    	"18:00","19:00","20:00","21:00",
			    	"22:00","23:00","24:00","次日01:00",
			    	"次日02:00","次日03:00","次日04:00","次日05:00",
			    	"次日06:00"
			    ],
				Popdetail:[
					{
						money:"2*180",
						date:"2019.07.20"
					},
					{
						money:"2*180",
						date:"2019.07.21"
					},
					{
						money:"2*180",
						date:"2019.07.22"
					}
				]
			}
		},
		onBackPress() {
			if (this.showCaledar !== false) {
				this.showCaledar = false;
				return true;
			}
		},
		methods: {
			togglePopup(type, open) {
				this.type = type
				this.$refs[open].open()
			},
			cancel(type) {
				this.$refs[type].close()
			},
			change(e) {
				console.log(e.show)
			},
			changeTime(e){
				this.time=e.currentTarget.dataset.date;
			},
			changeNumber(e){
				this.moneys=e*this.goodsPrice*this.dateSum;
				
				for (var i = 0; i < this.Popdetail.length; i++) {
					this.Popdetail[i].money=e+"*"+this.goodsPrice;
				}
			},
			submit(){
				uni.navigateTo({
					url:this.url,
					success:function(){
						console.log("跳转成功")
					}
				})
			},
		    changeDate({ choiceDate, dayCount }) {
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
	.orderList{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.header{
		width: 100%;
		height: 332upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.header-content{
		width: 686upx;
		height: 332upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:24upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.header-box{
		width: 646upx;
		height: 332upx;
		display: flex;
		flex-direction: column;
	}
	.header-top{
		margin-top: 5upx;
	}
	.header-top text{
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.header-bottom{
		width: 100%;
		height: 220upx;
		margin-top: 22upx;
		margin-bottom: 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}
	
	.header-bottom-left{
		width: 220upx;
		height: 220upx;
		border-radius:12upx;
	}
	.header-bottom-left image{
		width: 220upx;
		height: 220upx;
		border-radius:12upx;
	}
	.header-bottom-right{
		width: 406upx;
		height: 220upx;
	}
	.header-right-top text{
		font-weight:500;
		color:rgba(74,74,74,1);
	}
	.header-right-mid text{
		color:rgba(155,155,155,1);
	}
	.header-right-bottom{
		margin-top: 84upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header-right-left{
		font-weight:600;
		color:rgba(254,84,0,1);
	}
	.header2{
		width: 100%;
		height: 220upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.header2-content{
		width: 686upx;
		height: 220upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.header2-bottom{
		width: 646upx;
		height: 176upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header2-bottom-left{
		width: 176upx;
		height: 176upx;
		border-radius:20upx;
	}
	.header2-bottom-left image{
		width: 176upx;
		height: 176upx;
		border-radius:20upx;
	}
	.header2-bottom-right{
		width: 424upx;
		height: 176upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.header2-right-bottom{
		margin-top: 80upx;
	}
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
	.date2{
		width: 100%;
		height:88upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.order-date2{
		width: 686upx;
		height:88upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.order-date2-content{
		width: 646upx;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.order-content2-left{
		width: 304upx;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.date4{
		width: 100%;
		height:116upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.order-date4{
		width: 686upx;
		height:116upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.order-date4-content{
		width: 646upx;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.order-content4-left{
		/* width: 522upx; */
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.order-date2-left{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.order-date2-mid{
		margin-left: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.order-date2-left text{
		color:rgba(74,74,74,1);
	}
	
	.order-date2-mid text{
		color:rgba(155,155,155,1);
	}
	.message{
		width: 100%;
		height: 168upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message-content{
		height: 168upx;
		width: 686upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:24upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message-box{
		width: 646upx;
		height: 168upx;
	}
	.message-box text{
		color:rgba(74,74,74,1);
	}
	.message-top{
		height: 34upx;
		margin-top: 10upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
	}
	.message-top input{
		margin-left: 62upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
	}
	.message3-bottom input{
		margin-left: 62upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
	}
	.message-mid{
		margin-top: 10upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
	}
	.message-mid input{
		margin-left: 38upx;
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(74,74,74,1);
	}
	.message-bottom{
		margin-top: 12upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.message3-bottom{
		margin-top: 10upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
	}
	.message2{
		width: 100%;
		height: 136upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message2-content{
		height: 136upx;
		width: 686upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message2-box{
		width: 646upx;
		height: 136upx;
	}
	.message2-box text{
		color:rgba(74,74,74,1);
	}
	.message2-top{
		height: 34upx;
		margin-top: 24upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
	}
	.message2-top input{
		margin-left: 62upx;
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(74,74,74,1);
	}
	.message2-bottom{
		margin-top: 18upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.message4{
		width: 100%;
		height: 116upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message4-content{
		height: 116upx;
		width: 686upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message4-box{
		width: 646upx;
		height: 116upx;
	}
	.message4-box text{
		color:rgba(74,74,74,1);
	}
	.rule{
		width: 100%;
		height: 136upx;
		margin-top: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.rule-content{
		width: 648upx;
		height: 136upx;
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		flex-direction: column;
	}
	.rule-title{
		color:rgba(74,74,74,1);
	}
	.rule-message{
		margin-top: 14upx;
		height: 44upx;
		line-height: 44upx;
		color:rgba(155,155,155,1);
	}
	.rule2{
		width: 100%;
		height: 520upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.rule2-content{
		width: 686upx;
		height: 520upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items:flex-start;
	}
	.rule2-content-box{
		margin-top: 26upx;
		width: 646upx;
	}
	.content-bottom{
		position: absolute;
		width: 100%;
		height: 88upx;
		bottom: 0upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Pop-bottom{
		width: 100%;
		height: 88upx;
		bottom: 0upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bottom-content{
		width: 646upx;
		height: 88upx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
	}
	.Pob-bottom-content{
		width: 686upx;
		height: 88upx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
	}
	.bottom-content-left text{
		color:rgba(51,51,51,1);
	}
	.bottom-content-left cmd-icon{
		margin-left: 20upx;
	}
	.money{
		margin-left: 24upx;
	}
	.detail{
		margin-left: 52upx;
	}
	.submit_bg{
		width:124upx;
		height:44upx;
		background:rgba(60,188,99,0.12);
		border-radius:22upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.submit{
		font-size:22upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(60,188,99,1);
	}
	.content-bottom2{
		position: absolute;
		width: 100%;
		height: 88upx;
		bottom: 34upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bottom2-content{
		width: 177px;
		height: 88upx;
		background:rgba(61,188,99,1);
		border-radius:22px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bottom2-content-mid{
		width: 122upx;
		height: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bottom2-content-mid view{
		color:rgba(255,255,255,1);
	}

	.Popup{
		width: 100%;
		background:rgba(255,255,255,1);
		border-radius:24px 24px 0px 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		/* margin-bottom: 88upx; */
	}
	.Popcontent{
		width: 686upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.Pop-content-top{
		width: 686upx;
		margin-top: 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.Pop-top-left text{
		font-size:24upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(51,51,51,1);
	}
	.Pop-content-mid{
		width: 686upx;
		margin-top: 28upx;
		margin-bottom: 16upx;
		display: flex;
		justify-content: space-between;
	}
	.Pop-content-mid text{
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(74,74,74,1);
	}
	.Pop-content-bottom{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.Pop-bottom-list{
		width:120upx;
		height:44upx;
		border-radius:8upx;
		margin: 10upx 46upx 10upx 0upx;
		border:1px solid rgba(151,151,151,0.17);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Pop-bottom-list text{
		font-size:20upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(74,74,74,1);
	}
	.Pop-detail-mid{
		width: 686upx;
		height: 72upx;
		margin-top: 36upx;
		margin-bottom: 18upx;
		display: flex;
		justify-content: space-between;
	}
	.Pop-detail-mid text{
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(74,74,74,1);
	}
	.mid-left{
		display: flex;
		align-items: flex-start;
	}
	.mid-right{
		display: flex;
		align-items: flex-end;
	}
	.Pop-detail-bottom{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
	}
	.Pop-detail-bottom text{
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(74,74,74,1);
	}
	.Pop-bottom-detail{
		width: 306upx;
		height: 68upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.Pop-bottom-sum{
		width: 100%;
		height: 108upx;
		margin-bottom: 10upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
</style>