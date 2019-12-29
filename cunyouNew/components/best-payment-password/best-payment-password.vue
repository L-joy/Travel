<template>
	<view class="best-modal digital-keyboard-modal" :class="{'best-modal-active':_show}">
		<view class="best-modal-layer" @click="cancel"></view>
		<view class="best-modal-content">
			<view class="dk-subtitle">
				<text>请输入支付密码</text>
				<cmd-icon type="close" size="12" color="#000000" @click="cancel"></cmd-icon>
			</view>
			<view class="box">
				<view class="pwd-box clearfix" @click="getKeyboard">
					<view class="pwd-text" v-for="(item,index) in _digits" :key="index" :class="{active:(activeInput==index)}">{{payPassWord[index]}}</view>
				</view>
			</view>
			<view class="pwd-forget">
				<text v-if="_forget" @click="forgetPwd">忘记密码？找回并完成支付</text>
			</view>
			<view class="digital-keyboard">
				<view class="form_edit clearfix">
					<view class="form_num" v-for="item in digitalList" :key="item" 
					 @click="getKeyNumber(item.num)">
						 <view :class="{'num':(item.num>1&&item.num<10),
										'special-num':(item.num==='0'||item.num==='1'),
										'no-num':(item.num === '')}">
							<text class="number" >{{item.num}}</text>
							<text class="letter">{{item.letter}}</text>
						 </view>
					 </view>
					
					<view class="delete" @click="deleteNum">
					 	<cmd-icon type="tags" size="30" color="#000000" class="deleteTag" ></cmd-icon>
					</view>
					 
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"

	export default {
		components: {cmdIcon},
	
		data() {
			return {
				activeInput: 0,
				digitalList:[
					{
						num:'1',
						letter:''
					},{
						num:'2',
						letter:'ABC'
					},
					{
						num:'3',
						letter:'DEF'
					},
					{
						num:'4',
						letter:'GHI'
					},
					{
						num:'5',
						letter:'JKL'
					},
					{
						num:'6',
						letter:'MNO'
					},
					{
						num:'7',
						letter:'PQRS'
					},
					{
						num:'8',
						letter:'TUV'
					},
					{
						num:'9',
						letter:'WXYZ'
					},
					{
						num:'',
						letter:''
					},
					{
						num:'0',
						letter:''
					},
					
				] ,
				paymentPwd: ''
			};
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			value: {
				type: String,
				default: ''
			},
			digits: {
				type: [Number, String],
				default: 6
			},
			forget: {
				type: Boolean,
				default: true
			},
		},
		computed: {
			payPassWord() {
				var payPassWord = this.paymentPwd.split('') || [];
				payPassWord.fill('*');
				return payPassWord;
			},
			_show() {
				this.initData();
				return String(this.show) === 'false' ? false : true;
			},
			_forget() {
				return String(this.forget) === 'false' ? false : true;
			},
			_digits() {
				let digits = [];
				digits.length = this.digits;
				return digits;
			}
		},
		methods: {
			initData: function() {
				this.paymentPwd = this.value;
				this.activeInput = this.value.length;
			},
			forgetPwd: function() {
				this.$emit('forgetPwd');
				console.log('跳转到忘记密码')
			},
			cancel: function() {
				this.$emit('cancel');
			},
			getKeyNumber: function(val) {
				if (val === '' || (val != -1 && this.activeInput == this.digits)) { //空或者已经达到最大值
					return false;
				} else if (val != -1) { //数字输入
					this.activeInput++
					this.paymentPwd += val;
					if (this.activeInput == this.digits) { //验证密码正确性
						return this.$emit('submit', this.paymentPwd);
					}
				}
			},
			getKeyboard: function(e) {
				var index = e.target.dataset.index;
				if (index === undefined) return false;
				var _length = this.paymentPwd.length
				this.activeInput = index <= _length ? index : _length;
			},
			deleteNum:function () {
				console.log(this.activeInput);
				if (this.activeInput != 0) {
					this.activeInput--;
					this.paymentPwd = this.paymentPwd.substr(0, this.activeInput)
				}
			}
		}
	}
</script>

<style>
	// 清楚浮动
	.clearfix::before,
	.clearfix::after {
		content: "";
		display: table;
		clear: both;
	}

	.clearfix {
		zoom: 1;
	}

	// 我所有的弹窗插件都会基于这个父类class展开
	.best-modal {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: none;
		z-index: 99;
	}

	//方便以后写动画
	.best-modal.best-modal-active {
		display: block;
	
		
	}

	.best-modal-layer {
		background-color: rgba(0, 0, 0, 0.2);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1;
	}

	.best-modal-content {
		position: relative;
		z-index: 2;
		animation: popAnimation  .2s linear;
	}

	// 弹窗个性化样式
	

	.digital-keyboard-modal view {
		//为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	.digital-keyboard-modal .best-modal-content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 20px 20px 0px 0px;
		background-color: #FFFFFF;
     }

	.digital-keyboard-modal .dk-subtitle {
		margin-right: 40upx;
		margin-top: 52upx;
		margin-bottom: 62upx;
		font-size:26upx;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(51,51,51,1);
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.dk-subtitle text{
		margin-right: 226upx;
	}

	.digital-keyboard-modal .pwd-forget {
		margin-top: 46upx;
		margin-bottom: 48upx;
		
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(74,144,226,1);
		line-height:34upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 键盘 */
	.digital-keyboard-modal .form_edit {
		position: relative;
	}
	
	.digital-keyboard{
		width: 100%;
		height: 478upx;
		background-color: #CCCED3;
	}

	.digital-keyboard-modal .form_num .num{
		-webkit-transition: all .2s linear;
		-o-transition: all .2s linear;
		transition: all .2s linear;
		float: left;
		width: 234upx;
		cursor: pointer;
		border: 1upx solid #eee;
		height: 92upx;
		text-align: center;
		background:rgba(252,252,254,1);
		box-shadow:0upx 2upx 0upx 0upx rgba(137,138,141,1);
		border-radius:10upx;
		line-height: 92upx;
		margin-top: 12upx;
		margin-left: 12upx;
		display: flex;
		flex-direction: column;
	}
	.num .number{
		width:234upx;
		height:58upx;
		font-size:50upx;
		font-family:SFNSDisplay;
		color:rgba(0,0,0,1);
		line-height:58upx;
	}
	.num .letter{
		width:234upx;
		height:24upx;
		font-size:20upx;
		font-family:SFNSText;
		color:rgba(0,0,0,1);
		line-height:24upx;
	}
	.digital-keyboard-modal .form_num .special-num{
		-webkit-transition: all .2s linear;
		-o-transition: all .2s linear;
		transition: all .2s linear;
		float: left;
		width: 234upx;
		cursor: pointer;
		border: 1upx solid #eee;
		height: 92upx;
		text-align: center;
		background:rgba(252,252,254,1);
		box-shadow:0upx 2upx 0upx 0upx rgba(137,138,141,1);
		border-radius:10upx;
		line-height: 92upx;
		margin-top: 12upx;
		margin-left: 12upx;
		display: flex;
		flex-direction: column;
	}
	.special-num .number{
		width: 100%;
		height: 92upx;
		font-size:50upx;
		font-family:SFNSDisplay;
		color:rgba(0,0,0,1);
		line-height:92upx;
	}
	.special-num .letter{
		height: 0upx;
	}
	.digital-keyboard-modal .form_num .no-num{
		-webkit-transition: all .2s linear;
		-o-transition: all .2s linear;
		transition: all .2s linear;
		float: left;
		width: 234upx;
		height: 92upx;
		background:#CCCED3;
		margin-top: 12upx;
		margin-left: 12upx;
	}
	.delete{
		width: 258upx;
		height: 118upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box{
		width: 100%;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}

	.digital-keyboard-modal .pwd-box {
		width: 686upx;
		height: 88upx;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.digital-keyboard-modal .pwd-text {
		position: relative;
		line-height: 88upx;
		vertical-align: middle;
		text-align: center;
		font-size: 50upx;
		font-weight: bold;
		width: 88upx;
		height: 88upx;
		display: inline-block;
		border: solid 1px #ccc;
	}

	.digital-keyboard-modal .pwd-text.active:after {
		-webkit-animation: twinkle 1s infinite;
		animation: twinkle 1s infinite;
		height: 70%;
		width: 4upx;
		content: '';
		position: absolute;
		top: 15%;
		left: 50%;
		margin-left: -2upx;
		background-color: #4fa5e1;
	}

	@-webkit-keyframes twinkle {
		from {
			background-color: #4fa5e1;
		}

		to {
			background-color: transparent;
		}
	}

	@keyframes twinkle {
		from {
			background-color: #4fa5e1;
		}

		to {
			background-color: transparent;
		}
	}
	@keyframes popAnimation{
		0%{transform: translateY(50px);}
	   100%{ transform: translateY(0px);}
	}
</style>
