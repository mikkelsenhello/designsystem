import type { ComponentPropsWithRef } from "react";
import type { ColorFamily } from "../../types";
import { cx } from "../../utils/cx";

export type BadgeVariant = "base" | "tinted";

export type BadgeProps = ComponentPropsWithRef<"span"> & {
  /** base = solid fill, tinted = light fill. Default: base. */
  variant?: BadgeVariant;
  /** Color family. Default: primary. */
  color?: ColorFamily;
};

const variantClasses: Record<BadgeVariant, string> = {
  base: "bg-base-default text-base-contrast-default",
  tinted: "bg-surface-tinted text-default",
};

export function Badge({ variant = "base", color = "primary", className, ...props }: BadgeProps) {
  return (
    <span
      data-color={color}
      className={cx(
        "inline-flex min-h-badge-size min-w-badge-size items-center justify-center px-badge-padding-x",
        "rounded-badge text-body-xs leading-short whitespace-nowrap",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
