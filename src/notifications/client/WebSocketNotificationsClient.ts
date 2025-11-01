import type { NotificationDto } from "../dto/types";
import type { Notification } from "../types";
import type { NotificationsClient } from "./types";

class WebSocketNotificationsClient implements NotificationsClient {
  private ws: WebSocket | null = null;
  private notificationCallbacks: ((notification: Notification) => void)[] = [];

  constructor(private url: string) {}

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    this.ws = new WebSocket(this.url);

    this.ws.addEventListener("message", (event) => {
      const notification: NotificationDto = JSON.parse(event.data);

      this.notificationCallbacks.forEach((callback) =>
        callback(this.mapNotificationDtoToNotification(notification)),
      );
    });

    this.ws.addEventListener("close", () => {
      setTimeout(() => this.connect(), 3000);
    });
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  onNotification(callback: (notification: Notification) => void): void {
    this.notificationCallbacks.push(callback);
  }

  private mapNotificationDtoToNotification(
    notificationDto: NotificationDto,
  ): Notification {
    return {
      timestamp: new Date(notificationDto.Timestamp),
      username: notificationDto.UserName,
      documentTitle: notificationDto.DocumentTitle,
    };
  }
}

export default WebSocketNotificationsClient;
