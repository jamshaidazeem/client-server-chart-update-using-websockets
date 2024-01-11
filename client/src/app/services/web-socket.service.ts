import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private url: string = 'ws://localhost:3000';
  private webSocketSubject = webSocket<string>(this.url);
  public webSocket$ = this.webSocketSubject.asObservable();

  constructor() {}

  public sendIntervalToWebSocketServer(interval: number) {
    this.webSocketSubject.next(JSON.stringify(interval));
  }
}
