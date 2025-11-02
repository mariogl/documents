import Store from "../../shared/store/Store";
import type { Notification } from "../types";

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
