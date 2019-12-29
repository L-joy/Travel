<template>
	<view class="content">
		<!-- 头部 -->
		<view class="detail_header">
			<view class="detail_header_content">
				<view class="detail_header_top">
					<image src="/static/1.6.jpg" mode="scaleToFill"></image>
				</view>
				<view class="detail_header_bottom">
					<view class="detail_header_bottom_title">
						<view class="title_content">
							<text class="title_content_name">桃花源禅意民宿</text>
							<text class="title_content_label">钓鱼|采摘|避暑|私汤|山庄</text>
						</view>
						<view class="title_content_telephone">
							
						</view>
					</view>
					<view class="detail_header_bottom_address">
						<text class="address">西安市长安区风铃路190号</text>
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
				<view class="detail_server_title">
					商户服务
				</view>
				<view class="server_content">
					<view class="serverdata" v-for="(item,index) in serverdata" :key="index">
						<view class="serverdata_content">
							<view class="server_logo">
								<image :src="item.imgsrc" mode=""></image>
							</view>
							<view class="sever_title">
								{{item.title}}
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
								<text class="order">立即预定</text>
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
								<text class="order">立即预定</text>
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
				<view class="order_right">
					<view class="order_bg">
						<text class="order_free">免费预约</text>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keypoint_part1:"广新园民族村位于长安区沣裕口进山20公里处，西安市国内旅游定 点单位广新园民族村位于长安区沣裕口进山20公里处，西安市国内 旅游定点单位广新园民族村位于长安区沣裕口进山20公里处，西安 市国内旅游定点单位广新园民族村位于长安区沣裕口进山20公里处 西安市国内旅游定点单位广新园民族村位于长安区沣裕口进山20公 里处，西安市国内旅游定点单位",
				keypoint_part2:"广新园民族村位于长安区沣裕口进山20公里处，西安市国内旅游定 点单位广新园民族村位于长安区沣裕口进山20公里处，西安市国内 旅游定点单位广新园民族村位于长安区沣裕口进山20公里处，西安 市国内旅游定点单位广新园民族村位于长安区沣裕口进山20公里处 西安市国内旅游定点单位广新园民族村位于长安区沣裕口进山20公 里处，西安市国内旅游定点单位",
				keypoint_img:"../../static/1.6.jpg",
				serverdata:[
					{
						imgsrc:"",
						title:"无线网络"
					},
					{
						imgsrc:"",
						title:"无线网络"
					},
					{
						imgsrc:"",
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
			
		}
	}
</script>

<style>
.detail_header{
	width: 100%;
	height:200px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.detail_header_content{
	width:343px;
	height:198px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 22px 0px rgba(0,0,0,0.05);
	border-radius:12px;
	border: 1px solid black;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}
.detail_header_top{
	width:323px;
	height:110px;
	border-radius:6px;
	margin-top: 13px;
	border: 1px solid black;
}
.detail_header_top image{
	width:323px;
	height:110px;
	border-radius:6px;
}
.detail_header_bottom{
	width:323px;
	height:75px;
	border: 1px solid black;
	align-items: center;
	
}
.detail_header_bottom_title{
	margin-top: 7px;
	
}
.title_content{
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
}
.title_content_name{
	font-size:13px;
	font-family:PingFangSC-Medium;
	font-weight:500;
	color:rgba(74,74,74,1);
}
.title_content_label{
	margin-top: 4px;
	font-size:11px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(155,155,155,1);
}
.detail_header_bottom_address{
	margin-top: 4px;
	font-size:11px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(155,155,155,1);
	display: flex;
	justify-content: space-between;
}

.detail_vippower{
	width: 100%;
	height:61px;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.detail_vip{
	width:343px;
	height:59px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 22px 0px rgba(0,0,0,0.05);
	border-radius:12px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}
.detail_vippower_title{
	margin-top: 12px;
	margin-left: 10px;
	width: 323px;
	height:22px;
	display: flex;
	justify-content: space-between;
}
.detail_vippower_title_name{
	font-size:13px;
	font-family:PingFangSC-Medium;
	font-weight:700;
	color:rgba(51,51,51,1);
}
.detail_vippower_title_ewm{
	font-size:11px;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(60,188,99,1);
}
.ewm_bg{
	width:62px;
	height:22px;
	background:rgba(60,188,99,0.12);
	border-radius:11px;
}
	
.detail_vippower_content{
	margin-top: 4px;
	margin-left: 10px;
	width: 323px;
	height:18px;
	font-size:11px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(155,155,155,1);
}
.detail_server{
	width: 100%;
	height:90px;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.server{
	width:343px;
	height:88px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 22px 0px rgba(0,0,0,0.05);
	border-radius:12px;
	display: flex;
	flex-direction: row;
}
.detail_server_title{
	margin-top: 14px;
	margin-left: 16px;
	width: 56px;
	font-size:13px;
	font-family:PingFangSC-Medium;
	font-weight:700;
	color:rgba(51,51,51,1);
}
.server_content{
	width: 253px;
	margin:21px 10px 0 15px;
	display: flex;
	justify-content: space-between;
}
.serverdata{
	width: 44px;
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
	width:25px;
	height:25px;
	background:rgba(51,51,51,1);
}
.sever_title{
	margin-top: 15px;
	font-size:11px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(155,155,155,1);
}
.detail_content{
	width: 100%;
	margin-top: 10px;
}
.detail_content_part{
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.detail_content_data{
	margin-top: 10px;
	width:343px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 22px 0px rgba(0,0,0,0.05);
	border-radius:12px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid black;
}
.detail_content_title{
	width:323px;
	margin-top: 8px;
	margin-bottom: 16px;
	font-size:13px;
	font-family:PingFangSC-Medium;
	font-weight:500;
	color:rgba(51,51,51,1);
}
.detail_content_main{
	width:323px;
	height:144px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.detail_content_left{
	width:110px;
	height:110px;
	border-radius:6px;
}
.detail_content_left image{
	width:110px;
	height:110px;
	border-radius:6px;
}
.detail_content_right{
	width:193px;
	height:110px;
	margin-left: 10px;
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
	margin-top: 10px;
	font-size:13px;
	font-family:PingFangSC-Medium;
	font-weight:500;
	color:rgba(74,74,74,1);
}
.content_server{
	margin-top: 56px;
	font-size:11px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(155,155,155,1);
}
.content_top{
	margin-top: 10px;
	font-size:10px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(141,81,21,1);
}
.content_mid{
	margin-top: 21px;
	font-size:13px;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(254,84,0,1);
}
.order{
	margin-top: 19px;
	font-size:11px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(254,84,0,1);
}
.detail_keypoint{
	width: 100%;
	margin-top: 9px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.keypoint{
	width:343px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 22px 0px rgba(0,0,0,0.05);
	border-radius:12px;
	border: 1px solid black;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.detail_keypoint_title{
	margin-top: 10px;
	width: 322px;
}
.keypoint_title{
	font-size:13px;
	font-family:PingFangSC-Medium;
	font-weight:700;
	color:rgba(51,51,51,1);
}
.detail_keypoint_content{
	width: 322px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.keypoint_top{
	width: 100%;
	margin-top: 6px;
}
.keypoint_part{
	width:100%;
	font-size:11px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:22px;
}
.keypoint_mid{
	width: 100%;
	height: 110px;
	margin-top: 7px;
}
.keypoint_mid image{
	width:323px;
	height:110px;
	border-radius:6px;
}
.keypoint_bottom{
	margin-top: 10px;
	width: 100%;
}
.detail_another{
	width: 100%;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.detail_another_title{
	width: 323px;
	margin-top: 10px;
}
.another_title{
	font-size:13px;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(51,51,51,1);
}
.detail_order{
	width: 100%;
	height:48px;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.detail_order_content{
	width: 322px;
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
	font-size:11px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(51,51,51,1);
}
.order_bg{
	width:62px;
	height:22px;
	background:rgba(60,188,99,0.2);
	border-radius:11px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.order_free{
	font-size:11px;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(60,188,99,1);
}
	
</style>
