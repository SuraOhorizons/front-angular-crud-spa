import { Component, signal } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TaskListComponent, TaskFormComponent],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css',
})
export class TasksPageComponent {
  editingTask = signal<Task | null>(null);
  refreshToken = signal(0);

  onEdit(task: Task): void {
    this.editingTask.set(task);
  }

  onSaved(): void {
    this.editingTask.set(null);
    this.refreshToken.update((n) => n + 1);
  }

  onCancelEdit(): void {
    this.editingTask.set(null);
  }
}
