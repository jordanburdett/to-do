import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoItem } from '../todo-model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css'],
})
export class AddTaskFormComponent implements OnInit {
  @ViewChild('messageText') messageText: ElementRef<HTMLInputElement>;
  @ViewChild('subjectText') subjectText: ElementRef<HTMLInputElement>;

  @ViewChild('title') title: ElementRef<HTMLInputElement>;
  @ViewChild('content') content: ElementRef<HTMLInputElement>;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  addTask() {
    this.todoService.addTodo(
      new TodoItem(
        0,
        this.title.nativeElement.value,
        this.content.nativeElement.value,
        false
      )
    );

    this.title.nativeElement.value = "";
    this.content.nativeElement.value = "";
  }
}
