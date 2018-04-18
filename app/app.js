import Vue from "vue"
import Vuex from "vuex"
import app from "./app.vue"

Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		todos:[]
	},
	mutations:{
		GETALL(state,payload){
			state.todos = payload 
		},
		DEL(state,payload){
			state.todos = state.todos.filter(function(item){
				return item.id != payload.id
			})
		},
		ADD(state,payload){
			state.todos.push(payload)
		},
		CHANGETITLE(state,payload){
			/*state.todos = state.todos.map(function(item){
				if(item.id == payload.id){
					return payload
				}
				return item
			})*/
			state.todos.forEach(function(item){
				if(item.id == payload.id){
					item.title = payload.title
				}
			});
		},
		CHANGEDONE(state,payload){
			state.todos = state.todos.map(function(item){
				if(item.id == payload.id){
					return payload
				}
				return item
			})
		}
	},
	actions:{
		async GETALL({commit},payload){
			var data = await fetch("/mapList").then(res => res.json());
			commit("GETALL",data)
		},
		async DEL({commit},payload){
			var data = await fetch("/mapList/" + payload.id,{
				"method" :"DELETE"
			}).then(res => res.json()); 

			commit("DEL",payload)
		},
		async ADD({commit},payload){
			var data = await fetch("/mapList/",{
				"method" :"POST",
				"headers":{
					"Content-Type": "application/json"
				},
				body:JSON.stringify(payload)
			}).then(res => res.json()); 
			commit("ADD",data);
		},
		async CHANGETITLE({commit},payload){
			var data = await fetch("/mapList/"+payload.id,{
				"method" :"PATCH",
				"headers":{
					"Content-Type": "application/json"
				},
				body:JSON.stringify({title:payload.title})
			}).then(res => res.json());  
			commit("CHANGETITLE",data);
		},
		async CHANGEDONE({commit},payload){
			var data = await fetch("/mapList/"+payload.id,{
				"method" :"PATCH",
				"headers":{
					"Content-Type": "application/json"
				},
				body:JSON.stringify({done:payload.done})
			}).then(res => res.json());  
			commit("CHANGEDONE",data);
		}
	},
	getters:{
		yizuo : function(state){
			return state.todos.filter(function(item){
				return item.done == true
			})
		},
		weizuo : function(state){
			return state.todos.filter(function(item){
				return item.done == false
			})
		}
	}
});

new Vue({
	el : "#app",
	store,
	components:{
		app
	}
})