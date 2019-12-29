<template>
		<view class="goodsList" @click="goGoodsDetails">
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
			
		</view>
</template>

<script>
	export default {
		props:{	
		},
		data() {
			return {
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
