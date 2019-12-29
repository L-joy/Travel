<template>
	<view class="content">
		<!-- 功能代码START -->

		<!-- 顶部搜索框及切换按钮 -->
		<view class="searchTop">
			<view class="searchBox">
				<view class="search-content-box" @click="navToSearchPage()">
					<image class="serach-icon" src="/static/home-icon-search.svg"></image>
					<text class="search-input-box">商户 | 产品 | 场景 | 地址</text>
					<!-- <input placeholder="商户 | 产品 | 场景 | 地址" class="search-input-box" /> -->
				</view>
			</view>

			<!-- 列表模式与地图模式切换按钮 -->
			<view class="switchIcon" @click="switchShow()">
				<image class="switchImg" :src="mapIsShow?'/static/home-icon-listcheck.svg':'/static/home-icon-mapcheck.svg'" mode=""></image>
				<text class="switchText">{{mapIsShow?'列表':'地图'}}</text>
			</view>
		</view>

		<!-- 地图展示 -->
		<view class="map-box">
			<map style="width: 100%; height: 100%;" :scale="11" :latitude="latitude" :longitude="longitude" :markers="covers"
			 @markertap="tapMaker($event)" @tap="popUpDisappear()" v-show="mapIsShow">
				<!-- 地图上场景细分筛选按钮，需根据场景对应加载条目 -->
			</map>
		</view>

		<!-- 点击地图标注，显示的商家详情弹窗 -->
		<cover-view class="business-detail" v-if="makerIsTap">
			<cover-view class="business-detail-top">
				<cover-image :src="popUpData.imgSrc" class="business-detail-img" @click="navToDetailPage()"></cover-image>
				<cover-view class="business-detail-topRight">
					<cover-view class="business-detail-title" @click="navToDetailPage()">{{popUpData.name}}</cover-view>
					<cover-view class="business-detail-label">
						<cover-view class="business-detail-labelItem" v-for="(item,index) in popUpData.firLabels" :key="item" :id="item">{{item}}</cover-view>
					</cover-view>
					<cover-view class="business-detail-priceBox">
						<cover-view class="business-detail-memberPrice">
							{{"会员价 ¥ " + popUpData.sales[0].memberPrice + " "}}
						</cover-view>
						<cover-view class="business-detail-normalPrice">
							{{"¥ " + popUpData.sales[0].norPrice + "起 "}}
						</cover-view>
					</cover-view>
					<cover-view class="business-detail-locationInfo">西安·长安 | 12.20KM</cover-view>
				</cover-view>
			</cover-view>

			<cover-view class="business-detail-scene">
				<cover-view style="display: flex;flex-direction: row;">
					<cover-view class="business-detail-sceneTitle">相关场景</cover-view>
					<cover-view class="navBtn" @click="navToNavPage()">导航</cover-view>
				</cover-view>
				<cover-view class="business-detail-sceneLabel">{{popUpDataSecLabels}}</cover-view>
			</cover-view>

			<cover-view class="business-detail-text">
				{{popUpData.detail}}
			</cover-view>
		</cover-view>

		<cover-view class="bottomNumBox" v-show="mapIsShow">
			已展示{{covers.length}}个结果
		</cover-view>


		<!-- 功能代码END -->
	</view>
</template>

<script>
	// import customTabbar from '@/components/custom-tabbar/custom-tabbar.vue';
	export default {
		components: {

		},
		data() {
			return {
				// covers 是地图标注的的模拟数据
				// businessDetail 是点击标注弹窗的商家详情的模拟数据
				mapIsShow: true, // 是否展示地图,为假时展示列表
				makerIsTap: false, // 地图上的标注是否被点击
				latitude: 34.34127,
				longitude: 108.93984,
				popUpData: Array, // 模拟标注被点击时的弹出数据
				popUpDataSecLabels: String, // 商家的二级标签需要处理后显示
				covers: [{
					id: 1,
					name: "黑坑",
					latitude: 34.303618,
					longitude: 108.925128,
					iconPath: '/static/map-maker-black.png',
					width: 20,
					height: 20
				}, {
					id: 2,
					name: "黑坑",
					latitude: 34.253618,
					longitude: 108.945128,
					iconPath: '/static/map-maker-black.png',
					width: 20,
					height: 20
				}, {
					id: 3,
					name: "黑坑",
					latitude: 34.233618,
					longitude: 108.845128,
					iconPath: '/static/map-maker-black.png',
					width: 20,
					height: 20
				}, {
					id: 4,
					name: "黑坑",
					latitude: 34.253618,
					longitude: 108.905128,
					iconPath: '/static/map-maker-black.png',
					width: 20,
					height: 20
				}, {
					id: 5,
					name: "斤塘",
					latitude: 34.219178,
					longitude: 108.980801,
					iconPath: '/static/map-maker-pool.png',
					width: 20,
					height: 20
				}, {
					id: 6,
					name: "斤塘",
					latitude: 34.319178,
					longitude: 108.900801,
					iconPath: '/static/map-maker-pool.png',
					width: 20,
					height: 20
				}, {
					id: 7,
					name: "斤塘",
					latitude: 34.259178,
					longitude: 108.850801,
					iconPath: '/static/map-maker-pool.png',
					width: 20,
					height: 20
				}, {
					id: 8,
					name: "斤塘",
					latitude: 34.339178,
					longitude: 108.870801,
					iconPath: '/static/map-maker-pool.png',
					width: 20,
					height: 20
				}, {
					id: 9,
					name: "农家乐",
					latitude: 34.26232,
					longitude: 108.850801,
					iconPath: '/static/map-maker-vilhappy.png',
					width: 20,
					height: 20
				}, {
					id: 10,
					name: "农家乐",
					latitude: 34.216232,
					longitude: 108.950801,
					iconPath: '/static/map-maker-vilhappy.png',
					width: 20,
					height: 20
				}, {
					id: 11,
					name: "农家乐",
					latitude: 34.27232,
					longitude: 108.800801,
					iconPath: '/static/map-maker-vilhappy.png',
					width: 20,
					height: 20
				}, {
					id: 12,
					name: "农家乐",
					latitude: 34.246232,
					longitude: 108.830801,
					iconPath: '/static/map-maker-vilhappy.png',
					width: 20,
					height: 20
				}, {
					id: 13,
					name: "湖库",
					latitude: 34.239178,
					longitude: 108.890801,
					iconPath: '/static/map-maker-like.png',
					width: 20,
					height: 20
				}, {
					id: 14,
					name: "湖库",
					latitude: 34.309178,
					longitude: 109.000801,
					iconPath: '/static/map-maker-like.png',
					width: 20,
					height: 20
				}, {
					id: 15,
					name: "湖库",
					latitude: 34.259178,
					longitude: 108.990801,
					iconPath: '/static/map-maker-like.png',
					width: 20,
					height: 20
				}, {
					id: 16,
					name: "湖库",
					latitude: 34.349178,
					longitude: 108.910801,
					iconPath: '/static/map-maker-like.png',
					width: 20,
					height: 20
				}],
				businessDetail: [{
					id: 1,
					name: "桃花源禅意民宿",
					imgSrc: "/static/home-pic-businessDetail.png",
					firLabels: ["垂钓", "采摘"],
					secLabels: ["黑鱼", "草鱼", "鲫鱼"],
					detail: "桃花里谓语美丽的生态公园古街，依山傍水，风景宜人，居于其中，仿若帝王后花园，花团锦簇，小桥流水，哈哈哈，忘怀自我，超过两行显示省略号。桃花里谓语美丽的生态公园古街，依山傍水，风景宜人，居于其中，仿若帝王后花园，花团锦簇，小桥流水，哈哈哈，忘怀自我，超过两行显示省略号。",
					sales: [{
							name: "单人间",
							memberPrice: 150,
							norPrice: 180
						},
						{
							name: "标准间",
							memberPrice: 150,
							norPrice: 180
						}
					]
				}, {
					id: 2,
					name: "思过崖禅意民宿",
					imgSrc: "/static/home-pic-listTest.png",
					firLabels: ["烧烤", "采摘", "乡宿", "私汤"],
					secLabels: ["苹果", "草鱼", "鲫鱼"],
					detail: "山里有座庙，庙里有个和尚。一根藤上七个娃，老大叫大娃，老二叫二娃，老三叫三娃",
					sales: [{
							name: "单人间",
							memberPrice: 9950,
							norPrice: 9980
						},
						{
							name: "标准间",
							memberPrice: 150,
							norPrice: 180
						}
					]
				}, {
					id: 3,
					name: "绿竹轩禅意民宿",
					imgSrc: "/static/home-pic-listTest.png",
					firLabels: ["抚琴", "采摘"],
					secLabels: ["琴", "萧"],
					detail: "黑猫警长，黑猫警长！一根藤上七个娃，老大叫大娃，老二叫二娃，老三叫三娃",
					sales: [{
							name: "垂钓",
							memberPrice: 950,
							norPrice: 980
						},
						{
							name: "标准间",
							memberPrice: 150,
							norPrice: 180
						}
					]
				}]
			}
		},
		methods: {
			/* ---------------------------------------------------------------- */
			/* 页面跳转 */
			/**
			 * 在商户详情页，点击商户"头图和标题"的触发函数
			 * @function 跳转商户详情页
			 */
			navToDetailPage() {
				console.log("跳转商家详情页面");
				uni.navigateTo({
					url: '/pages/detailPage/detailPage'
				});
			},
			/**
			 * 在商户详情页，点击导航的触发函数
			 * @function 跳转导航页面
			 */
			navToNavPage() {
				console.log("跳转导航页面");
			},
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
			/* ---------------------------------------------------------------- */

			/**
			 * 点击搜索框右侧的图标触发的点击函数
			 * @function 切换首页展示的内容，地图/列表切换
			 * 切换后原来模式下的数据应该需要还原，此处只还原了商家详情弹窗(需完善)
			 */
			switchShow() {
				this.mapIsShow = !this.mapIsShow; // 模式切换
				this.makerIsTap = false; // 地图模式复原，收起弹窗
				uni.navigateBack();
			},

			tapMaker(event) {
				this.makerIsTap = true;
				let markerId = event.markerId
				console.log(event);
				console.log("地图标注被点击", "ID", event.markerId);
				this.popUpData = this.businessDetail[markerId % 3];
				this.popUpDataSecLabels = this.popUpData.secLabels.join(" | ");
				console.log(this.popUpData);
			},

			/**
			 * 点击地图，收起商家详情弹框
			 */
			popUpDisappear() {
				console.log("点击地图收起弹窗");
				this.makerIsTap = false; // 收起弹窗
			},
		}
	};
</script>

<style>
	/* 顶部搜索框START */
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

	/* 地图样式 */
	.map-box {
		width: 100%;
		height: calc(100% - 88upx);
		position: absolute;
		top: 88upx;
	}

	/* 商家详情弹窗START */
	.business-detail {
		position: absolute;
		bottom: 100upx;
		padding: 44upx 32upx 0 32upx;
		width: 100%;
		height: 398upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4upx 44upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 32upx 32upx 0px 0px;
		box-sizing: border-box;
	}

	.business-detail-top {
		height: 176upx;
		display: flex;
		flex-direction: row;
	}

	.business-detail-img {
		width: 176upx;
		height: 176upx;
	}

	.business-detail-topRight {
		width: 490upx;
		margin-left: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.business-detail-title {
		height: 34upx;
		font-size: 24upx;
		font-family: PingFangSC-Medium;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		line-height: 34upx;
	}

	.business-detail-label {
		display: flex;
		flex-direction: row;
	}

	.business-detail-labelItem {
		margin-right: 30upx;
		padding: 0 20upx;
		height: 32upx;
		border-radius: 16upx;
		border: 2upx solid #a9a9a9;
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(155, 155, 155, 1);
		line-height: 32upx;
	}

	.business-detail-priceBox {
		height: 32upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* 		width: 100%; */
	}

	.business-detail-memberPrice {
		padding: 0 14upx;
		border-radius: 16upx;
		background: rgba(255, 0, 0, 0.1);
		height: 32upx;
		font-size: 22upx;
		font-weight: 600;
		color: rgba(141, 81, 21, 1);
		line-height: 32upx;
	}

	.business-detail-normalPrice {
		margin-left: auto;
		margin-right: 0;
		height: 32upx;
		font-size: 22upx;
		font-weight: 400;
		color: rgba(155, 155, 155, 1);
		line-height: 32upx;
	}

	.business-detail-locationInfo {
		height: 28upx;
		font-size: 20upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(74, 74, 74, 1);
		line-height: 28upx;
	}

	.business-detail-scene {
		margin-top: 14upx;
		width: 100%;
	}

	.business-detail-sceneTitle {
		width: 96upx;
		height: 34upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(74, 74, 74, 1);
		line-height: 34upx;
	}

	.navBtn {
		margin-right: 0;
		margin-left: auto;
		height: 34upx;
		font-size: 24upx;
		font-weight: 500;
		color: rgba(74, 74, 74, 1);
		line-height: 34upx;
		z-index: 1;
	}

	.business-detail-sceneLabel {
		margin-top: 12upx;
		height: 32upx;
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(155, 155, 155, 1);
		line-height: 32upx;
	}

	.business-detail-text {
		margin-top: 6upx;
		width: 100%;
		height: 80upx;
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 40upx;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis
	}
	
	/* 地图展示底部的搜索结果 */
	.bottomNumBox {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 100upx;
		background: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 100upx;
		font-size:24upx;
		font-family:PingFangSC;
		font-weight:600;
		color:rgba(51,51,51,1);
	}

	/* 商家详情弹窗END */
</style>
