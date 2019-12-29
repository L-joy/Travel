<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onLoad: function() {
			// onLoad无法限制原生tabbar加载
		},
		onShow: function() {
			// 禁用系统默认tabbar，改用自定义导航栏
			uni.hideTabBar()
			console.log('App Show')
		},
		onHide: function() {
			// onHide无法限制原生tabbar加载
			console.log('App Hide')
		}
	}
</script>

<style>
	@import '/common/uni.css';
	@import '/common/css/iconfont.css';

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

	/*每个页面公共css */
</style>
