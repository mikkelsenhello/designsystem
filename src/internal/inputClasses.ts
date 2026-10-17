import { cx } from "../utils/cx";

/** The text input look (designsystemet's .ds-input), shared by Textfield, Select and Search. */
export const inputClasses = cx(
  "w-full px-textfield-padding-x py-textfield-padding-y",
  "rounded-textfield border-width-textfield border-neutral-default",
  "bg-neutral-surface-default text-neutral-default text-body-md placeholder:text-neutral-subtle",
  "focus-ring focus-visible:relative textfield-hover input-readonly transition-colors aria-invalid:border-danger-strong",
  "disabled:cursor-not-allowed disabled:opacity-disabled",
);
