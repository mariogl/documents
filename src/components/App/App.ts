import styles from "./App.module.css";

class AppComponent {
  render(): HTMLElement {
    const container = document.createElement("div");
    container.classList.add("app");

    const mainHeader = document.createElement("header");
    mainHeader.classList.add(styles.mainHeader);

    container.appendChild(mainHeader);

    return container;
  }
}

export default AppComponent;
