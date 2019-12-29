<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title" @click="openPicker">{{title}}</text>
		</view>
		<lotusAddress v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotusAddress>
	</view>
	
</template>

<script>
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	export default {
		components:{
		     lotusAddress
		},
		data() {
			return {
				title: 'Hello',
				lotusAddressData:{
				                visible:false,
				                provinceName:'',
				                cityName:'',
				                townName:'',
				            },
				            region:''
			}
		},
		onLoad() {

		},
		methods: {
		        //打开picker
		        openPicker() {
		            this.lotusAddressData.visible = true;
		            this.lotusAddressData.provinceName = '广东省';
		        },
		        //回传已选的省市区的值
		        choseValue(res){
		            //res数据源包括已选省市区与省市区code
		            console.log(res);
		            this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
		            //res.isChose = 1省市区已选 res.isChose = 0;未选
		            if(res.isChose){
		                this.lotusAddressData.provinceName = res.province;//省
		                this.lotusAddressData.cityName = res.city;//市
		                this.lotusAddressData.townName = res.town;//区
		                this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
		            }
		        }
		    }
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
