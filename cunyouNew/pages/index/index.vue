<template>
	<view class="content">
		<!-- 自定义tabbar跳转 -->
		<custom-tabbar :selected="0"></custom-tabbar>

		<!-- 地图。说明：地图先加载其他元素在覆盖在地图上，顺序不能颠倒 -->
		<view class="map-box">
			<map style="width: 100%; height: 100%;" :scale="11" :latitude="latitude" :longitude="longitude" :markers="covers"
			 @markertap="tapMaker($event)" @tap="popUpDisappear()" v-show="mapIsShow">
				<!-- 地图上场景细分筛选按钮，需根据场景对应加载条目 -->
				<cover-view class="map-btn">
					<button class="map-btn-list" style="background: #f2b832;" id="农家乐" @click="dataFilter($event)">
						农家乐
					</button>
					<button class="map-btn-list" style="background: #51acf1;" id="黑坑" @click="dataFilter($event)">
						黑坑
					</button>
					<button class="map-btn-list" style="background: #f67585;" id="斤塘" @click="dataFilter($event)">
						斤塘
					</button>
					<button class="map-btn-list" style="background: #7ebf38;" id="湖库" @click="dataFilter($event)">
						湖库
					</button>
				</cover-view>
			</map>
		</view>

		<!-- 点击地图标注，显示的商家详情弹窗 -->
		<cover-view class="makerDetail" v-if="makerIsTap">
			<cover-view class="makerDetailTop">
				<cover-image :src="popUpData.imgSrc" class="makerDetailImg" @click="navToDetailPage()"></cover-image>
				<cover-view class="makerDetailTopRight">
					<cover-view class="makerDetailTitle" @click="navToDetailPage()">{{popUpData.name}}</cover-view>
					<cover-view class="makerDetailLabel">
						<cover-view class="makerDetailLabelItem" v-for="(item,index) in popUpData.firLabels" :key="item" :id="item">{{item}}</cover-view>
					</cover-view>
					<cover-view class="makerDetailPrice">
						<cover-view class="makerDetailMemberPrice">
							{{"会员价 ¥ " + popUpData.sales[0].memberPrice + " "}}
						</cover-view>
						<cover-view class="makerDetailNormalPrice">
							{{"¥ " + popUpData.sales[0].norPrice + "起 "}}
						</cover-view>
					</cover-view>
					<cover-view class="makerDetailLocationInfo">西安·长安 | 12.20KM</cover-view>
				</cover-view>
			</cover-view>

			<cover-view class="makerDetailScene">
				<cover-view style="display: flex;flex-direction: row;">
					<cover-view class="makerDetailSceneTitle">相关场景</cover-view>
					<cover-view class="navBtn" @click="navToNavPage()">导航</cover-view>
				</cover-view>
				<cover-view class="makerDetailSceneLabel">{{popUpDataSecLabels}}</cover-view>
			</cover-view>

			<cover-view class="makerDetailText">
				{{popUpData.detail}}
			</cover-view>
		</cover-view>

		<!-- 列表模式 -->
		<view class="listBox" v-show="!mapIsShow">
			<!-- 筛选条件 -->
			<view class="listTopBox">
				<!-- 位置筛选，点击弹出我的位置和地区三级联动 -->
				<view class="locationScreen" @click="locationScree()">
					<view class="userLoaction">
						{{locationInfo}}
					</view>
					<image class="arrow" :src="isLocScreen?'/static/icon-arrow-up.png':'/static/icon-arrow-down.png'" mode=""></image>
				</view>
				<!-- 条件筛选，三个筛选方式：最新、距离最近、销量最高 -->
				<view class="condiScreening" @click="condiScreening()">
					<view class="screenWay">
						最新
					</view>
					<image class="arrow" :src="isCondScreen?'/static/icon-arrow-up.png':'/static/icon-arrow-down.png'" mode=""></image>
				</view>
			</view>

			<!-- 点击位置筛选，弹出的位置选择框 -->
			<view class="locationSelectBox" v-show="isLocScreen">
				<view class="locationSelectBoxTop">
					<image src="/static/home-icon-myLocation.png" style="width: 20upx;height: 26upx;"></image>
					<view style="height: 32upx;font-size: 22upx;line-height: 32upx;margin-left: 10upx;">
						我的位置
					</view>
					<view class="myLocation">
						{{locationInfo}}
					</view>
					<view class="seeAround" @click="seeAround()">
						查看周边
					</view>
				</view>
				<view class="otherArea">
					其他地区
				</view>
				<!-- 地址选择 -->
				<view class="addressPicker">
					<addressPicker v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></addressPicker>
				</view>
			</view>

			<!-- 点击条件筛选，弹出的条件选择框 -->
			<view class="condSelectBox" v-show="isCondScreen">
				<view class="">
					<view class="selectBoxItem" :class="condNum==0?'selectBoxItemActive':''" @click="condIsClick(0)">
						最新
					</view>
					<view class="selectBoxItem" :class="condNum==1?'selectBoxItemActive':''" @click="condIsClick(1)">
						距离最近
					</view>
					<view class="selectBoxItem" :class="condNum==2?'selectBoxItemActive':''" @click="condIsClick(2)">
						销量最高
					</view>
				</view>
			</view>

			<!-- 结果展示，既可以展示条件筛选结果，也可以标签筛选展示结果 -->
			<!-- <view class="listResult" :class="allBtnIsPress?'listResult-down':'listResult-up'"> -->
			<view class="listResult" @touchstart="closeSelectBox()">
				<view class="listItem" v-for="(item,index) in this.listTarget" :key="item.name" :id="item.name" @click="navToDetailPage()">
					<view class="list-item-container">
						<view class="itemImg">
							<image :src="item.imgSrc" mode=""></image>
						</view>
						<text class="itemName">{{item.name}}</text>
						<view class="itemDetail">
							<view class="firLabel">
								{{item.firLabels.join(" | ")}}
							</view>
							<view class="localInfo">
								西安·长安 | 12.20KM
							</view>
						</view>

						<!-- 如果商户下无关联产品则不显示商户产品 -->
						<view v-if="item.sales">
							<view class="sales" v-for="(itemHere,index) in item.sales" :key="item">
								<view class="saleTitle">
									{{itemHere.name}}
								</view>
								<!-- 数据中有会员价则显示会员价 -->
								<view class="memberPrice" v-if="itemHere.memberPrice">
										会员价 ¥ {{itemHere.memberPrice}}
								</view>
								<!-- 数据中没有会员价则显示占位的view -->
								<view class="memberPriceNull" v-if="!itemHere.memberPrice"></view>
								<view class="norPrice">
									¥ {{itemHere.norPrice}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 首页顶部 -->
		<view class="header">
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

				<!-- 为了实现需求效果的弧角填充的cover-image,地图页的弧角不带灰度，列表页的弧角带外围灰度 -->
				<cover-view class="fillBox">
					<cover-image :src="mapIsShow?'/static/fillBox-map.png':'/static/fillBox-list.png'" width="100%" height="44upx"></cover-image>
				</cover-view>
			</view>

			<!-- 滚动消息栏 -->
			<view class="noticeBox" v-if="noticeIsShow">
				<semp-notice-bar></semp-notice-bar>
			</view>
		</view>

		<!-- 场景选择START -->
		<cover-view class="scene-container">
			<cover-view class="merchant-scene-top">
				<!-- 场景标签左侧五个按钮 -->
				<cover-view class="scene-tag-item" v-for="(item,index) in sceneList" :key="item.name" :id="item.name" @click="tagIsClick(item)">
					<cover-image :src='item.name==selectedSceneName?item.imgSrcActive:item.imgSrc'></cover-image>
					<cover-view>{{item.name}}</cover-view>
				</cover-view>

				<!-- 场景标签最右侧"全部..."按钮，单独渲染此标签 -->
				<cover-view class="scene-tag-item">
					<cover-image :src="allSceneIsActive?'/static/sceneSelect-icon-active.png':'/static/sceneSelect-icon-all.png'"
					 @click="scenePopupSwitch"></cover-image>
					<cover-view>全部</cover-view>
				</cover-view>
			</cover-view>

			<!-- 所有场景的下拉弹窗 -->
			<cover-view class="all-scene-popup" v-show="allSceneIsActive">
				<cover-view class="all-scene-text">所有场景</cover-view>
				<cover-view class="all-scene-button">
					<button class="scene-button-item" hover-class="scene-button-hover" v-for="(item,index) in allSceneList" :key="item.id"
					 :id="item.name" @click="sceneListTap($event)">{{item.name}}</button>
				</cover-view>
			</cover-view>
		</cover-view>
		<!-- 场景选择END -->

		<!-- 用户首次登入提醒 -->
		<!-- 1.会员卡提醒 -->
		<memberPopup v-if="memberPopupIsShow"></memberPopup>

		<!-- 2.添加小程序气泡提醒(仅在首次进入列表页) -->
		<cover-view class="bubble-container" v-if="bubbleReminderIsShow&&(!mapIsShow)" @tap="closeBubbleReminder">
			<cover-view class="isMask"></cover-view>
			<cover-view class="bubble-reminder">
				<cover-image src="/static/home-bubbleReminder-background.png" class="bubble-reminder-background"></cover-image>
				<cover-view class="bubble-reminder-content">
					<cover-image src="/static/home-bubbleReminder-logo.png" class="bubble-reminder-image"></cover-image>
					<cover-view class="bubble-reminder-text">点击这里添加到我的小程序</cover-view>
				</cover-view>
			</cover-view>
		</cover-view>

	</view>
</template>

<script>
	import customTabbar from '@/components/custom-tabbar/custom-tabbar.vue';
	import sempNoticeBar from "@/components/semp-notice-bar/semp-notice-bar.vue";
	import memberPopup from "@/components/memberPopup/memberPopup.vue";
	import addressPicker from "@/components/addressPicker/addressPicker.vue";

	export default {
		components: {
			'custom-tabbar': customTabbar,
			'semp-notice-bar': sempNoticeBar,
			'memberPopup': memberPopup,
			"addressPicker": addressPicker,
		},
		data() {
			return {
				/* 场景选择需要的数据 */
				sceneList: this.getSceneData().slice(0, 5), // 选择所有场景的前五个渲染
				allSceneList: this.getSceneData(), // 用于场景弹框内按钮渲染的数据
				selectedSceneName: String, // 被选择的场景名
				allSceneIsActive: false, // 场景选择中"全部"按钮的激活状态

				latitude: Number,
				longitude: Number,
				locationInfo: "", // 默认定位信息
				covers: Array,
				memberPopupIsShow: true, // 判断是否显示会员卡提醒，仅在首次登入时在首页提示
				bubbleReminderIsShow: true, // 判断是否显示添加小程序气泡，仅在首次登入时在首页列表模式下提示
				mapIsShow: true, // 是否展示地图,为假时展示列表
				noticeIsShow: true, // 充值消息滚动提示是否显示
				isLocScreen: false, // 列表模式位置筛选
				isCondScreen: false, // 列表模式条件筛选
				listTarget: String, // 列表模式下筛选后需要展示的数据
				condNum: Number, // 数字表示被选择的筛选条件，0表示最新，1表示距离，2表示销量
				makerIsTap: false, // 地图上的标注是否被点击
				popUpData: Array, // 模拟标注被点击时的弹出数据
				popUpDataSecLabels: String, // 模拟数据
				lotusAddressData: {
					visible: true,
				}, // visible控制地址选择器是否显示
				makerDetail: [{
					id: 1,
					name: "桃花源禅意民宿",
					imgSrc: "/static/home-pic-makerDetail.png",
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

		onLoad() {
			this.covers = this.getMapCovers();
			this.listTarget = this.getListTarget()
			// 获取用户当前位置信息
			this.getUserLocation();
		},

		onShow() {

		},
		methods: {
			/**
			 * 关闭列表页气泡提醒
			 */
			closeBubbleReminder() {
				this.bubbleReminderIsShow = false;
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

			// 滚动列表展示时，则收起条件弹框
			closeSelectBox() {
				this.isLocScreen = false;
				this.isCondScreen = false;
			},

			// 列表模式下的位置筛选，回传已选的省市区的值
			choseValue(res) {
				//res数据源包括已选省市区与省市区code
				console.log(res);
				// this.lotusAddressData.visible = res.visible; //visible为显示与关闭组件标识true显示false隐藏
				this.isLocScreen = false;
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if (res.isChose) {
					console.log(res.provice + res.city + res.town);
					// this.lotusAddressData.provinceName = res.provice; //省
					// this.lotusAddressData.cityName = res.city; //市
					// this.lotusAddressData.townName = res.town; //区
					// this.region = `${res.provice} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
			},

			/**
			 * 查看周边,列表展示周围100km商户。
			 */
			seeAround() {
				this.isLocScreen = false;
				console.log("首页位置筛选——点击“查看周边”，会显示自己周边100km（具体距离，后台可设置）内的所有商户，按定位由近及远的显示；");
			},

			/**
			 * 点击地图，收起商家详情弹框
			 */
			popUpDisappear() {
				console.log("点击地图收起弹窗");
				this.makerIsTap = false; // 收起弹窗
			},

			test() {
				console.log("元素被触发");
			},

			/**
			 * @param {Object} e表示选择的筛选条件，0为最新，1为距离，2为销量
			 * 点击后，会收起弹窗
			 */
			condIsClick(e) {
				if (e == 0) {
					this.condNum = 0;
					this.isCondScreen = false;
				} else if (e == 1) {
					this.condNum = 1;
					this.isCondScreen = false;
				} else if (e == 2) {
					this.condNum = 2;
					this.isCondScreen = false;
				} else {
					this.condNum = null;
				}
			},

			/**	
			 * @param {Object} event，点击事件
			 * function: 对covers数据进行筛选，返回对应按钮表示的数据
			 * return: filteredResult，筛选过后的数据，数组格式
			 */
			dataFilter(event) {
				let targetName = event.currentTarget.id;
				console.log(targetName, "按钮被点击");
				let filteredResult = this.getMapCovers().filter((e) => {
					return e.name == targetName;
				})
				console.log(filteredResult)
				this.covers = filteredResult;
			},

			/**
			 * locationScree()
			 */
			locationScree() {
				this.isLocScreen = !this.isLocScreen;
				this.isCondScreen = false;
				console.log("locationScree", this.locationInfo);
				console.log("位置筛选");
			},

			/**
			 * condiScreening()
			 */
			condiScreening() {
				this.isLocScreen = false
				this.isCondScreen = !this.isCondScreen;
				console.log("条件筛选");
			},

			/**
			 * getUserLocationf方法获取用户定位，在onLoad中调用
			 * @function 获取用户经纬度，同时发起地址逆解析，获取用户地点名称
			 * 需完善：经纬度需要存储在全局变量中
			 */
			getUserLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						var that = this;
						console.log(res);
						console.log('经度：' + res.longitude, '维度：' + res.latitude);
						this.longitude = res.longitude;
						this.latitude = res.latitude;

						// 地址逆解析，通过经纬度拿到用户具体地址
						var locationString = res.latitude + "," + res.longitude;
						uni.request({
							url: 'https://apis.map.qq.com/ws/geocoder/v1/',
							data: {
								"key": "QQ6BZ-HUM6J-2NJFB-F4ZY2-HLQEE-YZFIA",
								"location": locationString
							},
							method: 'GET',
							success: function(r) {
								console.log(r);
								let address = r.data.result.address_component.district + r.data.result.address_component.street;
								that.locationInfo = address;
								// that.locationInfo = r.data.result.formatted_addresses.recommend;
								//输出一下位置信息
								console.log('用户位置信息', that.locationInfo);
								//r.data.result.address获得的就是用户的位置信息，将它保存到一个全局变量上
								getApp().globalData.locationInfo = address;
							}
						});
					}
				});

			},

			tapMaker(event) {
				this.makerIsTap = true;
				let markerId = event.markerId
				console.log(event);
				console.log("地图标注被点击", "ID", event.markerId);
				this.popUpData = this.makerDetail[markerId % 3];
				this.popUpDataSecLabels = this.popUpData.secLabels.join(" | ");
				console.log(this.popUpData);
			},

			/**
			 * 点击搜索框右侧的图标触发的点击函数
			 * @function 切换首页展示的内容，地图/列表切换
			 * 切换后原来模式下的数据应该需要还原，此处只还原了商家详情弹窗(需完善)
			 */
			switchShow() {
				this.mapIsShow = !this.mapIsShow; // 模式切换
				this.makerIsTap = false; // 地图模式复原，收起弹窗

				this.noticeIsShow = this.mapIsShow ? true : false; // 充值提醒是否展示
			},

			/* ---------------------------------------------------------------- */
			/* 场景选择涉及到的函数 */

			/**
			 * 二级筛选按钮对应的触发事件
			 * @function 点击地图切换具体场景，再次点击关闭场景
			 * 全部场景按钮与左侧具体按钮不能激活状态不能共存
			 */
			tagIsClick(item) {
				this.allSceneIsActive = false; //全部场景激活状态取消
				this.selectedSceneName = item.name;
				console.log("被选择的名字", this.selectedSceneName);
				this.changeImg = !this.changeImg;

				let targetName = this.selectedSceneName;
				// 更新地图标注的数据
				this.covers = this.getSceneData().filter((e) => {
					return e.name == targetName;
				});
				// 更新列表展示的数据
				this.listTarget = this.getListTarget().filter((e) => {
					return e.firLabels.includes(targetName)
				})

				this.makerIsTap = false; // 收起商家详情弹窗
			},

			/**
			 * 场景选择中"..."对应的事件函数
			 * @function 点击显示/关闭全部场景下拉弹窗
			 * 全部场景按钮与左侧具体按钮的激活状态不能共存
			 */
			scenePopupSwitch() {
				this.selectedSceneName = null;
				this.allSceneIsActive = !this.allSceneIsActive;

				// 地图标注/列表展示数据复原
				if (this.allSceneIsActive) {
					this.covers = this.getSceneData();
					this.listTarget = this.getListTarget()
				}

				this.makerIsTap = false; // 收起商家详情弹窗
			},

			/**
			 * 所有场景弹窗中，按钮被点击时触发的事件函数
			 * @function 过滤数据，在地图上展示对应类别的数据
			 */
			sceneListTap(event) {
				let targetName = event.currentTarget.id;
				// 更新地图标注的数据
				this.covers = this.getSceneData().filter((e) => {
					return e.name == targetName;
				});
				// 更新列表展示的数据
				this.listTarget = this.getListTarget().filter((e) => {
					return e.firLabels.includes(targetName);
				})

				this.makerIsTap = false; // 收起商家详情弹窗
			},

			/* ---------------------------------------------------------------- */
			/* 页面跳转 */

			// 在商户详情页，点击商户"头图和标题"跳转商户详情页；
			navToDetailPage() {
				console.log("跳转商家详情页面");
				uni.navigateTo({
					url: '/pages/detailPage/detailPage'
				});
			},

			// 在商户详情页，点击导航跳转导航页面
			navToNavPage() {
				console.log("跳转导航页面");
			},

			/* ---------------------------------------------------------------- */
			/* 数据模拟函数 */

			/**
			 * 列表模式下的模拟数据
			 * id|name|imgSrc|firLabels|secLabels|sales
			 */
			getListTarget() {
				return [{
					id: 1,
					name: "桃花源禅意民宿",
					imgSrc: "/static/home-pic-listTest.png",
					firLabels: ["垂钓", "采摘"],
					secLabels: ["黑鱼", "草鱼", "鲫鱼"],
					sales: [{
							name: "单人间",
							memberPrice: 150,
							norPrice: 180
						},
						{
							name: "标准间",
							// memberPrice: 150,
							norPrice: 180
						}
					]
				}, {
					id: 2,
					name: "思过崖",
					imgSrc: "/static/home-pic-listTest2.png",
					firLabels: ["垂钓", "山庄", "团建"],
					secLabels: ["平沙落雁", "落日孤烟", "北斗七星"],
					sales: [{
							name: "黑鱼垂钓",
							memberPrice: 16000,
							norPrice: 19000
						},
						{
							name: "鲫鱼垂钓",
							memberPrice: 13000,
							norPrice: 10600
						}
					]
				}, {
					id: 3,
					name: "桃花源禅意民宿",
					imgSrc: "/static/home-pic-listTest.png",
					firLabels: ["采摘", "避暑", "私汤", "土灶"],
					secLabels: ["黑鱼", "草鱼", "鲫鱼"],
					sales: [{
							name: "单人间",
							memberPrice: 160,
							norPrice: 190
						},
						{
							name: "标准间",
							memberPrice: 130,
							norPrice: 160
						}
					]
				}, {
					id: 4,
					name: "思过崖",
					imgSrc: "/static/home-pic-listTest2.png",
					firLabels: ["避暑", "私汤", "山庄", "乡宿"],
					secLabels: ["平沙落雁", "落日孤烟", "北斗七星"],
					sales: [{
							name: "单人间",
							memberPrice: 160,
							norPrice: 190
						},
						{
							name: "标准间",
							memberPrice: 130,
							norPrice: 160
						}
					]
				}, {
					id: 5,
					name: "桃花源禅意民宿",
					imgSrc: "/static/home-pic-listTest.png",
					firLabels: ["采摘", "烧烤"],
					secLabels: ["黑鱼", "草鱼", "鲫鱼"],
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
					id: 6,
					name: "思过崖",
					imgSrc: "/static/home-pic-listTest2.png",
					firLabels: ["避暑", "漂流"],
					secLabels: ["平沙落雁", "落日孤烟", "北斗七星"],
					sales: [{
							name: "单人间",
							memberPrice: 160,
							norPrice: 190
						},
						{
							name: "标准间",
							memberPrice: 130,
							norPrice: 160
						}
					]
				}]
			},

			/**
			 * 模拟返回请求返回的地图数据
			 * id|name|纬度|经度|地图标注参数
			 */
			getMapCovers() {
				return [{
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
				}]
			},

			/**
			 * 模拟返回请求返回的所有场景数据
			 * 名字|标注信息|图片|地图标注参数
			 */
			getSceneData() {
				return [{
					id: 1,
					name: "垂钓",
					latitude: 34.22985,
					longitude: 108.91602,
					iconPath: '/static/map-maker-other.png',
					width: 20,
					height: 20,
					imgSrc: "/static/sceneSelect-icon-nor.png",
					imgSrcActive: "/static/sceneSelect-icon-active.png",
				}, {
					id: 2,
					name: "采摘",
					latitude: 34.23485,
					longitude: 108.89602,
					iconPath: '/static/map-maker-other.png',
					width: 20,
					height: 20,
					imgSrc: "/static/sceneSelect-icon-pick.png",
					imgSrcActive: "/static/sceneSelect-icon-active.png",
				}, {
					id: 3,
					name: "避暑",
					latitude: 34.2485,
					longitude: 108.89602,
					iconPath: '/static/map-maker-other.png',
					width: 20,
					height: 20,
					imgSrc: "/static/sceneSelect-icon-vacation.png",
					imgSrcActive: "/static/sceneSelect-icon-active.png",
				}, {
					id: 4,
					name: "私汤",
					latitude: 34.21985,
					longitude: 108.92602,
					iconPath: '/static/map-maker-other.png',
					width: 20,
					height: 20,
					imgSrc: "/static/sceneSelect-icon-spa.png",
					imgSrcActive: "/static/sceneSelect-icon-active.png",
				}, {
					id: 5,
					name: "山庄",
					latitude: 34.21985,
					longitude: 108.91602,
					iconPath: '/static/map-maker-other.png',
					width: 20,
					height: 20,
					imgSrc: "/static/sceneSelect-icon-villa.png",
					imgSrcActive: "/static/sceneSelect-icon-active.png",
				}, {
					id: 6,
					name: "团建",
					latitude: 34.27985,
					longitude: 108.92602,
					iconPath: '/static/map-maker-other.png',
					width: 20,
					height: 20,
					imgSrc: "/static/sceneSelect-icon-nor.png",
					imgSrcActive: "/static/sceneSelect-icon-active.png",
				}, {
					id: 7,
					name: "土灶",
					latitude: 34.20985,
					longitude: 108.93602,
					iconPath: '/static/map-maker-other.png',
					width: 20,
					height: 20,
					imgSrc: "/static/sceneSelect-icon-nor.png",
					imgSrcActive: "/static/sceneSelect-icon-active.png",
				}, {
					id: 8,
					name: "乡宿",
					latitude: 34.35985,
					longitude: 108.94602,
					iconPath: '/static/map-maker-other.png',
					width: 20,
					height: 20,
					imgSrc: "/static/sceneSelect-icon-nor.png",
					imgSrcActive: "/static/sceneSelect-icon-active.png",
				}, {
					id: 9,
					name: "烧烤",
					latitude: 34.21985,
					longitude: 108.95602,
					iconPath: '/static/map-maker-other.png',
					width: 20,
					height: 20,
					imgSrc: "/static/sceneSelect-icon-nor.png",
					imgSrcActive: "/static/sceneSelect-icon-active.png",
				}, {
					id: 10,
					name: "漂流",
					latitude: 34.19985,
					longitude: 108.96602,
					iconPath: '/static/map-maker-other.png',
					width: 20,
					height: 20,
					imgSrc: "/static/sceneSelect-icon-nor.png",
					imgSrcActive: "/static/sceneSelect-icon-active.png",
				}]
			}
		}
	};
</script>

<style>
	.content {
		width: 100%;
		overflow: hidden;
	}

	.header {
		position: absolute;
		top: 0;
		width: 750upx;
		/* height: 220upx; */
		height: 174upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4upx 44upx 0px rgba(255, 255, 255, 0.1);
	}

	.fillBox {
		position: absolute;
		top: 174upx;
		width: 100%;
		height: 44upx;
	}

	.search-box {
		width: 750upx;
		height: 88upx;
	}

	search {
		height: 56upx;
	}

	/* 顶部添加小程序气泡提醒样式 */
	.bubble-container {
		z-index: 9999;
		position: relative;
	}

	/* 页面遮罩 */
	.isMask {
		position: relative;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.1);
	}

	.bubble-reminder {
		position: absolute;
		top: 0;
		z-index: 99999;
		width: 100%;
		height: 106upx;
	}

	.bubble-reminder-background {
		position: absolute;
		right: 121upx;
		width: 388upx;
		height: 106upx;
	}

	.bubble-reminder-content {
		display: flex;
		flex-direction: row;
		align-items: center;

		position: absolute;
		top: 50upx;
		right: 149upx;
	}

	.bubble-reminder-image {
		position: relative;
		width: 40upx;
		height: 44upx;
		z-index: 99999;
		margin-right: 6upx;
	}

	.bubble-reminder-text {
		position: relative;
		width: 288upx;
		height: 34upx;
		font-size: 24upx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 34upx;
		z-index: 99999;
	}

	/* 顶部搜索框所占行的样式，搜索框与模式切换按钮共在一行 */
	.searchTop {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 88upx;
		background: rgba(255, 255, 255, 1);
	}

	/* 顶部搜索框start */
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

		/* 		line-height: 60upx;
		height: 60upx;
		font-size: 12px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		background: rgba(216, 216, 216, 0.1); */
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

	/* 顶部搜索框end */



	/* 地图部分start */
	/* 地图部分end */
	.map-box {
		width: 100%;
		height: calc(100% - 276upx);
		position: absolute;
		top: 176upx;
	}

	.map-btn {
		width: 112upx;
		position: absolute;
		bottom: 170upx;
		right: 52upx;
	}

	.map-btn-list {
		margin-top: 28upx;
		width: 112upx;
		height: 48upx;
		box-shadow: 0upx 4upx 44upx 0upx rgba(242, 183, 49, 0.2);
		border-radius: 8upx;
		font-size: 24upx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		line-height: 48upx;
		color: rgba(255, 255, 255, 1);
	}

	.makerDetail {
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

	.makerDetailTop {
		height: 176upx;
		display: flex;
		flex-direction: row;
	}

	.makerDetailImg {
		width: 176upx;
		height: 176upx;
	}

	.makerDetailTopRight {
		width: 490upx;
		margin-left: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.makerDetailTitle {
		height: 34upx;
		font-size: 24upx;
		font-family: PingFangSC-Medium;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		line-height: 34upx;
	}

	.makerDetailLabel {
		display: flex;
		flex-direction: row;
	}

	.makerDetailLabelItem {
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

	.makerDetailPrice {
		height: 32upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* 		width: 100%; */
	}

	.makerDetailMemberPrice {
		padding: 0 14upx;
		border-radius: 16upx;
		background: rgba(255, 0, 0, 0.1);
		height: 32upx;
		font-size: 22upx;
		font-weight: 600;
		color: rgba(141, 81, 21, 1);
		line-height: 32upx;
	}

	.makerDetailNormalPrice {
		margin-left: auto;
		margin-right: 0;
		height: 32upx;
		font-size: 22upx;
		font-weight: 400;
		color: rgba(155, 155, 155, 1);
		line-height: 32upx;
	}

	.makerDetailLocationInfo {
		height: 28upx;
		font-size: 20upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(74, 74, 74, 1);
		line-height: 28upx;
	}

	.makerDetailScene {
		margin-top: 14upx;
		width: 100%;
	}

	.makerDetailSceneTitle {
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

	.makerDetailSceneLabel {
		margin-top: 12upx;
		height: 32upx;
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(155, 155, 155, 1);
		line-height: 32upx;
	}

	.makerDetailText {
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

	/* 列表容器 */
	.listBox {
		position: absolute;
		top: 376upx;
		width: 100%;
		/* height: calc(100% - 476upx); */
		height: calc(100% - 388upx);
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4upx 44upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 68upx 68upx 0px 0px;
	}

	.listTopBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 32upx;
		margin: 38upx auto 0;
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 32upx;
	}

	.locationScreen {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 auto 0 80upx;
	}

	.userLoaction {
		font-size: 22upx;
	}

	.screenWay {
		font-size: 22upx;
	}

	.condiScreening {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 160upx 0 auto;
	}

	.arrow {
		margin-left: 34upx;
		width: 24upx;
		height: 12upx;
	}

	.locationSelectBox {
		margin-top: 26upx;
		position: absolute;
		/* 改为绝对定位脱离文档流，而不是原来的相对定位 */
		width: 100%;
		height: 121upx;
		background: rgba(255, 255, 255, 1);
	}

	.locationSelectBoxTop {
		/* position: absolute; */
		margin-left: 80upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 22upx;
		height: 32upx;
	}

	.otherArea {
		margin-left: 80upx;
		margin-top: 38upx;
		width: 88upx;
		height: 32upx;
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 32upx;
	}

	.addressPicker {
		width: 100%;
	}

	.condSelectBox {
		padding-bottom: 28upx;
		position: absolute;
		width: 100%;
		height: 171upx;
		background: rgba(255, 255, 255, 1);
	}

	.selectBoxItem {
		margin: 28upx 0 28upx 80rpx;
		height: 32upx;
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 32upx;
		box-sizing: border-box;
	}

	.selectBoxItemActive {
		color: rgba(254, 84, 0, 1);
	}

	.listResult {
		margin: 32upx auto 0;
		overflow: scroll;
		/* overflow: hidden; */
		height: calc(100% - 102upx);
	}

	.listResult-up {
		margin: 32upx auto 0;
		/* margin: 78upx auto 0; */
	}

	.listResult-down {
		/* margin: 32upx auto 0; */
		margin: 78upx auto 0;
	}

	.listItem {
		margin: 0 auto 20upx;
		width: 686upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4upx 44upx 0px rgba(0, 0, 0, 0.05);
		border-radius: 24upx;
		box-sizing: border-box;
	}

	.list-item-container {
		margin: 26upx 20upx 0upx;
		padding-top: 26upx;
		padding-bottom: 22upx;
	}

	.itemImg {
		margin: 0 auto 0;
	}

	.itemImg image {
		width: 646upx;
		height: 220upx;
		border-radius: 12upx;
		box-sizing: border-box;
	}

	.itemName {
		width: 182upx;
		height: 36upx;
		font-size: 26upx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(74, 74, 74, 1);
		line-height: 36upx;
	}

	.itemDetail {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		margin: 6upx auto 14upx;
		height: 32upx;
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(155, 155, 155, 1);
		line-height: 32upx;
		box-sizing: border-box;
	}

	.firLabel {
		font-size: 22upx;
		margin: 0 auto 0 0;
	}

	.localInfo {
		font-size: 22upx;
		margin: 0 0 0 auto;
	}

	.sales {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 36upx;
		margin-bottom: 10upx;
	}

	.saleTitle {
		height: 36upx;
		font-size: 26upx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(74, 74, 74, 1);
		line-height: 36upx;
	}

	.memberPrice {
		padding-left: 14upx;
		padding-right: 14upx;
		margin-left: auto;
		margin-right: 48upx;
		height: 32upx;
		background: rgba(254, 84, 0, 0.1);
		border-radius: 18upx;
		border: 1px solid rgba(254, 84, 0, 1);
		text-align: center;

		font-size: 22upx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		color: rgba(254, 84, 0, 1);
		line-height: 36upx;
	}
	
	.memberPriceNull {
		padding-left: 14upx;
		padding-right: 14upx;
		margin-left: auto;
		margin-right: 48upx;
		height: 32upx;
		/* background: rgba(254, 84, 0, 0.1); */
		border-radius: 18upx;
		/* border: 1px solid rgba(254, 84, 0, 1); */
		text-align: center;

		font-size: 22upx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		color: rgba(254, 84, 0, 1);
		line-height: 36upx;
	}

	.norPrice {
		margin-right: 0;
		height: 32upx;
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(254, 84, 0, 1);
		line-height: 32upx;
	}

	.myLocation {
		height: 32upx;
		font-size: 22upx;
		line-height: 32upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(254, 84, 0, 1);
		margin-left: 14upx;
	}

	.seeAround {
		width: 120upx;
		height: 44upx;
		margin-right: 80upx;
		margin-left: auto;
		background: rgba(60, 188, 99, 0.1);
		border-radius: 20upx;
		color: rgba(60, 188, 99, 1);
		font-size: 22upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		line-height: 44upx;
		text-align: center;
	}

	/* 顶部场景选择样式start */
	.scene-container {
		position: absolute;
		top: 152upx;
		left: 32upx;
		width: 686upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4upx 44upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 18upx;
		z-index: 1;
	}

	.merchant-scene-top {
		height: 188upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.scene-tag-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}

	.scene-tag-item cover-image {
		width: 68upx;
		height: 68upx;
		margin-bottom: 22upx;
	}

	.all-scene-popup {
		height: 196upx;
		width: 686upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 18upx;
	}

	.all-scene-text {
		margin-left: 26upx;
		margin-bottom: 22upx;
		width: 96upx;
		height: 34upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 34upx;
	}

	.all-scene-button {
		margin-left: 20upx;
		width: 646upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.scene-button-item {
		margin: 0 13upx 24upx;
		width: 104upx;
		height: 48upx;
		background: rgba(216, 216, 216, 0.22);
		border-radius: 8upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 48upx;
		text-align: center;
	}

	/* 按钮点击效果 */
	.scene-button-hover {
		width: 104upx;
		height: 48upx;
		background: rgba(60, 188, 99, 0.12);
		border-radius: 8upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(60, 188, 99, 1);
		line-height: 48upx;
	}

	/* 顶部场景选择样式end */
</style>
