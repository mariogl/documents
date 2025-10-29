import type { ComponentProps } from "./types";

abstract class Component<
  Props extends Record<string, unknown> = Record<string, unknown>,
> {
  protected element: HTMLElement | null = null;

  constructor(protected props: ComponentProps<Props>) {}

  protected abstract render(): HTMLElement;

  getElement(): HTMLElement {
    if (!this.element) {
      const element = this.render();
      this.setElement(element);
    }

    return this.element as HTMLElement;
  }

  protected setElement(element: HTMLElement): void {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.replaceChild(element, this.element);
    }

    this.element = element;
  }
}

export default Component;
