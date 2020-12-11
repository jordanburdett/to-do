import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from './todo-model';

@Pipe({
  name: 'completed'
})
export class CompletedPipe implements PipeTransform {

  transform(value: TodoItem[], ...args: unknown[]): TodoItem[] {
    const newTodo = value.filter(item => item.isCompleted);
    return newTodo;
  }

}
