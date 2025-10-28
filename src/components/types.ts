export type ComponentProps<
  Props extends Record<string, unknown> = Record<string, unknown>,
> = {
  [Key in keyof Props]: Props[Key];
} & {
  className?: string;
  children?: Node | Node[];
};
