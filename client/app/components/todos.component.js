"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var todos_service_1 = require("../services/todos.service");
var TodosComponent = (function () {
    function TodosComponent(todosService) {
        var _this = this;
        this.todosService = todosService;
        this
            .todosService
            .getTods()
            .subscribe(function (data) {
            _this.todos = data;
        });
    }
    TodosComponent.prototype.createTodo = function ($event, todoText) {
        var _this = this;
        if ($event.which === 1) {
            var newTodo = {
                text: todoText.value,
                isCompleted: false
            };
            this
                .todosService
                .saveTodos(newTodo)
                .subscribe(function (data) {
                _this.todos.push(data);
                todoText.value = '';
            });
        }
    };
    TodosComponent.prototype.updateStatus = function (todo) {
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        console.log(_todo);
        this
            .todosService
            .updateTodo(_todo)
            .subscribe(function (data) {
            todo.isCompleted = !todo.isCompleted;
        });
    };
    TodosComponent.prototype.setEditState = function (todo, state) {
        console.log('did you call me ?');
        if (state) {
            console.log('state :', state);
            todo.isEditMode = state;
        }
        else {
            console.log('todo.isEditMode', todo.isEditMode);
            delete todo.isEditMode;
        }
    };
    TodosComponent.prototype.updateTodoText = function ($event, todo) {
        var _this = this;
        if ($event.which === 13) {
            todo.text = $event.target.value;
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            this
                .todosService
                .updateTodo(_todo)
                .subscribe(function (data) {
                _this.setEditState(todo, false);
            });
        }
    };
    TodosComponent.prototype.deleteTodo = function (todo) {
        var todos = this.todos;
        this
            .todosService
            .deleteTodo(todo._id)
            .subscribe(function (data) {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i]._id == todo._id) {
                    todos.splice(i, 1);
                }
            }
        });
    };
    return TodosComponent;
}());
TodosComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'todos',
        templateUrl: 'todos.component.html',
        providers: [todos_service_1.TodosService]
    }),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosComponent);
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map