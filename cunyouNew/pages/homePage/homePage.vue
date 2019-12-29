<template>
	<view class="content">
		<custom-tabbar :selected="2"></custom-tabbar>
		<view class="personal">
			我的
		</view>
	</view>
</template>

<script>
import customTabbar from '@/components/custom-tabbar/custom-tabbar.vue';
export default {
	components: {
		'custom-tabbar': customTabbar
	}
};
</script>

<style></style>
