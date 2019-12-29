<template>
		<orderList :showHeader1="true" 
		           :showDate4="true" :dateLeft="dateleft" :dateMid="datemid"
		           :showMessage4="true" 
				   :showRule1="true"  
				   :showBottom1="true" 
				   @submit="gogoodsPayPage"
				   :messageContent="message"
				   :goodsMsg="datemid"></orderList>
	
</template>

<script>
	import orderList from "../../components/order-list/order-list.vue"

	export default {
		components:{
			orderList
		},
		data() {
			return {
				message:"支付成功后不可退，如未兑换将扣除全额费用",
				dateleft:"活动日期",
				datemid:"预订日期 2019-06-18至2019-07-18",
			}
		},
		onLoad() {

		},
		methods: {
			gogoodsPayPage:function(){
				uni.navigateTo({
					url:"buy"
				})
			}

		}
	}
</script>

<style>

</style>
