<template>
		<orderList :showHeader1="true" 
		           :showDate2="true" :dateLeft="dateleft" :dateMid="datemid"
		           :showMessage3="true" 
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
				url:"meishi",
				message:"支付成功后不可退，在游玩日期前一天18：00前可申请退款，游玩日期不可退款，如未兑换将扣除全额费用",
				dateleft:"出行日期",
				datemid:"请选择出行日期"
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
