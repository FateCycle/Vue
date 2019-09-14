(function (window) {

	Vue.directive('focus', {
		inserted: function (el) {
		  el.focus()
		}
	})

	Vue.directive('list-focus',{
		update(el,binding){
			if(binding.value) el.focus();
		}
	})

	 app=new Vue({
		data: {
			todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
			currentEdit: null,
			filterText:'all'
		},
		watch: {
			todos: {
				handler() {
					window.localStorage.setItem('todos',JSON.stringify(this.todos));
				},
				deep: true,
				immediate: true,
			}
		},
		computed: {
			//key:function(){}等价于key(){}
			remainingCount: function () {
				return this.todos.filter(elem => !elem.completed).length;
			},
			toggleAllStat: {
				get() {
					return this.todos.every(elem => elem.completed)
				},
				set() {
					//一定要先赋值，不然修改第一个completed会有get()方法改变toggleAllStat导致后面赋值出现问题
					let stat = !this.toggleAllStat;
					this.todos.forEach((elem) => {
						elem.completed = stat;
					});
				}
			},
			filterTodos(){
				switch (this.filterText) {
					case 'completed':
						return this.todos.filter(elem=>elem.completed);
					case 'active':
						return this.todos.filter(elem=>!elem.completed);
				
					default:
						return this.todos;
				}
			}
		},
		methods: {
			handleNewTodokeyDown(e) {
				const value = e.target.value.trim();
				if (!value.length) {
					return;
				}
				this.todos.push({
					id: this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 0,
					title: value,
					completed: false,
				})
				e.target.value = "";
			},
			// handleToggle(e){
			// 	this.todos.forEach((elem)=>{
			// 		elem.completed=e.target.checked;
			// 	});
			// },
			handleRemove(index) {
				this.todos.splice(index, 1);
			},
			//充分利用vue的重新渲染，指定新的选中项修改值让他重新渲染，当循环到这个Item则设置class即可
			handleEdit(item) {
				this.currentEdit = item;
			},
			handleSaveEdit(e, index) {
				if(!this.currentEdit) return;
				const value = e.target.value.trim();
				if (!value.length) return this.todos.splice(index, 1);
				this.currentEdit.title = e.target.value;
				this.currentEdit = null;
			},
			handleCancelEdit() {
				this.currentEdit = null;
			},
			handleClear() {
				for (let i = 0; i < this.todos.length; i++) {
					if (this.todos[i].completed) {
						this.todos.splice(i, 1);
						i--;
					}
				}
			}

		}
	}).$mount('.todoapp')

    
	window.onhashchange=function(){
		app.filterText=window.location.hash.substr(2);
	}
	//因为filterText没有存入localStorage所以每次刷新都会变成all,由于开始hash不会变化所以也不会自动调用
	///修改filterText的方法
	//为了让他保持当前链接所呈现的todos需要手动调用一次修改成正确的filterText
	window.onhashchange();

})(window);


