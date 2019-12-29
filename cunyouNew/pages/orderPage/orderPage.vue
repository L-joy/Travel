<template>
	<view>
		<view class="content">
			<view class="header">
				<view class="header-content">
					<view class="header-box">
						<view class="header-top">
							<text>{{goodsName}}</text>
						</view>
						<view class="header-bottom">
							<view class="header-bottom-left">
							  <image :src="goodsPicture" mode=""></image>
							</view>
							<view class="header-bottom-right">
								<view class="header-right-top">
									<text>{{goodsType}}</text>
								</view>
								<view class="header-right-mid">
									<text>{{goodsMag}}</text>
								</view>
								<view class="header-right-bottom">
									<view class="header-right-left">
										￥{{goodsPrice}}
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
			<view class="message">
				<view class="message-content">
					<view class="message-box">
						<view class="message-top">
							<text>入住人</text>
							<input type="text" value="" placeholder="请输入真实姓名"/>
						</view>
						<view class="message-mid">
							<text>联系电话</text>
							<input type="text" value="" :placeholder="phoneNumber"/>
						</view>
						<view class="message-bottom" @click="togglePopup('bottom', 'two')">
							<view class="message-left">
								<text>房间保留至</text>
							</view>
							<view class="message-right" >
								<text>{{time}}</text>
								<cmd-icon  type="chevron-right" size="16" color="#333333"></cmd-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="rule">
				<view class="rule-content">
					<text class="rule-title">退改规则</text>
					<text class="rule-message">支付成功后不可退，如未入住将扣除全额费用，房间整晚保留，请及时入住</text>
				</view>
			</view>
			<view class="content-bottom" >
				<view class="bottom-content">
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
	export default {
		components: {
			uniPopup,
			uniIcon,
			cmdIcon,
			wlpNumberShopping
		},
		data() {
			return {
				goodsName:"桃花源禅意民宿商户",
				goodsPicture:"/static/1.6.jpg",
				goodsType:"单人间",
				goodsMag:"请在出行的前一日18：00前预定",
				goodsPrice:180,
				phoneNumber:"15029092646",
				moneys:"￥1080",
				type: '',
				time:'18:00',
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
		methods: {
			togglePopup(type, open) {
				this.type = type;
				this.$refs[open].open();
			},
			cancel(type) {
				this.$refs[type].close();
			},
			change(e) {
				console.log(e.show)
			},
			changeTime(e){
				this.time=e.currentTarget.dataset.date;
			},
			changeNumber(e){
				this.moneys=e*this.goodsPrice*this.Popdetail.length;
				
				for (var i = 0; i < this.Popdetail.length; i++) {
					this.Popdetail[i].money=e+"*"+this.goodsPrice;
				}
				
			}
		}
	}
</script>
<style>
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
		font-size:26upx;
		font-family:PingFangSC-Medium;
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
	}
	.header-bottom-left image{
		width: 220upx;
		height: 220upx;
	}
	
	.header-bottom-right{
		width: 406upx;
		height: 220upx;
	}
	.header-right-top text{
		font-size:26upx;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(74,74,74,1);
	}
	.header-right-mid text{
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
	}
	.header-right-bottom{
		margin-top: 84upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header-right-left{
		font-size:26upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(254,84,0,1);
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
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
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
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(74,74,74,1);
	}
	.rule-message{
		margin-top: 14upx;
		height: 44upx;
		line-height: 44upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
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
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
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
	.example-body {
		border-top: 1px #f5f5f5 solid;
		padding: 30upx;
		background: #fff
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