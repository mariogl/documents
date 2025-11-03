import type { Notification } from "@notifications/domain/types";

export interface NotificationsClient {
  connect(): void;
  disconnect(): void;
  onNotification(callback: (notification: Notification) => void): void;
}
