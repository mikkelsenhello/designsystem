import type { ComponentPropsWithRef } from "react";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../../internal/icons";
import { cx } from "../../utils/cx";

export type ValidationMessageColor = "danger" | "success" | "warning" | "info";

export type ValidationMessageProps = Omit<ComponentPropsWithRef<"p">, "color"> & {
  /** danger = error (default), success, warning, info. Each has its own icon. */
  color?: ValidationMessageColor;
};

const icons = { danger: ErrorIcon, success: SuccessIcon, warning: WarningIcon, info: InfoIcon };

/**
 * Short message about a field's value, with an icon (designsystemet's ValidationMessage). Give it an id
 * and point the field's aria-describedby at it; Textfield, Checkbox, Radio and Fieldset do this for their `error`.
 */
export function ValidationMessage({ color = "danger", className, children, ...props }: ValidationMessageProps) {
  const Icon = icons[color];
  return (
    <p data-color={color} className={cx("flex gap-2 text-body-md text-subtle", className)} {...props}>
      <span className="flex h-lh shrink-0 items-center">
        <Icon className="size-6" />
      </span>
      <span>{children}</span>
    </p>
  );
}
