import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable'
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class TodosService {
	private apiGetUrl: string;
	private apiPostUrl: string;	

	constructor(private _http : Http){
		this.apiGetUrl ="/api/v1/todos";
		this.apiPostUrl = "/api/v1/todo/"		
	}

	getTods() : Observable<any> {
		return this
					._http
					.get(this.apiGetUrl)
					.map(response => {
						return response.json();
					})
	}

	saveTodos(todo: any) : Observable<any> {
		var headers = new Headers();
		headers.append('content-type','application/json');		

		return this
					._http
					.post(this.apiPostUrl, JSON.stringify(todo), {headers : headers})
					.map(response => {
						return response.json();
					})

	}

	updateTodo(todo: any){
		var headers = new Headers();
		headers.append('content-type','application/json');	

		return this
					._http
					.put(this.apiPostUrl + todo._id, JSON.stringify(todo), {headers : headers})
					.map(response => {
						return response.json();
					})
	}

	deleteTodo(id: string){
		var headers = new Headers();
		headers.append('content-type','application/json');	

		return this
					._http
					.delete(this.apiPostUrl + id)
	}



}