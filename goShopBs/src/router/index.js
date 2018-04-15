import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path:'*',
	        component(resolve){
	            require(['@/components/include'], resolve)
	        }
		},
		{
			path:'/',
	        component(resolve){
	            require(['@/components/include'], resolve)
	        },
	        children:[
	            {
	                path:'index',
	                component(resolve){
	                    require(['@/components/admin/index'], resolve)
	                }
	            },
	            {
	            	path:'tool_food',
	            	component(resolve){
	            		require(['@/components/admin/tool_food'], resolve)
	            	}
	            }
	        ]	
		}
	]
})
