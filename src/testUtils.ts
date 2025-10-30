import type Component from "./shared/components/Component";

export const render = (ui: Component) => {
  document.body.appendChild(ui.getElement());
};
