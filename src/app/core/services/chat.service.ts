import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChatRequest, ChatResponse } from '../models/chat.model';

/**
 * Cliente del backend de chat (golden path rag-application / mock local).
 *   POST /chat  { query, conversation_id } -> { answer, sources, conversation_id }
 */
@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly baseUrl = environment.chatApiUrl;

  constructor(private readonly http: HttpClient) {}

  sendMessage(query: string, conversationId: string | null): Observable<ChatResponse> {
    const body: ChatRequest = { query, conversation_id: conversationId };
    return this.http.post<ChatResponse>(`${this.baseUrl}/chat`, body);
  }
}
