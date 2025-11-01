import { uiStore } from "../../store/UiStore";
import Component from "../Component";
import type { ComponentProps } from "../types";

import styles from "./Loading.module.css";

class LoadingComponent extends Component {
  constructor(props: ComponentProps) {
    super(props);

    uiStore.subscribe(() => {
      this.rerender();
    });
  }

  protected render(): Element {
    if (!uiStore.getIsLoading()) {
      const emptyElement = document.createElement("div");
      return emptyElement;
    }

    const container = document.createElement("div");
    container.className = styles.loading;

    const loader = document.createElement("div");
    loader.className = styles.loader;
    loader.role = "alert";
    loader.setAttribute("aria-label", "Loading");

    container.appendChild(loader);

    return container;
  }
}

export default LoadingComponent;
