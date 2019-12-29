<template>
	<view class="content">
		<view class="addPerson">
			<view class="person">
				<view class="person-content">
					<view class="addPerson-content add-name">
					  <text>收货人</text><input type="text" value="" placeholder="请填写收货人姓名"/>
					</view>
					<view class="addPerson-content">
						<text>手机号码</text><input type="text" value="" placeholder="请填写收货人手机号码"/>
					</view>
					<view class="addPersonAddress"  @click="openPicker()">
						<text>所在地区</text>
						<input type="text" value="" :placeholder="address" disabled="true"/>
						<cmd-icon type="chevron-right" size="16" color="#333333"></cmd-icon>
					</view>
					<view class="addPerson-content">
						<text>详细地址</text><input type="text" value="" placeholder="街道、楼牌号"/>
					</view>
				</view>
			</view>
			
		</view>
		<view class="addTag">
			<view class="tag">
				<view class="tag-content">
					<view class="left">
						<text class="fontStyle12">标签</text>
					</view>
					<view class="mid">
						<view class="mid-top">
							<image src="../../static/orderPicture/homeTag.svg" mode=""></image>
						    <image src="../../static/orderPicture/schoolTag.svg" mode=""></image>
						    <image src="../../static/orderPicture/companyTag.svg" mode=""></image>
						</view>
						<view class="mid-bottom">
							<input type="text" value="" placeholder="请输入标签名称，最多5个字" /><text>确定</text>
						</view>
					</view>
					<view class="right">
						<image src="../../static/orderPicture/addTag.svg" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="setDefault">
			<view class="default">
				<view class="default-content">
					<view class="default-top">
						<view class="default-left">
							<text class="fontStyle12">设置默认地址</text>
						</view>
						<view class="default-right">
							<switch checked @change="switchDefault" style="transform: scale(0.56,0.5)" />
						</view>
					</view>
					<view class="default-bottom">
						<text class="fontStyle12">每次下单时会使用该地址，实际下单地址会根据您购物选择的 地址为准，下单前请确认</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom" @click="save">
			<text class="fontStyle12">保存并使用</text>
		</view>
		<lotusAddress v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData" v-on:cancelPicker="cancel"></lotusAddress>
	</view>
</template>

<script>
	import cmdIcon from "../../components/cmd-icon/cmd-icon.vue"
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	export default{
		components:{
			cmdIcon,
			lotusAddress
		},
		data() {
				return {
					lotusAddressData:{
						visible:false,
						provinceName:'广东省',
						cityName:'广州市',
						townName:'天河区',
					},
					region:'',
					address:"省市区县、乡镇等"
				}
			},
			onLoad() {
		
			},
			methods: {
				//打开picker
				openPicker() {
					this.lotusAddressData.visible = true;
				},
				//回传已选的省市区的值
				choseValue(res){
					//res数据源包括已选省市区与省市区code
					console.log(res);
					this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
					//res.isChose = 1省市区已选 res.isChose = 0;未选
					if(res.isChose){
						this.lotusAddressData.provinceName = res.provice;//省
						this.lotusAddressData.cityName = res.city;//市
						this.lotusAddressData.townName = res.town;//区
						this.region = `${res.provice} ${res.city} ${res.town}`; //region为已选的省市区的值
					};
					this.address = this.lotusAddressData.provinceName+this.lotusAddressData.cityName+this.lotusAddressData.townName;
				},
				cancel(){
					this.address = "省市区县、乡镇等"
				},
				save(){
					uni.navigateBack()
				}
		
			}
		
	}
</script>

<style>
	.addPerson{
		width: 100%;
		height: 280upx;
		margin-top: 18upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.person{
		width:686upx;
		height:280upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.person-content{
		width:646upx;
		height:280upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
	.addPersonAddress{
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
		margin-top: 10upx;
		margin-bottom: 10upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.addPersonAddress input{
		width: 494upx;
		margin-left: 20upx;
		color:rgba(155,155,155,1);
	}
	.addPerson-content{
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
		margin-top: 10upx;
		margin-bottom: 10upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.addPerson-content input{
		width: 500upx;
		margin-left: 20upx;
		color:rgba(155,155,155,1);
	}
	.add-name input{
		margin-left: 44upx;
	}

	.addTag{
		width: 100%;
		height: 172upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tag{
		width:686upx;
		height:172upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tag-content{
		width:646upx;
		height:172upx;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
	.left{
		margin-top: 14upx;
	}
	.left text{
		color:rgba(51,51,51,1);
	}
	.mid{
		margin-top: 32upx;
		width: 400upx;
	}
	.mid-top{
		width: 100%;
		height: 32upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.mid-top image{
		width: 64upx;
		height: 32upx;
	}
	.right{
		margin-top: 14upx;
	}
	.right image{
		width: 24upx;
		height: 22upx;
	}
	.mid-bottom{
		font-size:20upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		margin-top: 28upx;
		width: 366upx;
		height: 50upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.mid-bottom input{
		color:rgba(155,155,155,1);
		width: 260upx;
	}
	.mid-bottom text{
		margin-left: 44upx;
		color:rgba(51,51,51,1);
	}
	.setDefault{
		width: 100%;
		height: 196upx;
		margin-top: 22upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.default{
		width:686upx;
		height:196upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:8upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.default-content{
		width:646upx;
		height:196upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
	.default-top{
		width: 100%;
		margin-top: 16upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.default-left text{
		color:rgba(51,51,51,1);
	}
	.default-bottom{
		margin-top: 16upx;
		margin-bottom: 26upx;
		width: 100%;
		height: 88upx;
	}
	.default-bottom text{
		color:rgba(155,155,155,1);
	}
	.bottom{
		width: 100%;
		height: 128upx;
		position: fixed;
		bottom: 0upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
