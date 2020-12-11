import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import {TodoItem} from '../todo-model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  showForm: boolean = false;

  @ViewChild("completed") completed: NgbAccordion;
  @ViewChild("incompleted") incompleted: NgbAccordion;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();

    // listen for changes
    this.todoService.onTodosChange.subscribe((newTodos) => {
      this.todos = newTodos;
    });

    this.todoService.onShowFormChange.subscribe((newFormStatus) => {
      this.showForm = newFormStatus;
    })

    setTimeout(() => {
      this.completed.collapseAll();
      this.incompleted.collapseAll();
    }, 50)
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  toggleTodo(id: number) {
    this.todoService.toggleComplete(id);
  }

  newTaskClicked() {
    this.showForm = !this.showForm;
  }
}
