<template>
	<view class="content">
		<orderList :showHeader1="true" :showDate1="true" :showMessage1="true" :showRule1="true" :showBottom1="true" @submit="gogoodsPayPage" :messageContent="message"></orderList>
	</view>
		
</template>

<script>
	import orderList from "../../components/order-list/order-list.vue"

	export default {
		components:{
			orderList
		},
		data() {
			return {
				message:"支付成功后不可退，如未入住将扣除全额费用，房间整晚保留，请及时入住"
			}
		},
		onLoad() {

		},
		methods: {
			gogoodsPayPage:function(){
				uni.navigateTo({
					url:"goodsPayPage"
				})
			}

		}
	}
</script>

<style>

</style>
