<template>
	<view class="content">
		<view class="rule2" >
			<view class="rule2-content">
				<view class="rule2-content-box" v-if="isShow">
					<textarea  value="" placeholder="请输入您的要求，以便于商户做好充足准备（选填）" 
					maxlength="150" placeholder-style="font-size:12px"/>
				</view>
			</view>
		</view>
		<button type="primary" @click="click1">隐藏</button>
		<button type="primary" @click="click2">显示</button>
		<view class="tag">
			<view class="tag1" hover-class="tag3">
				<text>工作日与周末都可收货</text>
			</view>
			<view class="tag2" hover-class="tag3">
				<text>只可工作日收货</text>
			</view>
			<view class="tag1" hover-class="tag3">
				<text>只可周末收货</text>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:true,
			
			}
		},
		onLoad() {

		},
		methods: {
			click1(){
				this.isShow = false
				
			},
			click2(){
				this.isShow = true		
			}

		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.rule2{
		width: 100%;
		height: 520upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border:1px solid black;
	}
	.rule2-content{
		width: 686upx;
		height: 520upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		color:rgba(155,155,155,1);
		border-radius:8upx;
		display: flex;
		justify-content: flex-start;
		align-items:flex-start;
		border:1px solid black;
	}
	.rule2-content-box{
		margin-top: 26upx;
		width: 646upx;
		font-size: 24upx;
		border:1px solid black;
	}
	.tag{
		margin: 0upx 52upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		
	}
	.tag1{
		width:142px;
		height:28px;
		margin-top: 30upx;
		border-radius:4px;
		border:1px solid rgba(216,216,216,1);
		display: flex;
		border: 1px solid black;
		justify-content: center;
		align-items: center;
	}
	.tag2{
		width:142px;
		height:28px;
		margin-top: 30upx;
		margin-left: 70upx;
		border-radius:4px;
		border:1px solid rgba(216,216,216,1);
		display: flex;
		border: 1px solid black;
		justify-content: center;
		align-items: center;
	}
	.tag text{
		font-size:12px;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.tag3{
		width:140px;
		height:28px;
		border-radius:4px;
		border:1px solid rgba(60,188,99,1);
		
	}
	.tag3 text{
		font-size:12px;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(60,188,99,1);
	}

</style>
