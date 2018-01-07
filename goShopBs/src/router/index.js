import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path:'/admin',
	        component(resolve){
	            require(['@/components/admin/include'], resolve)
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
