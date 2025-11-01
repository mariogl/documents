import type { Notification } from "../types";

class NotificationsStore {
  private notifications: Notification[] = [];
  private listeners = new Set<() => void>();

  addNotification(notification: Notification): void {
    this.notifications.push(notification);
    this.notifyListeners();
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export default NotificationsStore;
