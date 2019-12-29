<template>
	<view class="content">
		<view class="search">
			<view class="search-box">
				<mSearch :show="false" :button="inside" radius="14" class="mSearch-input-box" :placeholder="defaultKeyword" @search="doSearch(false)" 
				@input="inputChange"  @confirm="doSearch(false)"  @cancel="cancelIcon"
				v-model="keyword" @getFocus="getFocus">
				</mSearch>
			</view>
			<view class="search-right" @click="goMapPage()">
				<image src="/static/home-icon-mapcheck.svg"></image>
				<text class="search_title">
					地图
				</text>
			</view>
		</view>
		
		<view class="search-keyword" v-show="show" @touchstart="blur">
			<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
				<view class="keyword-entry" hover-class="keyword-entry-tap" v-for="row in keywordList" :key="row.keyword">
					<view class="keyword-text" @tap="doSearch(row.keyword)">
						<rich-text :nodes="row.htmlStr"></rich-text>
					</view>
					<view class="keyword-img" @tap="setkeyword(row)">
						<image src="/static/HM-search/back.png"></image>
					</view>
				</view>
			</scroll-view>
			<view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>搜索历史</view>
						<view>
							<image @tap="oldDelete" v-if="DeleteIcon" src="../../static/orderPicture/delete.svg"></image>
						    <view class="allDelete" v-if="!DeleteIcon">
						    	<text @click="allDelete">全部删除</text><text class="line">|</text><text @click="deleteSuccess">完成</text>
						    </view>
						</view>
					</view>
					<view class="keyword">
						<view v-for="(keyword,index) in oldKeywordList" :key="index">
						<text  @tap="doSearch(keyword)">{{keyword}}</text><image v-if="isdelete" @click="deleteThis(keyword,index)" src="../../static/orderPicture/cancelhistory.svg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import goodsList from "../../components/goods-list/goods-list.vue"
	export default {
		data() {
			return {
				news:[],
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,
				show:true,
				isdelete:false,
				DeleteIcon:true,
				isShowKeyword:true
			}
		},
		onLoad() {
			this.init();
			uni.request({
				url: 'http://unidemo.dcloud.net.cn/api/news',
				method: 'GET',
				data: {},
				success: res => {
					this.news = res.data;
					uni.hideLoading();//关闭加载
					
				},
				fail: () => {},
				complete: () => {}
			});
		},
		components: {
			//引用mSearch组件，如不需要删除即可
			mSearch,
			uniIcon,
			goodsList
		},
		methods: {
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();

			},
			
			blur(){
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = "商户 | 产品 | 场景 | 地址";
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				this.hotKeywordList = ['温泉山庄', '温泉山庄', '温泉山庄', '温泉山庄', '蓝牙音箱', '笔记本电脑', '鼠标垫', 'USB', 'USB3.0'];
			},
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				
				var keyword = event.detail?event.detail.value:event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
				//以下示例截取淘宝的关键字，请替换成你的接口
				uni.request({
					url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + keyword, //仅为示例
					success: (res) => {
						this.keywordList = this.drawCorrelativeKeyword(res.data.result, keyword);
					}
				});
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row[0].replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row[0],
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setkeyword(data) {
				this.keyword = data.keyword;
			},
			//点击删除图标显示每个搜索历史后的小删除按钮，且将删除图标替换为文字“全部删除|完成”
			oldDelete() {
				this.isdelete = true;
				this.DeleteIcon = false;
			},
			//点击全部删除将搜索历史部分隐藏
			allDelete(){
				this.oldKeywordList = [];
				uni.removeStorage({
					key: 'OldKeys'
				});
			},
			//点击完成，隐藏每个删除按钮，显示搜索图标
			deleteSuccess(){
				this.isdelete = false;
				this.DeleteIcon = true;
			},
			//点击某个搜索历史后的搜索小图标删除这一项
			deleteThis(keyword,index){
				this.oldKeywordList.splice(index,1);
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索
			doSearch(key) {
				key = key ? key : this.keyword ? this.keyword : this.defaultKeyword;
				
				this.keyword = key;
				this.saveKeyword(key); //保存为历史 
				this.isShowKeywordList = false;
				this.show = false;
				console.log(key)
				if(key=="商户"||key=="产品"||key=="场景"||key=="地址"){
					// 跳转至搜索列表
					uni.navigateTo({
						url:"searchlistPage"
					})
				}

				//以下是示例跳转淘宝搜索，可自己实现搜索逻辑
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI('taobao://s.taobao.com/search?q=' + key));
				//#endif
				//#ifdef H5
				window.location.href = 'taobao://s.taobao.com/search?q=' + key
				//#endif
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						console.log(res.data);
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			},
			//点击搜索框默认显示删除图标隐藏每个搜索历史的删除按钮
			getFocus(){
				this.DeleteIcon = true;
				this.isdelete = false;
				
			},
			//点击取消图标自动显示搜索历史
			cancelIcon(){
				this.show = true;
			},
		    goGoodsDetails(e){
		    	console.log(e)
		    	uni.navigateTo({
		    		url:'../detailPage/detailPage',
		    		success:function(){
		    			console.log("成功跳转")
		    		}
		    	})
		    },
			goMapPage(){
				console.log("lalall")
				uni.navigateBack()
			},
		}
	}
</script>
<style>
	.uni-media-list-body{
		height: auto;
	}
	.uni-media-list-text-top{
		line-height: 1.6em;
	}
	.search{
		width: 100%;
		height: 88upx;
		display:flex;
		justify-content:center; 
		align-items: center;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4upx 44upx 0px rgba(255, 255, 255, 0.1);
	}
	.search-box{
		margin-left: 32upx;
		height: 60upx;
		display:flex;
		justify-content:center; 
		align-items: center;
	}
	.mSearch-input-box{
		width: 628upx;
		display: flex;
		align-items: center;
		height: 60upx;
		background:rgba(216,216,216,0.3);
	    border-radius: 30upx;
	}
	.search-right{
		width: 32upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-right: 32upx;
		margin-left: auto;
	}
	.search-right image{
		height: 32upx;
		width: 32upx;
		margin-bottom: 2upx;
	}
	.search-right text{
		width: 100%;
		height: 22upx;
		height:11px;
		font-size:16upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:22upx;
		text-align: center;
	}
	.search_title{
		font-size:16upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.search-keyword {
		width:100%;
		background-color:rgb(242,242,242);
	}
	.keyword-list-box {
		height:calc(100vh - 110upx);
		padding-top:10upx;border-radius:20upx 20upx 0 0;
		background-color:#fff;
	}
	.keyword-entry-tap {
		background-color:#eee;
	}
	.keyword-entry {
		width:94%;
		height:80upx;
		margin:0 3%;
		font-size:30upx;
		color:#333;
		display:flex;
		justify-content:space-between;
		align-items:center;
		border-bottom:solid 1upx #e7e7e7;
	}
	.keyword-entry image {
		width:60upx;
		height:60upx;
	}
	.keyword-entry .keyword-text,.keyword-entry .keyword-img {
		height:80upx;
		display:flex;
		align-items:center;
	}
	.keyword-entry .keyword-text {
		width:90%;
	}
	.keyword-entry .keyword-img {
		width:10%;
		justify-content:center;
	}
	.keyword-box {
		height:calc(100vh - 110upx);
		border-radius:20upx 20upx 0 0;
		background-color:#fff;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}
	.keyword-box .keyword-block {
		width: 646upx;
		display:flex;
		justify-content:center;
		align-items: flex-start;
		flex-direction: column;
	}
	.keyword-box .keyword-block .keyword-list-header {
		margin-top: 20upx;
		width:646upx;
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
		display:flex;
		justify-content:space-between;
		align-items: center;
	}
	.keyword-box .keyword-block .keyword-list-header image {
		width:30upx;
		height:30upx;
	}
	.allDelete{
		font-size:22upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.line{
		font-size:24upx;
		font-family:PingFangSC;
		font-weight:500;
		color:rgba(227,227,227,1);
	}
	.keyword-box .keyword-block .keyword {
		display:flex;
		flex-flow:wrap;
		margin-top: 20upx;
	}
	.keyword-box .keyword-block .hide-hot-tis {
		display:flex;
		justify-content:space-between;
		font-size:28upx;
		color:#6b6b6b;
	}
	.keyword-box .keyword-block .keyword>view {
		display:flex;
		justify-content:center;
		align-items:center;
		margin:12upx 26upx 12upx 0upx;
		width: 130upx;
		height: 48upx;
		border-radius: 8upx;
		background:rgba(216,216,216,0.21);
		font-size:24upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.keyword text{
		width: 96upx;
		height: 48upx;
		padding: 0 4upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: center;
		line-height: 48upx;
	}
	.keyword image{
		width: 26upx;
		height: 26upx;
	}
	.hidden{
		display: none;
	}
	.show{
		diaplay:block;
	}
	.goodsList{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background:rgba(255,255,255,1);
	}
	.uni-list{
		justify-content: center;
		align-items: center;
	}
	.uni-list-cell{
		width:686upx;
		margin-top: 20upx;
		background-color:rgba(255,255,255,1);
		box-shadow:0upx 4upx 44upx 0upx rgba(0,0,0,0.05);
		border-radius:24upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uni-media-list{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.list-top{
		width: 646upx;
		height: 220upx;
		margin-top: 24upx;
		display: flex;
	}
	.uni-media-list-logo{
		width:220upx;
		height:220upx;
		border-radius:12upx;
	}
	.uni-media-list-text-title{
		font-size:26upx;
		font-family:PingFangSC-Medium;
		font-weight:700;
		color:rgba(74,74,74,1);
		
	}
	.uni-media-list-text-label{
		margin-top:6upx;
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
		
	}
	.uni-media-list-text-address{
		margin-top:98upx;
		font-size:22upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(155,155,155,1);
	}
	.list-bottom{
		width: 646upx;
		/* height: 126upx; */
		margin-top: 22upx;
		display: flex;
		flex-direction: column;
	}
	.list-content{
		width: 646upx;
		display: flex;
		margin-bottom: 10upx;
		justify-content: space-between;
		align-items: center;
	}
	.list-content-left{
		font-size:26upx;
		font-family:PingFangSC-Medium;
		font-weight:700;
		color:rgba(74,74,74,1);
	}
	.list-content-right{
		width:260upx;
		height:36upx;
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
	}
	.list-vip{
		width:156upx;
	    height:32upx;
		background-color:rgba(141,81,21,0.12);
		border-radius:18upx;
		margin-right: 36upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.vip{
		font-size:20upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(141,81,21,1);
		
	}
	.price{
		font-size:26upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(254,84,0,1)
		
	}
</style>
