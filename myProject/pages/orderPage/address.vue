<template>
	<view class="content">
		<view class="addressContent fontStyle">
			<view class="address-list" v-for="(item,index) in addressList" :key="index" :id="item.index">
				<view class="list-left" @click="choose(item)">
					<image :src="item.id==selId?item.selSrc:item.noSelSrc" mode=""></image>
				</view>
				<view class="list">
					<view class="list-name">
						<view>
							{{item.name}}
						</view>
						<view class="phone">
							{{item.phoneNumber}}
						</view>
						<view>
							<image src="../../static/orderPicture/address-default-tag.svg" mode=""></image>
						</view>
					</view>
					<view class="list-address" @click="editor">
						<view class="address">
							{{item.address}}
						</view>
						<image src="../../static/orderPicture/address-editor.svg" mode=""></image>
					</view>
				</view>
			</view>
			<view class="address-editor" @click="editorAdd">
				<view class="editor-content">
					<image src="../../static/orderPicture/editorAdd.svg" mode=""></image>
					<text>新增收货地址</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>


	export default {
		components: {
		
		},
		 data() {
            return {
				selId:Number,
				addressList:[
					{
						id:0,
						selSrc:"../../static/orderPicture/address-choose.svg",
						noSelSrc:"../../static/orderPicture/address-nochoose.svg",
						name:"王彪",
						phoneNumber:"18768236783",
						address:"陕西省西安市雁塔区高新四路和科技路交叉口 处高新九号广场10号楼"
					},
					{
						id:1,
						selSrc:"../../static/orderPicture/address-choose.svg",
						noSelSrc:"../../static/orderPicture/address-nochoose.svg",
						name:"王彪",
						phoneNumber:"18768236783",
						address:"陕西省西安市雁塔区高新四路和科技路交叉口 处高新九号广场10号楼"
					},
					{
						id:2,
						selSrc:"../../static/orderPicture/address-choose.svg",
						noSelSrc:"../../static/orderPicture/address-nochoose.svg",
						name:"王彪",
						phoneNumber:"18768236783",
						address:"陕西省西安市雁塔区高新四路和科技路交叉口 处高新九号广场10号楼"
					}
				]
			}
        },
      
        methods:{
			//点击选择收货地址
			choose(item){
				console.log(item);
				this.selId = item.id;
				console.log("被选中的索引："+this.selId)
			},
			//点击编辑收货地址
			editor(){
				uni.navigateTo({
					url:"addAddress"
				})
			},
			//点击跳转至添加地址页面
			editorAdd(){
				uni.navigateTo({
					url:"addAddress"
				})
			}
		}
	}
</script>

<style>
	.addressContent{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.address-list{
		margin-top: 20upx;
		width:686upx;
		height:180upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 22upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		flex-direction: row;
	}
	.list-left{
		width: 56upx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.list-left image{
		width: 36upx;
		height: 36upx;
	}
	.list{
		width: 630upx;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.list-name{
		margin-top: 22upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.phone{
		margin-left: 28upx;
	}
	.list-name image{
		margin-left: 56upx;
		width: 64upx;
		height: 32upx;
	}
	.list-address{
		margin-top: 14upx;
		display: flex;
		flex-wrap: wrap;
	}
	.address{
		width: 480upx;
		height: 88upx;
		margin-left: 78upx;
	}
	.list-address image{
		margin-left: 20upx;
		width: 36upx;
		height: 36upx;
	}
	.fontStyle{
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.address-editor{
		position: fixed;
		bottom: 0upx;
		width: 100%;
		height: 128upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.editor-content{
		width: 202upx;
		height: 40upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	
	}
	.editor-content image{
		width: 40upx;
		height: 40upx;
	}
</style>
