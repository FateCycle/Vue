(function (window) {  //template在各个组件中都要用到所以要放到函数作用域中不然变量无法统一设为template
	let template = `
	<div id="app">     
	<section class="todoapp">
	<to-do-header @abc="addTodo"></to-do-header>
	<to-do-body :todos="todos"  :filterText="filterText"></to-do-body>
	<to-do-footer></to-do-footer>
	</section>
	<app-footer></app-footer>
	</div>
	`;
	window.App = {    //app为app组件的内容
		template,
		components: {
			toDoHeader, //原型为toDoHeader:toDoHeader
			toDoBody,
			toDoFooter,
			appFooter,
		},
		data(){
			return{
				filterText:"",
				todos:[
					{
						id:1,
						title:"写代码",
						completed:true
					},{
						id:2,
						title:"玩手机",
						completed:true
					},{
						id:1,
						title:"吃饭",
						completed:false
					},
				]
			}
		},
		created(){
			//记录当前的指向vue的this
			let _this=this;
			window.onhashchange=function(){
				//这里的this变成了window
				_this.filterText=window.location.hash.substr(2);
			}
		},
		methods:{
			addTodo(todoText){
				if(!todoText.trim().length) return;
				this.todos.push({
					id:this.todos.slice(-1).id+1,
					title:todoText,
					completed:false,
				})

			}
		}
	}

})(window);
