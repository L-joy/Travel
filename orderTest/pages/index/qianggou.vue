<template>
		<orderList :showHeader1="true" 
		           :showDate4="true" :dateLeft="dateleft" :dateMid="datemid"
		           :showMessage4="true" 
				   :showRule1="true"  
				   :showBottom1="true" 
				   :url="url" 
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
				url:"",
				message:"支付成功后不可退，如未兑换将扣除全额费用",
				dateleft:"抢购日期",
				datemid:"2019-06-18至2019-07-18"
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>
