import type { ComponentPropsWithRef } from "react";
import type { ColorFamily } from "../../types";
import { cx } from "../../utils/cx";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  /** primary = solid fill (main action), secondary = outlined, tertiary = text only. Default: primary. */
  variant?: ButtonVariant;
  /** Default: md. */
  size?: ButtonSize;
  /** Color family. Default: primary. Use danger for destructive actions. */
  color?: ColorFamily;
  /** Stretch to the container's width. */
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-base-default text-base-contrast-default border-transparent enabled:hover:bg-base-hover enabled:active:bg-base-active",
  secondary:
    "bg-transparent text-subtle border-strong enabled:hover:bg-surface-hover enabled:active:bg-surface-active",
  tertiary:
    "bg-transparent text-subtle border-transparent enabled:hover:bg-surface-hover enabled:active:bg-surface-active",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-button-height-sm px-button-padding-x-sm text-body-sm",
  md: "min-h-button-height-md px-button-padding-x-md text-body-md",
  lg: "min-h-button-height-lg px-button-padding-x-lg text-body-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  color = "primary",
  fullWidth = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-color={color}
      className={cx(
        "inline-flex shrink-0 items-center justify-center gap-button-gap py-button-padding-y",
        "rounded-button border-width-default font-button leading-short",
        "cursor-pointer select-none focus-ring",
        "disabled:cursor-not-allowed disabled:opacity-disabled",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
}
