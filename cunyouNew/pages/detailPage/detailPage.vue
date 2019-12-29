<template>
	<view class="content">
		<!-- 头部 -->
		<view class="detail_header">
			<view class="detail_header_content">
				<view class="detail_header_top">
					<image src="/static/1.6.jpg" mode="scaleToFill"></image>
					<robby-tags :value="tagList" :bg-color-type="colorType" class="tag"></robby-tags>
					<view class="collect">
						<uni-icon type="star-filled" size="30" :color="color" @click="collect"></uni-icon>
					</view>		
				</view>
				<view class="detail_header_bottom">
					<view class="detail_header_bottom_title">
						<view class="title_content">
							<view class="title_content_left">
								<text class="title_content_name">桃花源禅意民宿</text>
								<text class="title_content_label">钓鱼|采摘|避暑|私汤|山庄</text>
							</view>
							<view class="title_content_right">
		                         <image src="../../static/orderPicture/phone.svg"></image>
							</view>
							
						</view>
						
					</view>
					<view class="detail_header_bottom_address">
						<view class="address">
							<!-- 点击跳转到商家地图 -->
							<uni-icon type="location" size="10"></uni-icon>
							<text class="address">西安市长安区风铃路190号</text>
						</view>
						<text class="diatance">12.20KM</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 会员卡权益 -->
		<view class="detail_vippower">
			<view class="detail_vip">
				<view class="detail_vippower_title">
					<view class="detail_vippower_title_name">
						会员卡权益
					</view>
					<view class="detail_vippower_title_ewm">
						<view class="ewm_bg">
							<text >出示二维码</text>
						</view>
						
					</view>
				</view>
				<view class="detail_vippower_content">
					充100送10元，充200送25元，充300元送40元
				</view>
			</view>
			
		</view>
		<!-- 商户服务 -->
		<view class="detail_server">
			<view class="server">
				<view class="detail_server_content">
					<view class="detail_server_title">
						商户服务
					</view>
					<view class="server_content">
						<view class="serverdata" v-for="(item,index) in serverdata" :key="index">
							<view class="serverdata_content">
								<view class="server_logo">
									<image :src="item.imgsrc" mode="scaleToFill"></image>
								</view>
								<view class="sever_title">
									{{item.title}}
								</view>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 具体项目 -->
		<view class="detail_content">
			<view class="detail_content_part" v-for="(item,index) in contentdata" :key="index">
				<view class="detail_content_data">
					<view class="detail_content_title">
						{{item.title}}
					</view>
					<view class="detail_content_main" v-for="(item,index) in item.main" :key="index">
						<view class="detail_content_left">
							<image :src="item.imgsrc" mode="scaleToFill"></image>
						</view>
						<view class="detail_content_right">
							<view class="right_left">
								<text class="content_type">{{item.type}}</text>
								<text class="content_server">{{item.server}}</text>
							</view>
							<view class="right_right">
								<text class="content_top">{{item.vip}}</text>
								<text class="content_mid">{{item.price}}</text>
								<view class="content_order_bg" @click="goOrderPage">
									<text class="order">
										立即预定
									</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 推荐理由 -->
		<view class="detail_keypoint">
			<view class="keypoint">
				<view class="detail_keypoint_title">
					<text class="keypoint_title">推荐理由</text>
				</view>
				<view class="detail_keypoint_content">
					<view class="keypoint_top">
						<text class="keypoint_part">{{keypoint_part1}}</text>
					</view>
					<view class="keypoint_mid">
						<image :src="keypoint_img" mode=""></image>
					</view>
					<view class="keypoint_bottom">
						<text class="keypoint_part">{{keypoint_part2}}</text>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 其他推荐 -->
		<view class="detail_another">
			<view class="detail_another_title">
				<text class="another_title">其他推荐</text>	
			</view>
			<view class="detail_content_part" v-for="(item,index) in anotherdata" :key="index">
				<view class="detail_content_data">
					<view class="detail_content_title">
						{{item.title}}
					</view>
					<view class="detail_content_main" v-for="(item,index) in item.main" :key="index">
						<view class="detail_content_left">
							<image :src="item.imgsrc" mode="scaleToFill"></image>
						</view>
						<view class="detail_content_right">
							<view class="right_left">
								<text class="content_type">{{item.type}}</text>
								<text class="content_server">{{item.server}}</text>
							</view>
							<view class="right_right">
								<text class="content_top">{{item.vip}}</text>
								<text class="content_mid">{{item.price}}</text>
								<view class="content_order_bg">
									<text class="order">
										立即预定
									</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 免费预约 -->
		<view class="detail_order">
			<view class="detail_order_content">
				<view class="order_left">
					<text class="order_left_content">部分服务免费预约，立即填写表单告知商家</text>
				</view>
				<view class="order_right" @click="goOrderPage">
					<view class="order_bg">
						<text class="order_free">免费预约</text>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import robbyTags from '@/components/robby-tags/robby-tags.vue'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {robbyTags,uniIcon},
		data() {
			return {
				color:"#FFFFFF",
				colorType:"new",
				tagList: ['建筑','动漫','艺术'],
				keypoint_part1:"广新园民族村位于长安区沣裕口进山20公里处，西安市国内旅游定 点单位广新园民族村位于长安区沣裕口进山20公里处，西安市国内 旅游定点单位广新园民族村位于长安区沣裕口进山20公里处，西安 市国内旅游定点单位广新园民族村位于长安区沣裕口进山20公里处 西安市国内旅游定点单位广新园民族村位于长安区沣裕口进山20公 里处，西安市国内旅游定点单位",
				keypoint_part2:"广新园民族村位于长安区沣裕口进山20公里处，西安市国内旅游定 点单位广新园民族村位于长安区沣裕口进山20公里处，西安市国内 旅游定点单位广新园民族村位于长安区沣裕口进山20公里处，西安 市国内旅游定点单位广新园民族村位于长安区沣裕口进山20公里处 西安市国内旅游定点单位广新园民族村位于长安区沣裕口进山20公 里处，西安市国内旅游定点单位",
				keypoint_img:"../../static/1.6.jpg",
				serverdata:[
					{
						imgsrc:"../../static/img.png",
						title:"无线网络"
					},
					{
						imgsrc:"../../static/img.png",
						title:"无线网络"
					},
					{
						imgsrc:"../../static/img.png",
						title:"无线网络"
					}
				],
				contentdata:[
					{
						title:"住宿",
						main:[
							{
								imgsrc:"../../static/1.6.jpg",
								type:"单人间",
								vip:"会员价￥150",
								price:"$180",
								server:"无早餐·15M²·大床"	
							},
							{
								imgsrc:"../../static/1.6.jpg",
								type:"单人间",
								vip:"会员价￥150",
								price:"$180",
								server:"无早餐·15M²·大床"	
							}
						]
					},
					{
						title:"垂钓",
						main:[
							{
								imgsrc:"../../static/1.6.jpg",
								type:"单人间",
								vip:"会员价￥150",
								price:"$180",
								server:"无早餐·15M²·大床"	
							},
							{
								imgsrc:"../../static/1.6.jpg",
								type:"单人间",
								vip:"会员价￥150",
								price:"$180",
								server:"无早餐·15M²·大床"	
							}
						]
					}
				],
			    anotherdata:[
					{
						title:"垂钓",
						main:[
							{
								imgsrc:"../../static/1.6.jpg",
								type:"单人间",
								vip:"会员价￥150",
								price:"$180",
								server:"无早餐·15M²·大床"	
							},
							{
								imgsrc:"../../static/1.6.jpg",
								type:"单人间",
								vip:"会员价￥150",
								price:"$180",
								server:"无早餐·15M²·大床"	
							}
						]
					}
				]
			}
		},
		methods: {
			call(){
				uni.makePhoneCall({
					phoneNumber:"15029092646",
					success:function(){
						console.log("通啦....")
					}
				})
			},
			collect(){
				if(this.color=="#FFFFFF"){
					this.color="#333333"
				}else{
					this.color="#FFFFFF"
				}
			},
			goOrderPage(e){
				console.log(e)
				uni.navigateTo({
					url:'../orderPage/business',
					success:function(){
						console.log("成功跳转")
					}
				})
			}
		}
	}
</script>

<style>
.detail_header{
	width: 100%;
	height:400upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.detail_header_content{
	width:686upx;
	height:396upx;
	background:rgba(255,255,255,1);
	box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
	border-radius:24upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}
.detail_header_top{
	width:646upx;
	height:220upx;
	border-radius:12upx;
	margin-top: 26upx;
	display: flex;
	flex-wrap: wrap;
}
.detail_header_top image{
	width:646upx;
	height:220upx;
	border-radius:12upx;
}
.tag{
	position: absolute;
	margin-top: 170upx;
	background:rgba(0,0,0,0.5);
}
.collect{
	width: 48upx;
	height: 48upx;
	position: absolute;
	margin-top: 20upx;
	margin-left: 578upx;
}
.collectDefault{
	background-color: #FFFFFF;
}
.collectColor{
	background-color: #FE5400;
}
.collect image{
	width: 48upx;
	height: 48upx;
}
.detail_header_bottom{
	width:646upx;
	height:150upx;
	align-items: center;
	
}
.detail_header_bottom_title{
	margin-top: 14upx;
	
}
.title_content{
	display: flex;
	justify-content: space-between;
}
.title_content_left{
	width:610upx;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
}
.title_content_right{
	width:36upx;
	
}
.title_content_right image{
	width:36upx;
	height:36upx;
}
.title_content_name{
	font-size:26upx;
	font-family:PingFangSC-Medium;
	font-weight:700;
	color:rgba(74,74,74,1);
}
.title_content_label{
	margin-top: 8upx;
	font-size:22upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(155,155,155,1);
}
.detail_header_bottom_address {
	margin-top: 8upx;
	display: flex;
	justify-content: space-between;
}
.detail_header_bottom_address text{
	font-size:22upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(155,155,155,1);
}
.address{
	width: 286upx;
	height: 32upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address image{
	width:20upx;
	height:26upx;
	margin-right: 6upx;
}

.detail_vippower{
	width: 100%;
	height:122upx;
	margin-top: 20upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.detail_vip{
	width:686upx;
	height:118upx;
	background:rgba(255,255,255,1);
	box-shadow:0px 4upx 44upx 0px rgba(0,0,0,0.05);
	border-radius:24upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}
.detail_vippower_title{
	margin-top: 24upx;
	width: 646upx;
	height:44upx;
	display: flex;
	justify-content: space-between;
}
.detail_vippower_title_name{
	font-size:26upx;
	font-family:PingFangSC-Medium;
	font-weight:700;
	color:rgba(51,51,51,1);
}
.ewm_bg{
	width:124upx;
	height:44upx;
	background:rgba(60,188,99,0.12);
	border-radius:22upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.ewm_bg text{
	font-size:22upx;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(60,188,99,1);
}
	
.detail_vippower_content{
	margin-top: 8upx;
	width: 646upx;
	height:36upx;
	font-size:22upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(155,155,155,1);
}
.detail_server{
	width: 100%;
	height:180upx;
	margin-top: 20upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.server{
	width:686upx;
	height:176upx;
	background:rgba(255,255,255,1);
	box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
	border-radius:24upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.detail_server_content{
	width: 646upx;
	height:176upx;
	display: flex;
	flex-direction: row;
}
.detail_server_title{
	margin-top: 28upx;
	width: 112upx;
	font-size:26upx;
	font-family:PingFangSC-Medium;
	font-weight:700;
	color:rgba(51,51,51,1);
}
.server_content{
	width: 506upx;
	margin:42upx 0upx 0upx 70upx;
	display: flex;
	justify-content: space-between;
}
.serverdata{
	width: 88upx;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.serverdata_content{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.server_logo{
	width:50upx;
	height:50upx;
}
.server_logo image{
	width:50upx;
	height:36upx;
}
.sever_title{
	margin-top: 30upx;
	font-size:22upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(155,155,155,1);
}
.detail_content{
	width: 100%;
	margin-top: 20upx;
}
.detail_content_part{
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.detail_content_data{
	margin-top: 20upx;
	width:686upx;
	background:rgba(255,255,255,1);
	box-shadow:0upx 4upx 24upx 0upx rgba(0,0,0,0.05);
	border-radius:14upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.detail_content_title{
	width:646upx;
	margin-top: 16upx;
	margin-bottom: 32upx;
	font-size:26upx;
	font-family:PingFangSC-Medium;
	font-weight:700;
	color:rgba(51,51,51,1);
}
.detail_content_main{
	width:646upx;
	margin-bottom: 20upx;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.detail_content_left{
	width:220upx;
	height:220upx;
	border-radius:12upx;
}
.detail_content_left image{
	width:220upx;
	height:220upx;
	border-radius:12upx;
}
.detail_content_right{
	width:386upx;
	height:220upx;
	margin-left: 20upx;
	display: flex;
	justify-content: space-between;
}
.right_left{
	display: flex;
	flex-direction: column;
}
.right_right{
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}
.content_type{
	margin-top: 20upx;
	font-size:26upx;
	font-family:PingFangSC-Medium;
	font-weight:500;
	color:rgba(74,74,74,1);
}
.content_server{
	margin-top: 112upx;
	font-size:22upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(155,155,155,1);
}
.content_top{
	margin-top: 20upx;
	font-size:20upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(141,81,21,1);
}
.content_mid{
	margin-top: 42upx;
	font-size:26upx;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(254,84,0,1);
}
.content_order_bg{
	margin-top: 38upx;
	width:108upx;
	height:32upx;
	border-radius:18upx;
	border:2upx solid rgba(254,84,0,1);
	display: flex;
	justify-content: center;
	align-items: center;
}
.order{
	font-size:22upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(254,84,0,1);
}
.detail_keypoint{
	width: 100%;
	margin-top: 18upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.keypoint{
	width:686upx;
	background:rgba(255,255,255,1);
	box-shadow:0upx 4upx 24upx 0upx rgba(0,0,0,0.05);
	border-radius:14upx;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.detail_keypoint_title{
	margin-top: 20upx;
	width: 644upx;
}
.keypoint_title{
	font-size:26upx;
	font-family:PingFangSC-Medium;
	font-weight:700;
	color:rgba(51,51,51,1);
}
.detail_keypoint_content{
	width: 644upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.keypoint_top{
	width: 100%;
	margin-top: 12upx;
}
.keypoint_part{
	width:100%;
	font-size:22upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:24upx;
}
.keypoint_mid{
	width: 100%;
	height: 220upx;
	margin-top: 14upx;
}
.keypoint_mid image{
	width:646upx;
	height:220upx;
	border-radius:12upx;
}
.keypoint_bottom{
	margin-top: 20upx;
	width: 100%;
}
.detail_another{
	width: 100%;
	margin-top: 20upx;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.detail_another_title{
	width: 646upx;
	margin-top: 20upx;
}
.another_title{
	font-size:26upx;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(51,51,51,1);
}
.detail_order{
	width: 100%;
	height:96upx;
	margin-top: 20upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.detail_order_content{
	width: 644upx;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.order_left{
	display: flex;
	justify-content: center;
	align-items: center;
}
.order_left_content{
	font-size:22upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(51,51,51,1);
}
.order_bg{
	width:124upx;
	height:44upx;
	background:rgba(60,188,99,0.2);
	border-radius:22upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.order_free{
	font-size:22upx;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(60,188,99,1);
}
	
</style>
