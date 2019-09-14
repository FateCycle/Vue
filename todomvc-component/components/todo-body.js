;(function () {
	let template=`<section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
        <li class="completed" v-for="item in filtertodos">
            <div class="view">
                <input class="toggle" type="checkbox" v-model="item.completed">
                <label>{{item.title}}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="">
        </li>
    </ul>
</section>`

	window.toDoBody = {
        template,
        props:['todos','filterText'],
        computed:{
            filtertodos(){

                switch (this.filterText) {
                    case 'active':
                        return this.todos.filter(elem=>!elem.completed);
                
                    case 'completed':
                        return this.todos.filter(elem=>elem.completed);
                    default:
                        return this.todos
                }
            }
        }
	}

})();
