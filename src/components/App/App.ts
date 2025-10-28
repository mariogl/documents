import styles from "./App.module.css";

class AppComponent {
  render(): HTMLElement {
    const container = document.createElement("div");
    container.classList.add(styles.appContainer);

    const mainHeader = document.createElement("header");
    mainHeader.classList.add(styles.mainHeader);

    const appTitle = document.createElement("h1");
    appTitle.classList.add(styles.appTitle);
    appTitle.textContent = "Documents";
    mainHeader.appendChild(appTitle);

    container.appendChild(mainHeader);

    return container;
  }
}

export default AppComponent;
