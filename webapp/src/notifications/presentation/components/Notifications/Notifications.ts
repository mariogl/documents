import { notificationsServiceContext } from "@notifications/application/context/notificationsServiceContext";
import type NotificationsService from "@notifications/application/services/NotificationsService";
import type { Notification } from "@notifications/domain/types";

import Component from "@shared/presentation/components/Component";
import IconComponent from "@shared/presentation/components/Icon/Icon";
import type { ComponentProps } from "@shared/presentation/components/types";

import styles from "./Notifications.module.css";

class NotificationsComponent extends Component {
  private notificationsService: NotificationsService;
  private notifications: Notification[] = [];

  constructor(props: ComponentProps) {
    super(props);

    this.notificationsService = notificationsServiceContext.consume();
    this.notificationsService.subscribe(() => {
      this.notifications = this.notificationsService.getNotifications();

      this.rerender();
    });
  }

  protected render(): Element {
    const container = this.createNotificationContainer();

    container.appendChild(this.createIcon());
    container.appendChild(this.createBadge());
    container.append("New document added");

    return container;
  }

  private createNotificationContainer() {
    const container = document.createElement("div");
    container.role = "status";
    container.className = styles.notifications;
    return container;
  }

  private createIcon() {
    return new IconComponent({
      name: "notifications",
      className: styles.notifications__icon,
      isDecorative: true,
    }).getElement();
  }

  private createBadge() {
    const badge = document.createElement("span");
    badge.className = styles.notifications__badge;
    badge.textContent = this.notifications.length.toString();
    return badge;
  }
}

export default NotificationsComponent;
