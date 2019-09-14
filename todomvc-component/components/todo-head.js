;(function () {
	let template = `<header class="header">
    <h1>todos</h1>
	<input @keydown.enter="handleAddTodo" class="new-todo" placeholder="What needs to be done?" >
</header>`;

	window.toDoHeader = {
		template,
		methods:{
			handleAddTodo(e){
				let value=e.target.value.trim();
				if(!value.length) return;
				this.$emit('abc',value);
				e.target.value='';
			}
		}
	}

})();
