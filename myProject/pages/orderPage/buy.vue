<template>
		<orderList :showHeader1="true" showCountDown="true"
		           :showDate4="true" :dateLeft="dateleft" :dateMid="datemid"
		           :showMessage4="true" 
				   :showRule1="true"  
				   :showBottom1="true" 
				   @submit="gogoodsPayPage"
				   :goodsMag="goodsMag"></orderList>
	
</template>

<script>
	import orderList from "../../components/order-list/order-list.vue"

	export default {
		components:{
			orderList
		},
		data() {
			return {
				goodsMag:"距离抢购时间还有",
				dateleft:"抢购日期",
				datemid:"2019-06-18至2019-07-18"
			}
		},
		onLoad() {

		},
		methods: {
			gogoodsPayPage:function(){
				uni.navigateTo({
					url:"ticket"
				})
			}

		}
	}
</script>

<style>

</style>
