<template>
	<view class="tabbar">
		<view class="tabbar-list" :style="{
				background: tabBar.backgroundColor,
				color: tabBar.color,
				'border-top': tabBar.position == 'bottom' ? '1rpx solid ' + tabBar.borderStyle : 0,
				'border-bottom': tabBar.position == 'top' ? '1rpx solid ' + tabBar.borderStyle : 0
			}">
			<view class="tabbar-list-ul">
				<view class="tabbar-list-li" :class="index == 1 ? 'tabbar-list-li-center' : ''" v-for="(item, index) in tabBar.list"
				 :key="index" @click.top="setSelected(index)">
					<block v-if="index != 1">
						<cover-view class="tabbar-list-li-icon">
							<cover-image class="tabbar-list-li-icon-image" :src="selected == index ? item.selectedIconPath : item.iconPath" mode=""></cover-image>
						</cover-view>
						<cover-view class="tabbar-list-li-name" :style="{
							'color': selected == index ? tabBar.selectedColor : tabBar.color,
						}">{{ item.text }}</cover-view>
					</block>
					<block v-else>
						<!-- 渲染中间的突起图标 -->
						<cover-view class="tabbar-list-mid-icon">
							<cover-image class="tabbar-list-mid-icon-image" :src="item.selectedIconPath" mode=""></cover-image>
							<cover-view class="tabbar-list-mid-name">{{ item.text }}</cover-view>
						</cover-view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['selected'],
		data() {
			return {
				tabBar: {
					color: '#d8d8d8',
					selectedColor: '#4a4a4a',
					backgroundColor: '#FFFFFF',
					position: 'bottom',
					list: [{
							pagePath: '/pages/index/index',
							iconPath: '/static/tabbar/house-pic-nor.png',
							selectedIconPath: '/static/tabbar/house-pic-active.png',
							text: '首页'
						},
						{
							pagePath: '',
							iconPath: '',
							selectedIconPath: '/static/tabbar/home-pic-code.png',
							text: '付款码'
						},
						{
							pagePath: '/pages/index/vipCenter',
							iconPath: '/static/tabbar/use-pic-nor.png',
							selectedIconPath: '/static/tabbar/use-pic-active.png',
							text: '我的'
						}
					]
				}
			};
		},
		
		onLoad() {},
		methods: {
			setSelected(index) {
				console.log(index);
				if (index != 1) {
					uni.switchTab({
						url: this.tabBar.list[index].pagePath
					});
				} else {
					console.log("跳转付款码");
				}
			}
		}
	};
</script>

<style>
	.tabbar {
		bottom: 0;
		height: 100upx;
		width: 100%;
		z-index: 999;
		position: fixed;
	}

	.tabbar-list {
		width: 100%;
		height: 100upx;
		background: #4d586f;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.tabbar-list-ul {
		width: 100%;
		height: 100%;
		padding: 20upx 50upx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		position: fixed;
	}

	.tabbar-list-li {
		width: 80upx;
		height: 80upx;
		margin-bottom: 6upx;
	}

	.tabbar-list-li-icon {
		width: 54upx;
		height: 40upx;
		margin: 0 auto;
	}

	.tabbar-list-li-icon-image {
		width: 54upx;
		height: 40upx;
	}

	.tabbar-list-li-name {
		width: 100%;
		text-align: center;
		line-height: 30upx;
		font-size: 20upx;
		height: 30upx;
	}

	.tabbar-list-mid-icon {
		z-index: 9999;
		position: relative;
		bottom: 62upx;
	}

	.tabbar-list-mid-icon-image {
		border-radius: 50%;
		width: 96upx;
		height: 96upx;
	}

	.tabbar-list-mid-name {
		margin-top: 6upx;
		color: #3cbc63;
		width: 100%;
		font-weight: 600;
		text-align: center;
		line-height: 30upx;
		font-size: 20upx;
		height: 30upx;
	}

	.tabbar-list-li-center {
		width: 100upx;
	}

	.tabbar-list-li-center .tabbar-list-li-icon,
	.tabbar-list-li-center .tabbar-list-li-icon image {
		width: 90upx;
		height: 60upx;
	}
</style>
