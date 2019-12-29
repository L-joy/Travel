<template>
	<view class="semp-notice-bar">
		<view class="show-box" :class="round?'round':''" v-show="showNotice" :style="{'background':bgColor}">
			<!-- 左侧小喇叭图标 -->
			<view class="icon" v-if="icon!=''">
				<uni-icon :type="icon" size="15" :color="setIconColor"></uni-icon>
			</view>
			<view class="scroll-box" v-if="showType=='scrollTop'" :style="{'color':color}">
				<swiper vertical="true" autoplay="true" circular="true" interval="2500">
					<swiper-item v-for="(item, index) in arrayText" :key="index">
						<text>{{item}}</text>
					</swiper-item>
				</swiper>
			</view>
			<view class="money" @click="navToMoney()">充值</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '../uni-icon/uni-icon.vue'
	export default {
		name: 'semp-notice-bar',
		components: {
			uniIcon
		},
		data() {
			return {
				boxWidth: '750upx',
				textwidth: '',
				sw: '0',
				timer: null,
				showNotice: true
			}
		},
		props: {
			strText: {
				type: String,
				default: '充值会员卡享受更多权益，充100送10，充300送40，充500送80',
			},
			//多条信息滚动模式
			arrayText: {
				type: Array,
				default () {
					return [
						// '充值会员卡享受更多权益,充100送10,充300送40,充500送80',
						'充值会员卡享受更多权益，充100送10，充300送40，充500送80',
						'充值会员卡享受更多权益，充100送10，充300送40，充500送80'
					]
				}
			},
			//slider 滑动 scrollTop 上下滚动 scrollLeft横向滚动
			showType: {
				type: String,
				default: 'scrollTop',
			},
			showTime: {
				type: [Number, String],
				default: ''
			},
			icon: {
				type: String,
				default: 'sound',
			},
			setIconColor: {
				type: String,
				default: '#fe5705',
			},
			bgColor: {
				type: String,
				default: '#ffffff',
			},
			color: {
				type: String,
				default: '#4e4e4e',
			},
			scrollable: {
				type: [Boolean, String],
				default: false,
			},
			//圆角
			round: {
				type: [Boolean, String],
				default: false,
			},
			//是否多行
			rows: {
				type: [Boolean, String],
				default: false,
			},
		},
		mounted() {
			if (this.scrollable && !this.rows && this.showType == "slider") {
				this.sinit();
				this.move();
			}
			this.close()
		},
		methods: {
			sinit() {
				let query = uni.createSelectorQuery();
				let view = query.select(".text-box");
				view.fields({
					size: true,
					scrollOffset: true
				}, data => {
					this.textwidth = data.width;
				}).exec();
				let box = query.select(".show-box");
				box.fields({
					size: true,
					scrollOffset: true
				}, data => {
					console.log("得到节点信息" + JSON.stringify(data));
					this.boxWidth = data.width;
				}).exec();
			},
			move() {
				this.sw = this.boxWidth;
				//console.error('运行长度:'+this.textwidth)
				this.timer = setInterval(() => {
					this.sw = this.sw - 1;
					if (-this.sw - this.textwidth > 0) {
						//clearInterval(this.timer);
						this.sw = this.boxWidth
					}
				}, 25)
			},
			show() {
				this.showNotice = true;
			},
			close() {
				if ((this.timer || this.showType != 'slider') && this.showTime != '') {
					setInterval(() => {
						if (this.timer) {
							clearInterval(this.timer);
						}
						this.showNotice = false;
					}, this.showTime)
				}
				this.$emit("close");
			},
			
			/**
			 * 跳转充值页面
			 */
			navToMoney() {
				console.log("点击充值按钮，跳转充值页面")
				uni.navigateTo({
					url: '/pages/vipCard/vipHomePage'
				});
			}
		},
	}
</script>

<style>
	.show-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 96%;
		height: 50upx;
		overflow: hidden;
		padding: 0;
		margin: 0 0 0 34upx;
	}

	text {
		font-size: 20upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 28upx;
	}

	.no-icon {
		flex: 1;
	}

	.show-info {
		overflow: hidden;
	}

	.scroll-box {
		position: relative;
		top: -5upx;
		width: 590upx;
		height: 50upx;
		line-height: 50upx;
		overflow: hidden;
		height: 40upx;
		margin-left: 8upx;
	}

	.round {
		border-radius: 50upx;
	}

	.text-box.text-rows {
		white-space: normal;
	}

	.money {
		margin-right: 32upx;
		margin-left: auto;
		width: 58upx;
		height: 28upx;
		background: rgba(61, 188, 99, 0.1);
		border-radius: 14upx;
		color: #3dbc63;
		font-weight: 600;
		font-size: 20upx;
		text-align: center;
		line-height: 26upx;
	}
</style>
