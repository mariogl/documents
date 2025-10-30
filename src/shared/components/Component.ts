import type { ComponentProps } from "./types";

abstract class Component<
  Props extends Record<string, unknown> = Record<string, unknown>,
> {
  protected element: Element | null = null;

  constructor(protected props: ComponentProps<Props>) {}

  protected abstract render(): Element;

  getElement(): Element {
    if (!this.element) {
      const element = this.render();
      this.setElement(element);
    }

    return this.element as Element;
  }

  protected setElement(element: Element): void {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.replaceChild(element, this.element);
    }

    this.element = element;
  }
}

export default Component;
