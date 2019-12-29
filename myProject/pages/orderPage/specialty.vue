<template>
		<orderList :showHeader1="true"
		           :showMessage5="true"
				   :showRule1="true"  
				   :showBottom1="true" 
				   :messageContent="message"
				   @submit="goPayPage"
				   @goAddressPage="goAddressPage"></orderList>
	
</template>

<script>
	import orderList from "../../components/order-list/order-list.vue"

	export default {
		components:{
			orderList
		},
		data() {
			return {
				message:"支付成功后，商家确认发货前可退，已发货后不可退"
			}
		},
		onLoad() {

		},
		methods: {
			//点击提交订单跳转到支付订单页面
			goPayPage(){
				uni.navigateTo({
					url:"goodsPayPage"
				})
			},
			//点击地址部分跳转到地址页面
			goAddressPage(){
				uni.navigateTo({
					url:"address"
				})
			}
				

		}
	}
</script>

<style>

</style>
