<template>
	<view class="content">
		<!-- 顶部搜索框及切换按钮 -->
		<view class="searchTop">
			<view class="searchBox">
				<view class="search-content-box" @click="navToSearchPage()">
					<image class="serach-icon" src="/static/home-icon-search.svg"></image>
					<text class="search-input-box">商户 | 产品 | 场景 | 地址</text>
				</view>
			</view>
		
			<!-- 列表模式与地图模式切换按钮 -->
			<view class="switchIcon" @click="switchShow()">
				<image class="switchImg" :src="mapIsShow?'/static/home-icon-listcheck.svg':'/static/home-icon-mapcheck.svg'" mode=""></image>
				<text class="switchText">{{mapIsShow?'列表':'地图'}}</text>
			</view>
		</view>
		
		<scroll-view class="goodsList" @click="goGoodsDetails">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in goodsList" :key="index">
					<view class="uni-media-list">
						<view class="list-top">
							<image class="uni-media-list-logo" :src="item.imgsrc"></image>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-title">{{item.title}}</view>
								<view class="uni-media-list-text-label">{{item.content}}</view>
								<view class="uni-media-list-text-address">{{item.address}}</view>
							</view>
						</view>
						<view class="list-bottom">
							<view class="list-content" v-for="(item,index) in item.goodsPrice" :key="index">
								<view class="list-content-left">{{item.type}}</view>
								<view class="list-content-right">
									<view class="list-vip">
										<text class="vip">{{item.vip}}</text>
									</view>
									<view class="price">{{item.price}}</view>
								</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			
		</scroll-view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mapIsShow: false, // 是否展示地图,为假时展示列表
				goodsList:[
							{
							imgsrc:'/static/1.6.jpg',
							title:'桃花源禅意民宿',
							content:'钓鱼|采摘|避暑|私汤|山庄',
							address:'西安·长安|12.20KM',
							goodsPrice:[{
								          type:'单人间',
										  vip:'会员价￥150',
										  price:'￥180'
							           },
									   {
									   	  type:'标准间',
									   	  vip:'会员价￥150',
									   	  price:'￥180'
									   },
									   ]
						    },
							{
							imgsrc:'/static/1.6.jpg',
							title:'桃花源禅意民宿',
							content:'钓鱼|采摘|避暑|私汤|山庄',
							address:'西安·长安|12.20KM',
							goodsPrice:[{
								          type:'单人间',
										  vip:'会员价￥150',
										  price:'￥180'
							           },
									   {
									   	  type:'标准间',
									   	  vip:'会员价￥150',
									   	  price:'￥180'
									   },
									   ]
							},
							{
							imgsrc:'/static/1.6.jpg',
							title:'桃花源禅意民宿',
							content:'钓鱼|采摘|避暑|私汤|山庄',
							address:'西安·长安|12.20KM',
							goodsPrice:[{
								          type:'单人间',
										  vip:'会员价￥150',
										  price:'￥180'
							           },
									   {
									   	  type:'标准间',
									   	  vip:'会员价￥150',
									   	  price:'￥180'
									   },
									   ]
							},
							{
							imgsrc:'/static/1.6.jpg',
							title:'桃花源禅意民宿',
							content:'钓鱼|采摘|避暑|私汤|山庄',
							address:'西安·长安|12.20KM',
							goodsPrice:[{
								          type:'单人间',
										  vip:'会员价￥150',
										  price:'￥180'
							           },
									   {
									   	  type:'标准间',
									   	  vip:'会员价￥150',
									   	  price:'￥180'
									   },
									   ]
							},
							{
							imgsrc:'/static/1.6.jpg',
							title:'桃花源禅意民宿',
							content:'钓鱼|采摘|避暑|私汤|山庄',
							address:'西安·长安|12.20KM',
							goodsPrice:[{
								          type:'单人间',
										  vip:'会员价￥150',
										  price:'￥180'
							           },
									   {
									   	  type:'标准间',
									   	  vip:'会员价￥150',
									   	  price:'￥180'
									   },
									   ]
							},
							{
							imgsrc:'/static/1.6.jpg',
							title:'桃花源禅意民宿',
							content:'钓鱼|采摘|避暑|私汤|山庄',
							address:'西安·长安|12.20KM',
							goodsPrice:[{
								          type:'单人间',
										  vip:'会员价￥150',
										  price:'￥180'
							           },
									   {
									   	  type:'标准间',
									   	  vip:'会员价￥150',
									   	  price:'￥180'
									   },
									   ]
							},
							{
							imgsrc:'/static/1.6.jpg',
							title:'桃花源禅意民宿',
							content:'钓鱼|采摘|避暑|私汤|山庄',
							address:'西安·长安|12.20KM',
							goodsPrice:[{
								          type:'单人间',
										  vip:'会员价￥150',
										  price:'￥180'
							           },
									   {
									   	  type:'标准间',
									   	  vip:'会员价￥150',
									   	  price:'￥180'
									   },
									   ]
							},
							{
							imgsrc:'/static/1.6.jpg',
							title:'桃花源禅意民宿',
							content:'钓鱼|采摘|避暑|私汤|山庄',
							address:'西安·长安|12.20KM',
							goodsPrice:[{
								          type:'单人间',
										  vip:'会员价￥150',
										  price:'￥180'
							           },
									   {
									   	  type:'标准间',
									   	  vip:'会员价￥150',
									   	  price:'￥180'
									   },
									   ]
							}
				
						]
					
				}
			
		},
		onLoad() {

		},
		
		methods: {
			/**
			 * 顶部搜索框被聚焦时的触发函数
			 * @function 跳转搜索页面
			 */
			navToSearchPage() {
				console.log("搜索框被聚焦，跳转搜索页面");
				uni.navigateTo({
					url: '/pages/searchPage/searchlist'
				});
			},
			/**
			 * 点击搜索框右侧的图标触发的点击函数
			 * @function 切换首页展示的内容，地图/列表切换
			 * 切换后原来模式下的数据应该需要还原，此处只还原了商家详情弹窗(需完善)
			 */
			switchShow() {
				this.mapIsShow = !this.mapIsShow; // 模式切换
				uni.navigateTo({
					url:"searchMapResult"
				})
			
			},
			goGoodsDetails(e){
				console.log(e)
				uni.navigateTo({
					url:'../detailPage/detailPage',
					success:function(){
						console.log("成功跳转")
					}
				})
			}
			
		}
	}
</script>
<style>
	/* 顶部搜索框所占行的样式，搜索框与模式切换按钮共在一行 */
	.searchTop {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 88upx;
		background: rgba(255, 255, 255, 1);
	}
	
	.searchBox {
		margin-left: 32upx;
		height: 60upx;
	}
	
	.search-content-box {
		width: 628upx;
		display: flex;
		align-items: center;
		height: 60upx;
		background: rgba(216, 216, 216, 0.3);
		border-radius: 30upx;
	}
	
	.serach-icon {
		margin-left: 18upx;
		margin-right: 28upx;
		width: 32upx;
		height: 32upx;
	}
	
	.search-input-box {
		height: 34upx;
		font-size: 24upx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(216, 216, 216, 1);
		line-height: 34upx;
	}
	
	/* 顶部右侧模式切换按钮 */
	.switchIcon {
		width: 32upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: auto;
		margin-right: 32upx;
	}
	
	.switchImg {
		height: 32upx;
		width: 32upx;
		margin-bottom: 2upx;
	}
	
	.switchText {
		width: 100%;
		height: 22upx;
		font-size: 16upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 22upx;
		text-align: center;
	}
	
	/* 顶部搜索框END */
	.goodsList{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background:rgba(255,255,255,1);
	}
	.uni-list{
		justify-content: center;
		align-items: center;
	}
	.uni-list-cell{
		width:686upx;
		margin-top: 20upx;
		background-color:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:24upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uni-media-list{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.list-top{
		width: 646upx;
		height: 220upx;
		margin-top: 24upx;
		display: flex;
	}
	.uni-media-list-logo{
		width:220upx;
		height:220upx;
		border-radius:12upx;
	}
	
	.uni-media-list-text-title{
		font-size:26upx;
		font-family:PingFangSC-Medium;
		font-weight:700;
		color:rgba(74,74,74,1);
		
	}
	.uni-media-list-text-label{
		margin-top:6upx;
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
		
	}
	.uni-media-list-text-address{
		margin-top:98upx;
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
	}
	.list-bottom{
		width: 646upx;
		/* height: 126upx; */
		margin-top: 22upx;
		display: flex;
		flex-direction: column;
	}
	.list-content{
		width: 646upx;
		display: flex;
		margin-bottom: 10upx;
		justify-content: space-between;
		align-items: center;
	}
	.list-content-left{
		font-size:26upx;
		font-family:PingFangSC-Medium;
		font-weight:700;
		color:rgba(74,74,74,1);
	}
	.list-content-right{
		width:260upx;
		height:36upx;
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
	}
	.list-vip{
		width:156upx;
	    height:32upx;
		background-color:rgba(141,81,21,0.12);
		border-radius:18upx;
		margin-right: 36upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.vip{
		font-size:20upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(141,81,21,1);
		
	}
	.price{
		font-size:26upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(254,84,0,1)
		
	}
</style>
