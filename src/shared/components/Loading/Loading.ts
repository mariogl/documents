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

    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = styles.loading;
    loadingIndicator.textContent = "Loading...";
    return loadingIndicator;
  }
}

export default LoadingComponent;
