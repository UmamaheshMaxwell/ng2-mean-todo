import { Component } from '@angular/core';
import { TodosService } from '../services/todos.service'

@Component({
	moduleId : module.id,
	selector : 'todos',
	templateUrl : 'todos.component.html',
	providers: [TodosService]
})

export class TodosComponent {
	private todos: any[];

	constructor(private todosService : TodosService){
		this
			.todosService
			.getTods()
			.subscribe(data => {
				this.todos = data;				
			})
	}

	createTodo($event : any, todoText : any){
		if($event.which ===1){

			let newTodo = {
				text : todoText.value,
				isCompleted : false
			}
			
			this
			.todosService
			.saveTodos(newTodo)
			.subscribe(data => {
				this.todos.push(data)
				todoText.value ='';				
			})	
		}
	
	}

	updateStatus(todo : any){
		var _todo = {
			_id: todo._id,
			text: todo.text,
			isCompleted : !todo.isCompleted
		}

		console.log(_todo);

		this
			.todosService
			.updateTodo(_todo)
			.subscribe(data => {
				todo.isCompleted = !todo.isCompleted
			})
	}

	setEditState(todo : any, state: boolean){
		console.log('did you call me ?')
		if(state){
			console.log('state :', state);

			todo.isEditMode = state;
		} else {
			console.log('todo.isEditMode', todo.isEditMode)
			delete todo.isEditMode;
		}
	}

	updateTodoText($event : any, todo : any){
		if($event.which === 13) {
			todo.text = $event.target.value;
			
			var _todo = {
				_id: todo._id,
				text: todo.text,
				isCompleted : todo.isCompleted
			}
			this
				.todosService
				.updateTodo(_todo)
				.subscribe(data => {
					this.setEditState(todo, false)
				})

		}
	}

	deleteTodo(todo: any) {
		var todos = this.todos;

		this
			.todosService
			.deleteTodo(todo._id)
			.subscribe(data => {
				for(var i=0; i< todos.length; i++){
					if(todos[i]._id == todo._id){
						todos.splice(i,1)
					}
				}
			})
	}
}



