<style scoped>
	.cur{
		text-decoration: line-through;
	}
</style>
<template>
	<li>
		<input type="checkbox" v-model="item.done" ref="cbox" @click="changeDone(item)">
		<span v-if="!isShowText" @dblclick="showText" :class="{cur : item.done}">{{item.title}}</span>
		<input type="text" v-if="isShowText" v-focus @blur="hideText(item)" v-model="item.title">
		<button @click="del(item.id)">X</button>
	</li>
</template>
<script>
	export default{
		props:["item"],
		data(){
			return{
				// 控制 文本框显示和隐藏
				isShowText : false
			}
		},
		methods:{
			// 删除
			del(id){
				// 只需要一个id就行了
				this.$store.dispatch("DEL",{
					id : id
				})
			},
			showText(){
				// 隐藏或显示文本框
				this.isShowText = !this.isShowText
			},
			hideText(item){
				this.showText() 
				// 光标离开的时候 发送 修改title的命令  同时载荷 就是这个item
				this.$store.dispatch("CHANGETITLE",item)
			},
			changeDone(item){
				// 事儿 做了 还是没做 使用了 ref 钩子 这样能得到 复选框 
				// 提交的时候 只需要提交 id 和 done 就行了
				this.$store.dispatch("CHANGEDONE",{
					id:item.id,
					done:this.$refs.cbox.checked
				});
			}
		},
		// 自动获取 焦点指令
		directives:{
			focus:{
				inserted(el){
					el.focus()
				}
			}
		}
	}
</script>