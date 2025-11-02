import type { Notification } from "@notifications/domain/types";

import Store from "@shared/store/Store";

class NotificationsStore extends Store {
  private notifications: Notification[] = [];

  addNotification(notification: Notification): void {
    this.notifications.push(notification);
    this.notifyListeners();
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }
}

export default NotificationsStore;
