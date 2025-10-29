import type Component from "./components/Component";

export const render = (ui: Component) => {
  document.body.appendChild(ui.getElement());
};
