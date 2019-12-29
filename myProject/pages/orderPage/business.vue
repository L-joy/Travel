<template>
	<orderList :showHeader2="true" 
				:showMessage2="true" 
				:showDate3="true" :dateLeft="dateleft" :dateMid="datemid"
				:showRule2="true" 
				:showBottom2="true" 
				@submit="goOrderSuccess" ></orderList>
</template>

<script>
	import orderList from "../../components/order-list/order-list.vue"
	export default {
		components:{
			orderList
		},
		data() {
			return {
				url:"room",
				dateleft:"出行日期",
				datemid:"请选择出行日期",
			}
		},
		onLoad() {

		},
		methods: {
			goOrderSuccess:function(){
				uni.navigateTo({
					url:"orderSuccess"
				})
			}

		}
	}
</script>

<style>

</style>
