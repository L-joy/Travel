<template>
		<orderList :showHeader1="true" 
		           :showDate2="true" :dateLeft="dateleft" :dateMid="datemid"
		           :showMessage4="true" 
				   :showRule1="true"  
				   :showBottom1="true" 
				   @submit="gogoodsPayPage"
				   :messageContent="message"></orderList>
	
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
				dateleft:"就餐日期",
				datemid:"请选择就餐日期"
			}
		},
		onLoad() {

		},
		methods: {
			gogoodsPayPage:function(){
				uni.navigateTo({
					url:"activity"
				})
			}

		}
	}
</script>

<style>

</style>
