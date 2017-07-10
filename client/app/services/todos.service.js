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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var TodosService = (function () {
    function TodosService(_http) {
        this._http = _http;
        this.apiGetUrl = "/api/v1/todos";
        this.apiPostUrl = "/api/v1/todo/";
    }
    TodosService.prototype.getTods = function () {
        return this
            ._http
            .get(this.apiGetUrl)
            .map(function (response) {
            return response.json();
        });
    };
    TodosService.prototype.saveTodos = function (todo) {
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/json');
        return this
            ._http
            .post(this.apiPostUrl, JSON.stringify(todo), { headers: headers })
            .map(function (response) {
            return response.json();
        });
    };
    TodosService.prototype.updateTodo = function (todo) {
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/json');
        return this
            ._http
            .put(this.apiPostUrl + todo._id, JSON.stringify(todo), { headers: headers })
            .map(function (response) {
            return response.json();
        });
    };
    TodosService.prototype.deleteTodo = function (id) {
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/json');
        return this
            ._http
            .delete(this.apiPostUrl + id);
    };
    return TodosService;
}());
TodosService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TodosService);
exports.TodosService = TodosService;
//# sourceMappingURL=todos.service.js.map