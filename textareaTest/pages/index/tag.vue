<template>
	<view class="content">
		<orderList :showHeader1="true"></orderList>
		
		<view class="message5">
			<view class="message5-content">
				<view class="message5-box">
					<view class="message5-top" >
						<view class="topStyle">送至</view>
						<view class="message5-top-right" @click="goAddressPage">
							<view class="message5-top-content">
								<view>
									<text>{{address}}</text>
									<view v-if="tagHome" class="tagHome">家</view>
									<view v-if="tagSchool" class="tagSchool">学校</view>
									<view v-if="tagCompany" class="tagCompany">公司</view>
									<view v-if="tagDefault" class="tagDefault">默认</view>
								    <view v-if="tagAnother" class="tagAnother">其他</view>
								</view>
								
							</view>
							<view class="message5-top-image">
								 <image src="../../static/orderPicture/right.svg" mode=""></image>
							</view>
						</view>
					</view>
					<view class="message-top5">
						<text class="fontStyle12">收货人</text>
						<input type="text" value="" placeholder="请输入真实姓名" />
					</view>
					<view class="message5-mid">
						<text class="fontStyle12">联系电话</text>
						<input type="text" value="" :placeholder="phoneNumber" />
					</view>
				</view>
			</view>
		    <view class="message5-delivery">
		    	<view class="message5-delivery-box">
		    		<view class="delivery-left">
		    			<text class="fontStyle12">配送方式</text>
		    		</view>
					<view class="delivery-right" @click="togglePopup('bottom', 'three')">
						<view class="delivery-right-left">
							<view class="delivery-right-top">
								<text class="fontStyle12">{{deliveryType}}</text>
							</view>
							<view class="delivery-right-bottom">
								<text class="fontStyle12">{{deliveryDate}}</text>
							</view>
						</view>
						<image src="../../static/orderPicture/right.svg" mode=""></image>
					</view>
		    	</view>
		    </view>
			<view class="message5-freight">
				<view class="message5-freight-box">
					<view class="freight-left">
						<text class="fontStyle12">运费</text>
					</view>
					<view class="freight-right">
						<text class="fontStyle12">+￥0.00</text>
					</view>
				</view>
			</view>
		</view>
		<orderList :showRule1="true"  
				   	:showBottom1="true" 
				   	:messageContent="message"
				   	@submit="goPayPage"
				   ></orderList>
					
	    <!-- 选择配送方式弹框 -->
	    <uni-popup ref="three" :type="type" :custom="true"  @change="change">
	    	<view class="Popup">
	    		<view class="Popcontent">
	    			<view class="Pop-speciality-top">
	    				<view class="Pop-top-left">
	    					<text class="fontStyle12">确定</text>
	    				</view>
	    				<view class="Pop-top-right" @click="cancel('three')">
	    					 <image src="../../static/orderPicture/cancel.svg" mode=""></image>
	    				</view>
	    			</view>
	    			<view class="Pop-speciality-mid">
	    				 <view class="Pop-mid-top">
	    					<text class="fontStyle12">配送方式</text>
	    				 </view>
	    				 <view class="Pop-mid-bottom">
	    					<view :class="tagFirst==0?'tag':'tag0'"  @click="bindClick(tag[0])">
	    						<text>{{tag[0]}}</text>
	    					</view>
							<view :class="tagFirst==1?'tag':'tag0'"  @click="bindClick(tag[1])">
								<text>{{tag[1]}}</text>
							</view>
	    				 </view>
	    			</view>
	    			
	    			<view class="Pop-speciality-main">
	    				<view class="Pop-main-top">
	    					<text class="fontStyle12">送货时间</text>
	    				</view>
	    				<view class="Pop-main-bottom">
	    					<view :class="tagSecond==0?'tag3':'tag1'" @click="bindClick1(tagNext[0],0)">
	    						<text>{{tagNext[0]}}</text>
	    					</view>
	    					<view :class="tagSecond==1?'tag3 tag2':'tag1 tag2'"  @click="bindClick1(tagNext[1],1)">
	    						<text>{{tagNext[1]}}</text>
	    					</view>
	    					<view :class="tagSecond==2?'tag3':'tag1'"  @click="bindClick1(tagNext[2],2)">
	    						<text>{{tagNext[2]}}</text>
	    					</view>
						</view>
	    			</view>
	    			 
	    			<view class="content-bottom2" @click="cancel('three')">
	    				<button type="primary"  class="fontStyle14">确定</button>
	    			</view> 
	    		</view>
	    	</view> 
	    </uni-popup>
	    
			
	</view>
		
</template>

<script>
	import orderList from "../../components/order-list/order-list.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components:{
			orderList,
			uniPopup
		},
		data() {
			return {
				type:'',
				message:"支付成功后，商家确认发货前可退，已发货后不可退",
				address:"陕西省西安市雁塔区高新四路和科技路交叉口处 高新九号广场10号楼",
				deliveryType:"快递运输",
				deliveryDate:"工作日与周末都可收货",
				tagHome:true,
				tagSchool:false,
				tagCompany:false,
				tagDefault:false,
				tagAnother:false,
				tagFirst:0,
				tagSecond:0,
				phoneNumber:'15029092647',
				tag:["快速配送","上门自提"],
				tagNext:["工作日与周末都可收货","只可工作日收货","只可周末收货"],
				
			}
		},
		
		onLoad() {

		},
		methods: {
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
			//特产页面选择配送方式点击事件
			bindClick(text){
				console.log("点击成功"+text);
				this.deliveryType = text;
				this.tagFirst = !this.tagFirst;
				
			},
			//特产页面选择送货时间点击事件
			bindClick1(text,index){
				console.log("点击成功"+text);
				this.deliveryDate = text;
				this.tagSecond = index;
				
			},
			//点击提交订单跳转到支付订单页面
			goPayPage(){
				uni.navigateTo({
					url:"goodsPayPage"
				})
			},
			//点击地址部分跳转到地址页面
			goAddressPage(){
				console.log("跳转至地址页面")
				uni.navigateTo({
					url:"address"
				})
			}
				

		}
	}
</script>

<style>
	image{
		width: 24upx;
		height: 24upx;
	}
    .message5{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.message5-content{
		width: 686upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.message5-box{
		margin-top: 26upx;
		margin-bottom: 26upx;
		width: 646upx;
	}
	.topStyle{
		font-size:24upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.message5-top{
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
	.message5-top-right{
		width: 530upx;
		height: 100%;
		display: flex;
		justify-content: space-between;
		
	}
	.message5-top-image{
		width: 24upx;
		height: 44upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message5-top-content{
		width: 504upx;
		display: flex;
		align-content: center;
	}
	.message5-top-content text{
		color:rgba(155,155,155,1);
	}
	
	.tagHome{
		display: inline;
		margin-left: 20upx;
		padding: 4upx 30upx;
		font-size: 22upx;
		line-height: 32upx;
		text-align: center;
		background:rgba(255,210,71,0.4);
		border-radius:4upx;
		font-family:PingFangSC;
		font-weight:600;
		color:rgba(245,166,35,1)
	}
	.tagSchool{
		display: inline;
		padding: 4upx 20upx;
		margin-left: 20upx;
		font-size: 22upx;
		line-height: 32upx;
		text-align: center;
		background:rgba(184,233,134,0.3);
		border-radius:4upx;
		font-family:PingFangSC;
		font-weight:600;
		color:rgba(126,211,33,1);
	}
	
	.tagCompany{
		display: inline;
		padding: 4upx 20upx;
		margin-left: 20upx;
		font-size: 22upx;
		line-height: 32upx;
		text-align: center;
		border-radius:4upx;
		background:rgba(81,172,241,0.3);
		font-family:PingFangSC;
		font-weight:600;
		color:rgba(74,144,226,1);
	}
	.tagAnother{
		display: inline;
		padding: 4upx 20upx;
		margin-left: 20upx;
		font-size: 22upx;
		line-height: 32upx;
		text-align: center;
		border-radius:4upx;
		background:rgba(81,172,241,0.3);
		font-family:PingFangSC;
		font-weight:600;
		color:rgba(74,144,226,1);
	}
	.tagDefault{
		display: inline;
		padding: 4upx 20upx;
		margin-left: 20upx;
		font-size: 22upx;
		line-height: 32upx;
		text-align: center;
		border-radius:4upx;
		background:rgba(254,84,0,0.3);
		font-family:PingFangSC;
		font-weight:600;
		color:rgba(254,84,0,1);
	}
	.message-top5{
		height: 34upx;
		margin-top: 30upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
	}
	.message-top5 input{
		margin-left: 42upx;
		font-size:24upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(155,155,155,1);
	}
	.message5-mid{
		margin-top: 32upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
	}
	.message5-mid input{
		margin-left: 20upx;
		font-size:22upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.message5-delivery{
		height: 116upx;
		width: 686upx;
		margin-top: 18upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message5-delivery-box{
		width: 646upx;
		height: 116upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.delivery-left text{
		color:rgba(74,74,74,1);
	}
	.delivery-right text{
		color:rgba(51,51,51,1);
	}
	.delivery-right{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.delivery-right-top{
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		align-items: flex-end;
	}
	.message5-freight{
		height: 96upx;
		width: 686upx;
		margin-top: 20upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message5-freight-box{
		width: 646upx;
		height: 96upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.freight-left text{
		color:rgba(74,74,74,1);
	}
	.freight-right text{
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(254,84,0,1);
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
	.Pop-top-left text{
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(51,51,51,1);
	}
	.Pop-speciality-top{
		width: 686upx;
		margin-top: 34upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.Pop-speciality-mid{
		width: 654upx;
		height: 100%;
		margin-top: 24upx;
		margin-bottom: 34upx;
	}
	.Pop-mid-bottom{
		margin-top: 28upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.tag{
		margin-right: 38upx;
		width:70px;
		height:28px;
		border-radius:4px;
		border:1px solid rgba(216,216,216,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tag text{
		font-size:12px;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.tag0{
		margin-right: 38upx;
		width:70px;
		height:28px;
		border-radius:4px;
		border:1px solid rgba(60,188,99,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tag0 text{
		font-size:12px;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(60,188,99,1);
	}
	.Pop-speciality-main{
		width: 654upx;
		height: 100%;
		margin-top: 34upx;
		margin-bottom: 108upx;
	}
	.Pop-main-bottom{
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
	}
	.tag1{
		margin-top: 30upx;
		width:144px;
		height:28px;
		border-radius:4px;
		border:1px solid rgba(216,216,216,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tag1 text{
		font-size:12px;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.tag2{
		margin-top: 30upx;
		margin-left: 70upx;
	}
	.tag3{
		margin-top: 30upx;
		width:144px;
		height:28px;
		border-radius:4px;
		border:1px solid rgba(60,188,99,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tag3 text{
		font-size:12px;
		font-family:PingFangSC;
		font-weight:400;
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
</style>
