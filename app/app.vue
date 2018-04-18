<style scoped>
	
</style>
<template>
	<div>
		<div>
			<input type="text" v-model="txt" @keyup.enter="add"> 
			<button @click="add">新增</button>
		</div>
		<div class="list">
			<ul>
				<li is="todoList" v-for="item in todos" :item="item"></li>
			</ul>
		</div>
		<p>
			<button @click="all">查看全部</button>
			<button @click="yizuo">查看已做</button>
			<button @click="weizuo">查看未做</button>
		</p>
		<p>
			全部{{this.$store.state.todos.length}}  ---   
			已做{{this.$store.getters.yizuo.length}}----
			未做{{this.$store.getters.weizuo.length}}
		</p>
	</div>
</template>
<script>
import todoList from "./components/todoList.vue"
	export default{
		data(){
			return{
				txt: "",
				state : "all"
			}
		},
		created() {
			// 发送默认 GETALL
			this.$store.dispatch("GETALL")
		},
		computed: {
			todos() {
				// 控制显示已做未做的事
				if(this.state == "all"){
					return this.$store.state.todos
				}else if(this.state == "yizuo"){
					return this.$store.getters.yizuo
				}else if(this.state == "weizuo"){
					return this.$store.getters.weizuo
				}
			}
		},
		components: {
			todoList
		},
		methods: {
			add() {
				// 如果为空 就 return 掉 什么都不做
				if(this.txt == '') return
				// 随机一个8位id
 				var id = '';
				var str = "741852qwertyuioplkjhgfdszxcvbnm0963";
				for(var i = 0; i < 8; i++) {
					id+= str[~~(Math.random() * str.length)]
				}
				// 发送add 新增命令
				this.$store.dispatch("ADD",{
					title:this.txt,
					id : id,
					done : false
				});
				// 点击后 清空 文本框
				this.txt = ''
			},
			all(){
				// 查看全部
				this.state = "all"
			},
			yizuo(){
				// 查看已做
				this.state = "yizuo"
			},
			weizuo(){
				// 查看未做
				this.state = "weizuo"
			}
		}
	}
</script>