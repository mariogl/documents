import Component from "../Component";
import HeadingComponent from "../Heading/Heading";
import MainHeaderComponent from "../MainHeader/MainHeader";
import styles from "./App.module.css";

class AppComponent extends Component {
  render(): HTMLElement {
    const container = document.createElement("div");
    container.classList.add(styles.appContainer);

    const appTitle = new HeadingComponent({
      level: 1,
      text: "Documents",
      className: styles.appTitle,
    });

    const mainHeader = new MainHeaderComponent({ children: appTitle.render() });

    container.appendChild(mainHeader.render());

    return container;
  }
}

export default AppComponent;
