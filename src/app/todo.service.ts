import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoItem } from './todo-model';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: TodoItem[] = [];

  onTodosChange = new Subject<TodoItem[]>();
  onShowFormChange = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  // read
  public getTodos(): TodoItem[] {
    // update the todos from node server
    this.http.get("http://localhost:3000/api/todo").subscribe((response: {msg: string, todos: TodoItem[]}) => {
      console.log(response)
      this.todos = response.todos;

      this.onTodosChange.next(this.todos.slice());
      
    })

    return this.todos.slice();
  }

  // update
  public toggleComplete(id: number) {
    const index = this.todos.findIndex(item => item.id === id);

    // reverse it
    this.todos[index].isCompleted = !this.todos[index].isCompleted;

    // send all the todos to the server for updating the database
    //TODO
    this.http.put("http://localhost:3000/api/todo", { todo: this.todos[index] }).subscribe((response: {msg: String, result: any}) => {
      console.log("Updated successfully");
    })

    // update all with event
    this.onTodosChange.next(this.todos.slice());
  }

  // delete
  public deleteTodo(id: number) {
    const index = this.todos.findIndex(item => item.id === id);
    
    this.todos.splice(index, 1);

    // send all the todos to the server for updating the database
    this.http.post("http://localhost:3000/api/todo/findAndDelete", { id: this.todos[index].id }).subscribe((response: {msg: String, result: any}) => {
      console.log("Deleted successfully");
    })

    this.onTodosChange.next(this.todos.slice());
  }

  public addTodo(newTodo: TodoItem) {
    newTodo.id = this.todos.length;
    this.todos.push(newTodo);

    this.onTodosChange.next(this.todos.slice());
    this.onShowFormChange.next(false);

    // send all the todos to the server for updating the database
    this.http.post("http://localhost:3000/api/todo", { todo: newTodo }).subscribe((response: {msg: String, result: any}) => {
      console.log("Todo added successfully");
    })
  }
}
