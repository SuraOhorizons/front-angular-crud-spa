import { Routes } from '@angular/router';
import { TasksPageComponent } from './features/tasks-page/tasks-page.component';
import { ChatPageComponent } from './features/chat/chat-page.component';

export const routes: Routes = [
  { path: '', component: TasksPageComponent },
  { path: 'chat', component: ChatPageComponent },
  { path: '**', redirectTo: '' },
];
