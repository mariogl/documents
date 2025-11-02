import type Component from "@shared/presentation/components/Component";

export const render = (ui: Component) => {
  document.body.appendChild(ui.getElement());
};
