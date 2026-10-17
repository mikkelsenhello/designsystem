import { Slot, Slottable } from "@radix-ui/react-slot";
import type { ComponentPropsWithRef } from "react";
import type { ColorFamily } from "../../types";
import { SpinnerSvg } from "../../internal/SpinnerSvg";
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
  /** Turn off the shrink-on-press feedback, e.g. for a button that moves or opens something large. */
  static?: boolean;
  /** Square button holding only an icon. Give it an aria-label. */
  icon?: boolean;
  /** Show a spinner before the text and mark the button busy (aria-busy). An icon button shows only the spinner. */
  loading?: boolean;
  /** Render the single child (e.g. a link that looks like a button) with Button's styling. */
  asChild?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-base-default text-base-contrast-default border-transparent not-disabled:hover:bg-base-hover not-disabled:active:bg-base-active",
  secondary:
    "bg-transparent text-subtle border-strong not-disabled:hover:bg-surface-hover not-disabled:active:bg-surface-active",
  tertiary:
    "bg-transparent text-subtle border-transparent not-disabled:hover:bg-surface-hover not-disabled:active:bg-surface-active",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-button-height-sm min-w-button-height-sm text-body-sm",
  md: "min-h-button-height-md min-w-button-height-md text-body-md",
  lg: "min-h-button-height-lg min-w-button-height-lg text-body-lg",
};

const paddingClasses: Record<ButtonSize, string> = {
  sm: "py-button-padding-y px-button-padding-x-sm",
  md: "py-button-padding-y px-button-padding-x-md",
  lg: "py-button-padding-y px-button-padding-x-lg",
};

const iconClasses: Record<ButtonSize, string> = {
  sm: "size-button-height-sm p-0",
  md: "size-button-height-md p-0",
  lg: "size-button-height-lg p-0",
};

export function Button({
  variant = "primary",
  size = "md",
  color = "primary",
  fullWidth = false,
  static: isStatic = false,
  icon = false,
  loading = false,
  asChild = false,
  type,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type={asChild ? type : (type ?? "button")}
      data-color={color}
      aria-busy={loading || undefined}
      className={cx(
        "inline-flex shrink-0 items-center justify-center gap-button-gap",
        "rounded-button border-width-default font-button leading-short no-underline",
        "cursor-pointer select-none focus-ring focus-visible:relative transition-press",
        !isStatic && "not-disabled:active:scale-button-press",
        "disabled:cursor-not-allowed disabled:opacity-disabled aria-disabled:cursor-not-allowed aria-disabled:opacity-disabled",
        "aria-busy:cursor-progress",
        variantClasses[variant],
        sizeClasses[size],
        icon ? iconClasses[size] : paddingClasses[size],
        fullWidth ? "w-full" : !icon && "w-fit",
        className,
      )}
      {...props}
    >
      {loading && <SpinnerSvg aria-hidden="true" className="size-6" />}
      <Slottable>{icon && loading ? null : children}</Slottable>
    </Comp>
  );
}
