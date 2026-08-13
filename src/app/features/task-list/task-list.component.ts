import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnChanges {
  @Input() refreshToken = 0;
  @Output() edit = new EventEmitter<Task>();
  @Output() changed = new EventEmitter<void>();

  tasks: Task[] = [];
  loading = false;
  error: string | null = null;

  readonly pageSize = 5;
  currentPage = 1;

  constructor(private readonly taskService: TaskService) {}

  ngOnChanges(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.taskService.list().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.currentPage = Math.min(this.currentPage, this.totalPages);
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista. Verifica que la API de tareas esté disponible.';
        this.loading = false;
      },
    });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.tasks.length / this.pageSize));
  }

  get pagedTasks(): Task[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.tasks.slice(start, start + this.pageSize);
  }

  goToPage(page: number): void {
    this.currentPage = Math.min(Math.max(1, page), this.totalPages);
  }

  toggleDone(task: Task): void {
    if (!task.id) return;
    this.taskService
      .update(task.id, { title: task.title, notes: task.notes, done: !task.done })
      .subscribe(() => this.changed.emit());
  }

  remove(task: Task): void {
    if (!task.id) return;
    this.taskService.delete(task.id).subscribe(() => this.changed.emit());
  }
}
