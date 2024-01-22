import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterType, TodoModel } from 'src/app/models/todo';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todolist = signal<TodoModel[]>([
    {
      id: 1,
      title: "Comprar leche",
      completed: false,
      editing: false
    },
    {
      id: 2,
      title: "Comprar pan",
      completed: false,
      editing: false
    },
    {
      id: 3,
      title: "Comprar queso",
      completed: false,
      editing: false
    }
  ]);

  filter = signal<FilterType>('all');

  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  });

  constructor() { }

  changeFilter(filterString: FilterType) {
    this.filter.set(filterString);
  }

  addTodo() {
    const newTaskTitle = this.newTodo.value.trim();
    if (this.newTodo.valid && newTaskTitle !== '') {
      this.todolist.update((prev_todos) => {
        return [
          ...prev_todos,
          { id: Date.now(), title: newTaskTitle, completed: false, editing: false }
        ]
      });
      this.newTodo.reset();
    }
  }

  deleteTodo(id: number) {
    this.todolist.update((prev_todos) =>
      prev_todos.filter((todo) => todo.id !== id)
    )
  }
}
