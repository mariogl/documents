import type { NotificationsClient } from "../client/types";
import type NotificationsStore from "../store/NotificationsStore";
import type { Notification } from "../types";

class NotificationsService {
  constructor(
    private notificationsClient: NotificationsClient,
    private notificationsStore: NotificationsStore,
  ) {
    this.setupClientListeners();
  }

  connect(): void {
    this.notificationsClient.connect();
  }

  disconnect(): void {
    this.notificationsClient.disconnect();
  }

  getNotifications(): Notification[] {
    return this.notificationsStore.getNotifications();
  }

  subscribe(listener: () => void) {
    this.notificationsStore.subscribe(listener);
  }

  private setupClientListeners(): void {
    this.notificationsClient.onNotification((notification) => {
      this.notificationsStore.addNotification(notification);
    });
  }
}

export default NotificationsService;
