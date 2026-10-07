import type { ComponentPropsWithRef } from "react";
import type { ColorFamily } from "../../types";
import { cx } from "../../utils/cx";

export type CardVariant = "default" | "tinted";

export type CardProps = ComponentPropsWithRef<"div"> & {
  /** default = plain surface, tinted = subtly colored surface. Default: default. */
  variant?: CardVariant;
  /** Color family for background, border and text. Default: neutral. */
  color?: ColorFamily;
};

const variantClasses: Record<CardVariant, string> = {
  default: "bg-surface-default",
  tinted: "bg-surface-tinted",
};

export function Card({ variant = "default", color = "neutral", className, ...props }: CardProps) {
  return (
    <div
      data-color={color}
      className={cx(
        "block space-y-card-gap overflow-clip p-card-padding",
        "rounded-card border-width-default border-subtle text-default",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
