import type { Notification } from "@notifications/domain/types";
import type { NotificationDto } from "@notifications/infrastructure/dto/types";

import { PATHS } from "../../../shared/config/config";
import type { NotificationsClient } from "./types";

class WebSocketNotificationsClient implements NotificationsClient {
  private ws: WebSocket | null = null;
  private notificationCallbacks: ((notification: Notification) => void)[] = [];
  private retryCount = 0;
  private readonly maxRetries = 5;
  private readonly retryDelay = 3000;
  private retryTimeoutId: number | null = null;
  private shouldReconnect = true;

  constructor(private url: string) {}

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    this.shouldReconnect = true;

    this.ws = new WebSocket(this.url + PATHS.NOTIFICATIONS);

    this.ws.addEventListener("open", () => {
      this.retryCount = 0;

      if (this.retryTimeoutId) {
        clearTimeout(this.retryTimeoutId);
        this.retryTimeoutId = null;
      }
    });

    this.ws.addEventListener("message", (event) => {
      const notification: NotificationDto = JSON.parse(event.data);

      this.notificationCallbacks.forEach((callback) =>
        callback(this.mapNotificationDtoToNotification(notification)),
      );
    });

    const scheduleReconnect = () => {
      if (!this.shouldReconnect) {
        return;
      }

      if (this.retryCount >= this.maxRetries) {
        return;
      }

      this.retryCount += 1;
      this.retryTimeoutId = setTimeout(() => this.connect(), this.retryDelay);
    };

    this.ws.addEventListener("error", scheduleReconnect);
    this.ws.addEventListener("close", scheduleReconnect);
  }

  disconnect(): void {
    this.shouldReconnect = false;

    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
      this.retryTimeoutId = null;
    }

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
