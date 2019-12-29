<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.content {
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
	}
	.fontStyle11{
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
	}
	.fontStyle12{
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
	}
	.fontStyle13{
		font-size:26upx;
		font-family:PingFangSC-Semibold;
	}
	.fontStyle14{
		font-size:28upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(74,74,74,1);
	}
</style>
