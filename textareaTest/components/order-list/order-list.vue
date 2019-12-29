<template>
	<view>
		<view class="orderList" @click="isShowValue">
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
									<view class="countDown" v-show="showCountDown">
										<uni-countdown :show-day="false" :hour="12" :minute="12" :second="12" border-color="#FFFFFF" color="#FE5400"
										 splitorColor="#FE5400">
										</uni-countdown>
									</view>
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
					<view class="date-left">
						<text class="date-title">入住</text>
						<view class="date-date">
							<text>{{beginDate}}</text>
							<text>星期{{beginDateWeek}}</text>
						</view>
					</view>
					<view class="date-mid">
						<text>共 {{dateSum}} 晚</text>
					</view>
					<view class="date-left">
						<text class="date-title">离店</text>
						<view class="date-date">
							<text>{{endDate}}</text>
							<text>星期{{endDateWeek}}</text>
						</view>
					</view>
					
				</view>
				<calendar @btn="btn"  @change="changeDate" :modal="true" :show="showCaledar"></calendar>
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
							<image src="../../static/orderPicture/right.svg" mode=""></image>
						</view>
					</view>
				</view>
				<calendar @btn="btn"  @change="changeDate" :modal="true" :show="showCaledar"></calendar>
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
							<input type="text" value="" placeholder="请输入真实姓名" />
						</view>
						<view class="message-mid">
							<text class="fontStyle12">联系电话</text>
							<input type="text" value="" :placeholder="phoneNumber" />
						</view>
						<view class="message-bottom" @click="togglePopup('bottom', 'two')">
							<view class="message-left">
								<text class="fontStyle12">房间保留至</text>
							</view>
							<view class="message-right">
								<text class="fontStyle12">{{time}}</text>
								<image src="../../static/orderPicture/right.svg" mode=""></image>
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
							<input type="text" value="" :placeholder="phoneNumber" />
						</view>
						<view class="message2-bottom">
							<view class="message2-left">
								<text class="fontStyle12">预约人数</text>
							</view>
							<view class="message2-right">
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
							<input type="text" value="" placeholder="请输入真实姓名" />
						</view>
						<view class="message-mid">
							<text class="fontStyle12">联系电话</text>
							<input type="text" value="" :placeholder="phoneNumber" />
						</view>
						<view class="message3-bottom">
							<text class="fontStyle12">身份证</text>
							<input type="text" value="" placeholder="取票时需要出示身份证" />
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
							<input type="text" value="" placeholder="请输入真实姓名" />
						</view>
						<view class="message-mid">
							<text class="fontStyle12">联系电话</text>
							<input type="text" value="" :placeholder="phoneNumber" />
						</view>
					</view>
				</view>
			</view>

			<view class="rule" v-show="showRule1">
				<view class="rule-content">
					<view class="fontStyle12">
						<view class="rule-title">退改规则</view>
						<view class="rule-message">{{messageContent}}</view>
					</view>
				</view>
			</view>
						
			<view class="content-bottom" v-show="showBottom1">
				<view class="bottom-content">
					<view class="bottom-content-left" @click="togglePopup('bottom', 'one')" >
						<text  class="fontStyle12">
							<text>全款支付</text>
							<text class="money">{{moneys}}</text>
							<text class="detail">明细</text>
						</text>
						<image src="../../static/orderPicture/top.svg" mode=""></image>
					</view>
					<view class="submit_bg" @click="submit">
						<text class="submit">提交订单</text>
					</view>
				</view>
			</view>
	        <!-- 商户 -->
			<view class="content-bottom2" v-show="showBottom2" @click="submit" >
				<button type="primary"  class="fontStyle14">{{orderMessage}}</button>
			</view>
			
			<!-- 订单明细弹窗 -->
		    <uni-popup ref="one" :type="type" :custom="true"  @change="change">
		    	<view class="Popup">
		    		<view class="Popcontent">
		    			<view class="Pop-content-top">
		    				<view class="Pop-top-left">
		    					<text class="fontStyle12">明细</text>
		    				</view>
		    				<view class="Pop-top-right" @click="cancel('one')">
								 <image src="../../static/orderPicture/cancel.svg" mode=""></image>
		    				</view>
		    			</view>
		    			<view class="Pop-detail-mid">
		    				<view class="mid-left">
		    					<text class="fontStyle11">房费</text>
		    				</view>
		    				<view class="mid-right">
		    					<text class="fontStyle11">{{moneys}}</text>
		    				</view>
		    			</view>
						
		    			<view class="main">
		    				<scroll-view scroll-y class="Pop-detail-bottom">
							
		    					<view class="Pop-bottom-detail" v-for="(item,index) in stayTime" :key="index">
		    						<view class="Pop-bottom-date">
		    							<text class="fontStyle11">{{item.date}}</text>	
		    						</view>
		    						<view class="Pop-bottom-money">
		    							<text class="fontStyle11">{{item.money}}</text>	
		    						</view>
		    					</view>
		    				</scroll-view>
		    				<view class="Pop-bottom-sum">
		    					<view class="Pop-bottom-sum-left">
		    						<text class="fontStyle11">总价</text>
		    					</view>
		    					<view class="Pop-bottom-sum-right">
		    						<text class="fontStyle11">{{moneys}}</text>
		    					</view>
		    				</view>
		    			</view>
					     
						 <view class="Pop-bottom" >
					    	<view class="Pob-bottom-content">
					    		<view class="bottom-content-left" @click="togglePopup('bottom', 'one')">
					    			<text  class="fontStyle12">
					    				<text>全款支付</text>
					    				<text class="money">{{moneys}}</text>
					    				<text class="detail">明细</text>
					    			</text>
					    			<image src="../../static/orderPicture/top.svg" mode=""></image>
					    		</view>
					    		<view class="submit_bg">
					    			<text class="submit" @click="submit">提交订单</text>
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
		    					<text class="fontStyle12">预计到电</text>
		    				</view>
		    				<view class="Pop-top-right" @click="cancel('two')">
								<image src="../../static/orderPicture/cancel.svg" mode=""></image>
		    				</view>
		    			</view>
		    			<view class="Pop-content-mid">
		    				<text class="fontStyle11">房间整晚保留,12：00前到店可能需要等房</text>
		    			</view>
		    			<view class="Pop-content-bottom">
		    				<view :class="isChoose==index?'tagDate':'Pop-bottom-list'" v-for="(item,index) in Poplist" :key="index">
		    						<text @click="changeTime" :data-date="item" :data-id="index">{{item}}</text>
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
	import wlpNumberShopping from "../../components/wlp-number-shopping/wlp-number-shopping.vue"
	import calendar from '../../components/date-picker/date-picker.vue'
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		components: {
			uniPopup,
			wlpNumberShopping,
			calendar,
			uniCountdown,
			uniTag
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
			showCountDown:{
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
				default:"支付成功后不可退，如未兑换将扣除全额费用"
			},
			goodsMag:{
				type:String,
				default:"请在出行的前一日18：00前预定"
			},
			orderMessage:{
				type:String,
				default:"免费预约"
			}
		},
		data() {
			return {
				goodsName:"桃花源禅意民宿商户",
				goodsPicture:"/static/orderPicture/1.6.jpg",
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
				dateData:'',
				isChoose:4,
				address:"陕西省西安市雁塔区高新四路和科技路交叉口处 高新九号广场10号楼",
			    Poplist:[
			    	"14:00","15:00","16:00","17:00",
			    	"18:00","19:00","20:00","21:00",
			    	"22:00","23:00","24:00","次日01:00",
			    	"次日02:00","次日03:00","次日04:00","次日05:00",
			    	"次日06:00"
			    ],
				stayTime:[],
				num:2,
				deliveryType:"快递运输",
			    deliveryDate:"工作日与周末都可收货",
				tag:[
					{
						tagId:0,
						tagText:"快速配送",
						tagType:"success"
					},
					{
						tagId:1,
						tagText:"上门自提",
						tagType:"default"
					},
				],
				tagNext:[
					{
						tagId:0,
						tagText:"工作日与周末都可收货",
						tagType:"default"
					},
					{
						tagId:1,
						tagText:"只可工作日收货",
						tagType:"default"
					},
					{
						tagId:2,
						tagText:"只可周末收货",
						tagType:"success"
					},
				],
				
			}
		},
		onLoad() {
			this.init();
		},
		created() {
			this.init();
		},
		methods: {
			isShowValue(){
				console.log(this.isShow)
			},
			init(){
				    let date = new Date();
					let year = date.getFullYear(),month = date.getMonth()+1,day = date.getDate();
					let today = year+"-"+month+"-"+day;
					let dayCount = new Date(year,month,0);
					if(day == dayCount){
						month = month + 1;
						day = 0;
					}
					let tomorrow = year+"-"+month+"-"+(day+1);
					let aftertomorrow = year+"-"+month+"-"+(day+2);
					let todayDate=[
						{
							date:today,
							money:this.num+"*"+this.goodsPrice
						},
						{
							date:tomorrow,
							money:this.num+"*"+this.goodsPrice
						}
					];
					this.stayTime = todayDate;	
				},
			//弹框弹出和取消事件
			togglePopup(type, open) {
				this.type = type;
				this.$refs[open].open();
			},	
			cancel(type) {
				this.$refs[type].close()
			},
			//弹框状态
			change(e) {
				console.log(e.show)
			},
			//点击入住时间修改页面的入住时间
			changeTime(e){
				this.time=e.currentTarget.dataset.date;
				this.isChoose = e.currentTarget.dataset.id;
			},
			//修改数字按钮框动态修改钱数
			changeNumber(e){
				this.moneys=e*this.goodsPrice*this.dateSum;
				this.num = e;
			},
			//将子组件中底部提交事件暴露给父元素
			submit(){
				this.$emit('submit')
			},
			//将特产message5部分点击地址事件暴露给父元素
			goAddressPage(){
				this.$emit('goAddressPage')
			},
			//日历组件点击完成修改开始和结束时间
		    changeDate({ choiceDate, dayCount}) {
				this.beginDate = choiceDate[0].month+"月"+choiceDate[0].day+"日";
		    	this.endDate = choiceDate[1].month+"月"+choiceDate[1].day+"日";
		    	this.beginDateWeek = choiceDate[0].week;
		    	this.endDateWeek =  choiceDate[1].week;
		    	this.dateSum = dayCount; 
				this.dateData = this.beginDate +"-"+ this.endDate+" 共"+this.dateSum+"晚" ;
				
		    },
			//日历组件点击完成修改明细列表
			btn(stayArr){
				let myStayArr = stayArr.Popdetail;
				this.stayTime.length=0;
				for (var i = 0; i < myStayArr.length-1; i++) {
					let obj = {
						date:myStayArr[i],
						money:this.num+"*"+this.goodsPrice
					}
					this.stayTime.push(obj);
				}
				this.$emit('btn',{dateData:this.dateData})
			},
			//特产页面选择配送方式点击事件
			bindClick(text,type,tagId){
				console.log("点击成功"+text+type+tagId);
				this.deliveryType = text;
				let tagIdNext = 0;
				if(tagId == 0){
					tagIdNext = 1;
				}else{
					tagIdNext = 0;
				}
				if(type == "default"){
					this.tag[tagId].tagType = "success";
					this.tag[tagIdNext].tagType = "default"
				}
			},
			//特产页面选择送货时间点击事件
			bindClick1(text,type,tagId){
				console.log("点击成功"+text+type+tagId);
				this.deliveryDate = text;
				let tagId1 = 0;
				let tagId2 = 0;
				if(tagId == 0){
					tagId1 = 1;
					tagId2 = 2;
				}else if(tagId == 1){
					tagId1 = 0;
					tagId2 = 2;
				}else{
					tagId1 = 0;
					tagId2 = 1;
				}
				if(type == "default"){
					this.tagNext[tagId].tagType = "success";
					this.tagNext[tagId1].tagType = "default"
					this.tagNext[tagId2].tagType = "default"
				}
			},
		    
		
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
	.header-right-mid{
		display: flex;
		margin-top: 12upx;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;
	}
	.header-right-mid text{
		color:rgba(155,155,155,1);
	}
	.countDown{
		height: 32upx;
		line-height: 32upx;
		display: flex;
		justify-content: center;
		align-items: center;
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
		height:168upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.order-date{
		width: 686upx;
		height:168upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.date-left{
		width: 186upx;
		height: 128upx;
		margin:0 20upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	
	}
	.date-title{
		text-align: center;
		font-size:24upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.date-date{
		margin-top: 52upx;
		font-size:24upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.date-mid{
		width:160upx;
		height:68upx;
		border-radius:8upx;
		border:2upx solid rgba(220,220,220,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.date-mid text{
		font-size:28upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(151,151,151,1);
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
	.order-content2-right{
		height: 32upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.order-content2-right image{
		width: 24upx;
		height: 24upx;
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
	.message-right{
		height: 32upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message-right image{
		width: 24upx;
		height: 24upx;
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
	.bottom-content-left image{
		width: 24upx;
		height: 24upx;
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
		position: fixed;
		width: 100%;
		height: 88upx;
		bottom: 0upx;
	}
	.content-bottom2 button{
		border-radius: 0upx;
		height: 100%;
		line-height: 88upx;
		background:rgba(61,188,99,1);
		color:rgba(255,255,255,1);
	}

	.Popup{
		width: 100%;
		background:rgba(255,255,255,1);
		border-radius:24px 24px 0px 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		
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
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(51,51,51,1);
	}
	.Pop-top-right image{
		width: 24upx;
		height: 24upx;
	}
	.Pop-content-mid{
		width: 686upx;
		margin-top: 28upx;
		margin-bottom: 16upx;
		display: flex;
		justify-content: space-between;
	}
	.Pop-content-mid text{
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
	.tagDate{
		width:120upx;
		height:44upx;
		border-radius:8upx;
		margin: 10upx 46upx 10upx 0upx;
		background:rgba(60,188,99,0.11);
		border:1px solid rgba(60,188,99,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tagDate text{
		font-size:10px;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(60,188,99,1);
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
	.main{
		width: 100%;
		display: flex;
		flex-direction: column;	
	}
	.Pop-detail-bottom{
		width: 100%;
		height: 204upx;
	}
	.Pop-detail-bottom text{
		color:rgba(74,74,74,1);
	}
	.Pop-bottom-detail{
		width: 100%;
		height: 68upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.Pop-bottom-date{
		margin-right: 134upx;
	}
	.Pop-bottom-money{
		
	}
	.Pop-bottom-sum{
		width: 100%;
		height: 108upx;
		margin-bottom: 10upx;
		margin-top: 10upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.Pop-speciality-top{
		width: 686upx;
		margin-top: 34upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.Pop-speciality-mid{
		width: 686upx;
		margin-top: 24upx;
		margin-bottom: 34upx;
	}
	.Pop-mid-bottom{
		height: 56upx;
		margin-top: 28upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.Pop-speciality-main{
		width: 100%;
		height: 256upx;
		margin-bottom: 108upx;
	}
	.Pop-main-bottom{
		height: 152upx;
		margin-top: 30upx;
		margin-bottom: 30upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
	}
	.tag{
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tag0{
		width: 140upx;
		margin-right: 38upx;
	}
	.tag1{
		width: 140upx;
		margin-right: 38upx;
	}
	.tag2{
		width: 288upx;
		margin-right: 70upx;
		margin-bottom: 30upx;
	}
	.tag3{
		width: 288upx;
		margin-bottom: 30upx;
	}
	.tag4{
		width: 288upx;
		margin-right: 70upx;
		margin-bottom: 30upx;
	}
	
</style>
