import type { ComponentPropsWithRef } from "react";
import { cx } from "../../utils/cx";

export type LabelSize = "sm" | "md" | "lg";

export type LabelProps = ComponentPropsWithRef<"label"> & {
  /** Match the size of the field it labels. Default: md. */
  size?: LabelSize;
};

const sizeClasses: Record<LabelSize, string> = {
  sm: "text-body-sm",
  md: "text-body-md",
  lg: "text-body-lg",
};

export function Label({ size = "md", className, ...props }: LabelProps) {
  return <label className={cx("font-body font-semibold", sizeClasses[size], className)} {...props} />;
}
