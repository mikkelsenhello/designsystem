import type { ComponentPropsWithRef } from "react";
import { cx } from "../../utils/cx";

export type ParagraphSize = "xl" | "lg" | "md" | "sm" | "xs";
export type ParagraphVariant = "default" | "short" | "long";

export type ParagraphProps = ComponentPropsWithRef<"p"> & {
  /** Default: md (the page's body size). */
  size?: ParagraphSize;
  /** Line height: short for one-liners in UI, long for long-form reading. Default: default. */
  variant?: ParagraphVariant;
};

const sizeClasses: Record<ParagraphSize, string> = {
  xl: "text-body-xl",
  lg: "text-body-lg",
  md: "text-body-md",
  sm: "text-body-sm",
  xs: "text-body-xs",
};

const variantClasses: Record<ParagraphVariant, string> = {
  default: "",
  short: "leading-short",
  long: "leading-long",
};

export function Paragraph({ size = "md", variant = "default", className, ...props }: ParagraphProps) {
  return <p className={cx("font-body", sizeClasses[size], variantClasses[variant], className)} {...props} />;
}
