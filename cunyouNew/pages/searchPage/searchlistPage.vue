<template>
	<view class="content">
		<!-- 搜索列表顶部 -->
		<view class="header">
			<view class="searchTop">
				<view class="searchBox">
					<view class="search-content-box">
						<image class="serach-icon" src="/static/home-icon-search.svg"></image>
						<input placeholder="商户 | 产品 | 场景 | 地址" class="search-input-box" @focus="searchFocus()" />
					</view>
				</view>
		
				<!-- 列表模式与地图模式切换按钮 -->
				<view class="switchIcon" @click="switchShow()">
					<image class="switchImg" :src="mapIsShow?'/static/home-icon-listcheck.svg':'/static/home-icon-mapcheck.svg'" mode=""></image>
					<text class="switchText">{{mapIsShow?'列表':'地图'}}</text>
				</view>
		
			</view>
		</view>
		
		<goodsList></goodsList>
	</view>
</template>

<script>

	import goodsList from "../../components/goods-list/goods-list.vue"
	export default {
		data() {
			return {
				mapIsShow: true, // 是否展示地图,为假时展示列表
			}
		},
		onLoad() {

		},
		components: {
			goodsList
		},
		methods: {
			/**
			 * 顶部搜索框被聚焦时的触发函数
			 * @function 跳转搜索页面
			 */
			searchFocus() {
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
			
			},
			
		}
	}
</script>
<style>
	.header {
		width: 750upx;
		height: 88upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4upx 44upx 0px rgba(255, 255, 255, 0.1);
		position: relative;
		
	}
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
		line-height: 60upx;
		height: 60upx;
		font-size: 12px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		background: rgba(216, 216, 216, 0.1);
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
</style>
