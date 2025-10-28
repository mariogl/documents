import type { ComponentProps } from "./types";

abstract class Component<
  Props extends Record<string, unknown> = Record<string, unknown>,
> {
  constructor(protected props: ComponentProps<Props>) {}

  abstract render(): HTMLElement;
}

export default Component;
