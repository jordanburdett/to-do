import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from './todo-model';

@Pipe({
  name: 'currentTasks'
})
export class CurrentTasksPipe implements PipeTransform {

  transform(value: TodoItem[], ...args: unknown[]): TodoItem[] {
    return value.filter(item => !item.isCompleted);
  }

}
