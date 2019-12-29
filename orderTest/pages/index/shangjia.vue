<template>
	<orderList :showHeader2="true" 
				:showMessage2="true" 
				:showDate3="true" :dateLeft="dateleft" :dateMid="datemid"
				:showRule2="true" 
				:showBottom2="true" 
				:url="url" ></orderList>
</template>

<script>
	import orderList from "../../components/order-list/order-list.vue"
	export default {
		components:{
			orderList
		},
		data() {
			return {
				url:"zhusu",
				dateleft:"出行日期",
				datemid:"请选择出行日期",
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
