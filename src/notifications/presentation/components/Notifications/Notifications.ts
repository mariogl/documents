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
    const container = document.createElement("div");
    container.className = styles.notifications;

    const icon = new IconComponent({
      name: "notifications",
      className: styles.notifications__icon,
    });

    container.appendChild(icon.getElement());

    const badge = document.createElement("span");
    badge.className = styles.notifications__badge;
    badge.textContent = this.notifications.length.toString();

    container.appendChild(badge);

    container.append("New document added");

    return container;
  }
}

export default NotificationsComponent;
