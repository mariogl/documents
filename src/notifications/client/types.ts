import type { Notification } from "../types";

export interface NotificationsClient {
  connect(): void;
  disconnect(): void;
  onNotification(callback: (notification: Notification) => void): void;
}
