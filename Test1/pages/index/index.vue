<template>
	<view class="content">
		<orderList :showHeader1="true"></orderList>
		
		<view class="message5">
			<view class="message5-content">
				<view class="message5-box">
					<view class="message5-top" >
						<view class="fontStyle12">送至</view>
						<view class="message5-top-right" @click="goAddressPage">
							<view class="message5-top-content fontStyle12">
								<view>
									<text>{{address}}</text>
									<view v-if="tagHome" class="tagHome">家</view>
									<view v-if="tagSchool" class="tagSchool">学校</view>
									<view v-if="tagCompany" class="tagCompany">公司</view>
									<view v-if="tagDefault" class="tagDefault">默认</view>
								    <view v-if="tagAnother" class="tagAnother">其他</view>
								</view>
								
							</view>
		                    <cmd-icon type="chevron-right" size="16" color="#333333"></cmd-icon>
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
						<cmd-icon type="chevron-right" size="16" color="#333333" ></cmd-icon>
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
	    				<view class="Pop-top-right">
	    					 <cmd-icon type="close" size="12" color="#333333" @click="cancel('three')"></cmd-icon>
	    				</view>
	    			</view>
	    			<view class="Pop-speciality-mid">
	    				 <view class="Pop-mid-top">
	    					<text class="fontStyle12">配送方式</text>
	    				 </view>
	    				 <view class="Pop-mid-bottom">
	    					<uni-tag :text="tag[0].tagText" :type="tag[0].tagType" :tagId="tag[0].tagId" @click="bindClick(tag[0].tagText,tag[0].tagType,tag[0].tagId)" inverted="true" class="tag tag0"></uni-tag>
	    					<uni-tag :text="tag[1].tagText" :type="tag[1].tagType" :tagId="tag[1].tagId" @click="bindClick(tag[1].tagText,tag[1].tagType,tag[1].tagId)" inverted="true" class="tag tag1"></uni-tag>
	    					
	    				 </view>
	    			</view>
	    			
	    			<view class="Pop-speciality-main">
	    				<view class="Pop-main-top">
	    					<text class="fontStyle12">送货时间</text>
	    				</view>
	    				<view class="Pop-main-bottom">
	    					<uni-tag :text="tagNext[0].tagText" :type="tagNext[0].tagType" :tagId="tagNext[0].tagId" @click="bindClick1(tagNext[0].tagText,tagNext[0].tagType,tagNext[0].tagId)" inverted="true" class="tag tag2"></uni-tag>
	    					<uni-tag :text="tagNext[1].tagText" :type="tagNext[1].tagType" :tagId="tagNext[1].tagId" @click="bindClick1(tagNext[1].tagText,tagNext[1].tagType,tagNext[1].tagId)" inverted="true" class="tag tag3"></uni-tag>
	    					<uni-tag :text="tagNext[2].tagText" :type="tagNext[2].tagType" :tagId="tagNext[2].tagId" @click="bindClick1(tagNext[2].tagText,tagNext[2].tagType,tagNext[2].tagId)" inverted="true" class="tag tag4"></uni-tag>
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
    import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		components:{
			orderList,
			cmdIcon,
			uniPopup,
			uniTag
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
.message5{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.message5-content{
		height: 256upx;
		width: 686upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message5-box{
		width: 646upx;
		height: 256upx;
	}
	.message5-box text{
		color:rgba(51,51,51,1);
	}
	.message5-top{
		width: 100%;
		margin-top: 26upx;
		display: flex;
		justify-content: space-between;
	}
	.message5-top-right{
		width: 530upx;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
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
		margin-left: 8upx;
		padding: 0upx 25upx;
		height: 32upx;
		font-size: 24upx;
		line-height: 32upx;
		background: rgba(255,237,181);
		color: rgba(246,172,47);
	}
	.tagSchool{
		display: inline;
		padding: 0upx 25upx;
		margin-left: 8upx;
		height: 32upx;
		font-size: 24upx;
		line-height: 32upx;
		background: rgba(233,248,218);
		color: rgba(134,213,45);
	}
	
	.tagCompany{
		display: inline;
		padding: 0upx 25upx;
		margin-left: 8upx;
		height: 32upx;
		font-size: 24upx;
		line-height: 32upx;
		background: rgba(202,230,250);
		color: rgba(93,157,230);
	}
	.tagDefault{
		display: inline;
		padding: 0upx 25upx;
		margin-left: 8upx;
		height: 32upx;
		font-size: 24upx;
		line-height: 32upx;
		background: rgba(254,178,141);
		color: rgba(254,136,77);
	}
	.tagAnother{
		display: inline;
		padding: 0upx 25upx;
		margin-left: 8upx;
		height: 32upx;
		font-size: 24upx;
		line-height: 32upx;
		background: rgba(255,237,181);
		color: rgba(246,172,47);
	}
	.message-top5{
		height: 34upx;
		margin-top: 20upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
	}
	.message-top5 input{
		margin-left: 42upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
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
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(74,74,74,1);
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
