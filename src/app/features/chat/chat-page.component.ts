import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../core/models/chat.model';
import { ChatService } from '../../core/services/chat.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {
  messages = signal<ChatMessage[]>([]);
  draft = signal('');
  loading = signal(false);
  error = signal<string | null>(null);

  private conversationId: string | null = null;

  constructor(private readonly chatService: ChatService) {}

  send(): void {
    const query = this.draft().trim();
    if (!query || this.loading()) {
      return;
    }

    this.messages.update((msgs) => [...msgs, { role: 'user', content: query }]);
    this.draft.set('');
    this.loading.set(true);
    this.error.set(null);

    this.chatService.sendMessage(query, this.conversationId).subscribe({
      next: (res) => {
        this.conversationId = res.conversation_id;
        this.messages.update((msgs) => [...msgs, { role: 'assistant', content: res.answer }]);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo contactar al backend de chat. Intentá de nuevo.');
        this.loading.set(false);
      },
    });
  }
}
